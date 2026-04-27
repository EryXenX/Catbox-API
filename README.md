# 🚀 Catbox Upload API (Free + Self Host Ready)

A simple and free file upload API using Catbox + Uguu fallback system. You can use it directly or host it yourself.

## 🌐 Live API
https://catbox-api-d07o.onrender.com

## 📌 Features
- Upload images / videos / audio  
- Catbox upload support  
- Uguu fallback system  
- No API key required  
- Fully free & open-source  
- Easy self-host setup  

## 📡 API Endpoint
POST /upload

## 📥 Request Format
multipart/form-data  
key: file

## 📤 Success Response
{
  "status": true,
  "url": "https://files.catbox.moe/xxxxx.jpg"
}

## ❌ Failed Response
{
  "status": false,
  "message": "Upload failed"
}

## ⚙️ Node.js Example
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const form = new FormData();
form.append("file", fs.createReadStream("image.jpg"));

axios.post("https://catbox-api-d07o.onrender.com/upload", form, {
  headers: form.getHeaders()
}).then(res => {
  console.log(res.data.url);
}).catch(err => {
  console.log(err.message);
});

## ⚡ Frontend Example
const formData = new FormData();
formData.append("file", fileInput.files[0]);

fetch("https://catbox-api-d07o.onrender.com/upload", {
  method: "POST",
  body: formData
})
.then(res => res.json())
.then(data => console.log(data));

## 🚀 Self Hosting Guide
1. Clone repo  
   git clone https://github.com/your-username/catbox-api.git  
   cd catbox-api  

2. Install dependencies  
   npm install  

3. Run locally  
   npm start  

Server runs on http://localhost:3000

## 🌐 Deploy on Render
1. Go to https://render.com  
2. New Web Service  
3. Connect GitHub repo  
4. Build command: npm install  
5. Start command: npm start  
6. Deploy  

## ⚙️ Requirements
Node.js 18+ and npm

## ⚠️ Notes
Free hosting may sleep. Large files may fail sometimes.

## 🔥 Tech Stack
Node.js, Express, Multer, Axios, Catbox API, Uguu API

## ❤️ Credits
Made by EryXenX [AKASH]

## 🧠 License
Free for personal and public use