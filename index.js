const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

// Catbox upload
async function uploadToCatbox(filePath) {
  try {
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", fs.createReadStream(filePath));

    const res = await axios.post(
      "https://catbox.moe/user/api.php",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    return res.data.trim();
  } catch (e) {
    return null;
  }
}

// Uguu fallback
async function uploadToUguu(filePath) {
  try {
    const form = new FormData();
    form.append("files[]", fs.createReadStream(filePath));

    const res = await axios.post("https://uguu.se/upload.php", form, {
      headers: form.getHeaders()
    });

    return res.data.files[0].url;
  } catch (e) {
    return null;
  }
}

// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  let url = await uploadToCatbox(filePath);

  if (!url) {
    console.log("Catbox failed → using Uguu");
    url = await uploadToUguu(filePath);
  }

  fs.unlinkSync(filePath);

  if (!url) {
    return res.json({
      status: false,
      message: "Upload failed"
    });
  }

  res.json({
    status: true,
    url: url
  });
});

// test route
app.get("/", (req, res) => {
  res.send("🚀 Catbox API Running Fine");
});

// Render port fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));