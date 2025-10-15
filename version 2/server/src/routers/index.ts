import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

async function loadRoutes() {
  try {
    const routerFiles = fs.readdirSync(__dirname).filter(file => 
      file !== 'index.ts' && file.endsWith('.ts')
    );

    for (const file of routerFiles) {
      const routeModule = await import(`./${file}`);
      if (routeModule.default) {
        router.use(routeModule.default);
      }
    }
  } catch (error) {
    console.error('Error loading routes:', error);
  }
}

await loadRoutes();

export default router;