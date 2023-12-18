const express = require('express');
const mongoose = require("mongoose");
const User = require('./models/user');
const Moment = require('./models/moment');
const multer = require('multer');
const upload = multer();
const {uploadFileToS3} = require('./utils/s3_service');
const cors = require('cors');
const app = express();

const PORT = 5050;

app.use(express.json({
    extended: true,
    limit: "100mb",
    parameterLimit: 50000
}));

app.use(express.urlencoded({extended: true, limit: "100mb"}));

app.use(
    cors({
        origin: [
            "http://localhost:3000"
        ],
        methods: ["POST"],
        credentials: true,
        optionsSuccessStatus: 200,
    })
)

const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://admin:admin@cluster0.j6hqihe.mongodb.net/5dSolutionAssignment?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Database "${con.connections[0].name}" connected on host: ${con.connection.host}`)
    } catch(err) {
        console.log(err)
    }
}

connectDB();

app.post("/api/add/user", async (req, res) => {
    try {
        const {firstname, lastname, mobile, emailId, city, password} = req.body;
        
        const data = {
            firstname,
            lastname,
            mobile,
            emailId,
            city,
            password
        }

        const newUser = await User.create(data);
        res.status(201).json(newUser)
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Failed to create new user !!",
            data: err
        })
    }
})

app.post("/api/add/moment", upload.single("document"), async (req, res) => {
    try {
        // console.log("Rahul")
        const {title, tags, userId} = req.body;
        const document = req.file;

        let params = {
            ContentType: "image/png",
        };

        let moment_img_url;

        if(req.file) {
            params.Key = `assignment/moment_${new Date().getTime()}_${document.originalname}`
            params.Body = document.buffer;
            moment_img_url = await uploadFileToS3(params);
        }

        const moment_data = {
            userId,
            title,
            tag: tags,
            document: moment_img_url
        }

        const newMoment = await Moment.create(moment_data);
        res.status(201).json(newMoment)
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Failed to created new moment !!",
            data: err
        })
    }
})

app.listen(PORT, () => {
    console.log("Server is running on PORT Number: ", PORT)
})