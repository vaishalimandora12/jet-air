require("dotenv").config()
const express = require('express');
const app = express();
const cors  = require('cors');
const path = require("path");
const fileuploads = require("express-fileupload");
// const port = process.env.PORT || 4000;
const {PORT} = require("./utils/constants");
require("./database/db");


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(fileuploads());

const userRoute=require("./routes/user")
app.use("/",userRoute)


const adminRoute=require("./routes/admin")
app.use("/admin",adminRoute)
 
const allowedExt = [
	'.js',
	'.ico',
	'.css',
	'.png',
	'.jpg',
	'.woff2',
	'.woff',
	'.ttf',
	'.svg',
];

app.get('/adminPanel*', (req, res) => {
	if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
		let url = (req.url.split('?')[0]).replace('/adminPanel', '')
		res.sendFile(path.resolve(path.join(__dirname, '..', '..', 'seven-air-aviation-admin-panel', 'build', url)));
	} else
		res.sendFile(path.resolve(path.join(__dirname, '..','..', 'seven-air-aviation-admin-panel', 'build', 'index.html')));

});

app.get('*', (req, res) => {
	if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
		let url = (req.url.split('?')[0]).replace('/webPanel', '')
		res.sendFile(path.resolve(path.join(__dirname, '..','..', 'seven-air-aviation-website', 'build', url)));
	} else
		res.sendFile(path.resolve(path.join(__dirname, '..', '..','seven-air-aviation-website', 'build', 'index.html')));

});

app.listen(PORT|| 4000,()=>{
    console.log(`App Is listing On a Port: ${PORT}`)
})