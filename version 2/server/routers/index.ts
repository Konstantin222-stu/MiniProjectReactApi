import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const loadRoutes = async (): Promise<void> => {
  try {
    const files = fs.readdirSync(__dirname);
    
    for (const file of files) {
      if (file !== 'index.ts' && file !== 'index.js' && file.endsWith('Router.ts')) {
        const routeName = file.replace('Router.ts', '');
        const module = await import(`./${file}`);
        const routeRouter = module.default;
        
        router.use(`/${routeName}`, routeRouter);
      }
    }
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

loadRoutes();

export default router;