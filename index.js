import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import router from './routes/useRoute.js';
import db from './config/config.js';
import cookieParser from 'cookie-parser'
import dotenv  from 'dotenv';
const app = express();

dotenv.config();
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(bodyParser.json())
app.use(cookieParser())


//connect db
db.sequelize.sync()

app.use(router)

app.listen(3002, ()=>{
    console.log("Server is running port 3002")
})


