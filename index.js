import express from 'express';
import cors from 'cors'
import router from './routes/useRoute.js';
import db from './config/config.js';
const app = express();
app.use(cors())
//connect db
db.sequelize.sync()

app.use(router)

app.listen(3002, ()=>{
    console.log("Server is running port 3002")
})


