import "dotenv/config";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const { DATOCMS_API_KEY } = process.env;

async function get(query: string, variables?: any) {
  const response = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${DATOCMS_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return (await response.json())?.data;
}

export default async function () {
  const { allPages } = await get(`
    query AllPagesQuery {
      allPages {
        locales: _locales
        id
      }
    }
  `);

  const pages = await Promise.all(
    allPages.flatMap(({ locales, id }) =>
      locales.map(async (locale: string) => {
        const { page } = await get(`
          query PageQuery {
            page(filter: {id: {eq: "${id}"}}, locale: ${locale}) {
              accessRole
              body {
                __typename
                ... on HeadingBlockRecord {
                  text
                }
              }
              parentPage {
                slug
                parentPage {
                  slug
                }
              }
              slug
              title
            }
          }
        `);

        Object.assign(page, { locale });

        return page;
      }),
    ),
  );

  const dir = resolve(__dirname, "../.data");
  await writeFile(`${dir}/pages.json`, JSON.stringify(pages, null, 2));
}
