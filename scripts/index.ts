import { existsSync } from 'node:fs';
import { rm, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import generatePages from './generate-pages';

const dir = resolve(__dirname, '../.data');

if (existsSync(dir)) {
  await rm(dir, { recursive: true });
}

await mkdir(dir);

await generatePages();
