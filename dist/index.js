"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const morgan_1 = __importDefault(require("morgan"));
const response_time_1 = __importDefault(require("response-time"));
// ❤️‍🔥 backup
require("dotenv/config");
const ToISOStringWithTimezone_1 = require("./utils/ToISOStringWithTimezone");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://hotels-italy-frontend.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
// Increase the payload size limit (e.g., 10MB)
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use((0, compression_1.default)({
    level: 6,
    threshold: 1 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression_1.default.filter(req, res);
    }
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, response_time_1.default)());
const server = http_1.default.createServer(app);
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
console.log("env", process.env.MONGO_URI);
const mongodbConnect = () => mongoose_1.default.connect(process.env.MONGO_URI || '', {
// useNewUrlParser: true,
// useUnifiedTopology: true,
})
    .then(() => {
    console.log('✅ Connected to MongoDB');
    // takeBackup()
    // 🔥 Server configuration
    server.listen(8080, () => {
        console.log('🚀 Server running on http://localhost:8080/');
    });
})
    .catch((error) => {
    // console.log(error)
    console.error(`${(0, ToISOStringWithTimezone_1.ToISOStringWithTimezone)(new Date())} 🎆 Error connecting to MongoDB`);
    setTimeout(() => {
        mongodbConnect();
    }, 3000);
});
mongodbConnect();
app.get('/', (req, res) => {
    res.send('Server is running');
});
try {
    app.use('/api', (0, router_1.default)());
}
catch (error) {
    console.log("error");
}
//# sourceMappingURL=index.js.map