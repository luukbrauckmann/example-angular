import { Routes } from '@angular/router';
import pages from '@data/pages.json';
import { Page } from './pages/page';
import { HomePage } from './pages/home.page';
import { NotFoundPage } from './pages/not-found.page';

function getPageSlug(page: any) {
  let slug = page.locale;
  let parentPage = page.parentPage;
  while (parentPage) {
    slug = `${slug}/${parentPage.slug}`
    parentPage = parentPage.parentPage;
  }
  if (page.slug) {
    return `${slug}/${page.slug}`;
  } else {
    return slug;
  }
}

export const routes: Routes = [
  ...pages.map((page: any) => ({
      path: getPageSlug(page),
      component: Page,
      data: page
  })),
  { path: '', component: HomePage },
  { path: '**', component: NotFoundPage }
];
