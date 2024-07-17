
import express from 'express'
import initApp from './src/app.router.js';
import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, './config/.env') });

const app = express();
const port = process.env.PORT || 5000;



initApp(app, express);
app.listen(port, () => console.log(`app running on port ............... ${port}`));



