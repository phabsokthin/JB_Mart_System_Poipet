import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import router from './routes/useRoute.js';
import db from './config/config.js';
import cookieParser from 'cookie-parser'
import dotenv  from 'dotenv';
import fileUpload from 'express-fileupload';
dotenv.config();
const app = express();


app.use(cookieParser())
//connect db
db.sequelize.sync()
app.use(express.urlencoded({ extended: true }));


app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(bodyParser.json())


//file upload
app.use(express.static('public'))
app.use(fileUpload())



app.use(router)

app.listen(3002, ()=>{
    console.log("Server is running port 3002")
})


