import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import morgan from 'morgan'
import responseTime from 'response-time'

// ❤️‍🔥 backup
import { exec } from 'child_process'
import fs from 'fs'
import { takeBackup } from './utils/backupSystem';

import 'dotenv/config'
import { ToISOStringWithTimezone } from './utils/ToISOStringWithTimezone';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,    
}))

// Increase the payload size limit (e.g., 10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(compression({
    level: 6,
    threshold: 1 *1000,
    filter: (req:express.Request, res:express.Response) => {
        if(req.headers['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(responseTime())

const server = http.createServer(app);


// 🔥 MongoDB configuration

// try {
//     mongoose.Promise = Promise;
//     mongoose.connect(process.env.MONGO_URI);
//     mongoose.connection.on('error', (error: Error) => console.log(error))
//     console.log('connected to Mongoose')
// } catch (error) {
//     console.log(error)
// }
    
    // ❤️‍🔥 for backup
    // const takeBackup = () => {
    //   const data = [
    //     { id: 1, name: 'John Doe', age: 30 },
    //     { id: 2, name: 'Jane Smith', age: 25 },
    //     { id: 3, name: 'Bob Johnson', age: 40 }
    //     // Add more objects as needed
    //   ];
  
    //   const jsonData = JSON.stringify(data, null, 2);

    //   const filename = 'data.json';

    //   fs.writeFile(filename, jsonData, (err:any) => {
    //     if (err) {
    //       console.error('Error writing JSON file:', err);
    //     } else {
    //       console.log('JSON file has been saved!');
    //     }
    //   });
    // }


    console.log("env", process.env.MONGO_URI)

    const mongodbConnect = () => mongoose.connect(process.env.MONGO_URI || '', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // takeBackup()
         // 🔥 Server configuration
        server.listen(8080, () => {
            console.log('🚀 Server running on http://localhost:8080/');
    })
    })
    .catch((error) => {
        // console.log(error)
        console.error(`${ToISOStringWithTimezone(new Date())} 🎆 Error connecting to MongoDB`);

        setTimeout(() => {            
            mongodbConnect()
        }, 3000);
    });
    
    mongodbConnect()

    app.get('/', (req, res) => {
        res.send('Server is running');
    });
    try {
        
        app.use('/api', router())
    } catch (error) {
        console.log("error")
    }
    
   