import dotenv from 'dotenv'
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express'
import type { Express, Request, Response, NextFunction } from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import sequelize from './models/db'
import * as modules from './models'
import router from './routers/index'
import ApiError from './error';

const application: Express = express()



const corsOptions = {
    credentials: true,
    origin: "http://localhost:5173"
} as const;

application.use(cors(corsOptions));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

application.use(express.static(path.resolve(__dirname, '../uploads')));
application.use(express.json())

application.use(fileUpload({
    limits : { fileSize: 50 * 1024 * 1024}
}))

application.use('/server', router)

application.use((err: Error, req: Request, res: Response, next: NextFunction): Response => {
    console.error('Необработанная ошибка:', err);
    
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.toJSON());
    }
    
    const apiError = ApiError.internal('Внутренняя ошибка сервера');
    return res.status(apiError.status).json(apiError.toJSON());
});



const start = async ():Promise<void>=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        application.listen(3001, ():void=>{
            console.log('Робит')
        })
    }
    catch(e:unknown){
        console.log(e);
    }
}

start()