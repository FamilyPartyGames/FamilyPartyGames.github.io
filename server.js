const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static(".")); 

app.post("/submit", (req, res) => {
  try {
    const dirPath = "C:\\Users\\William\\Documents\\Code projects\\Background Scripts\\Output\\Family Party Games Game Suggustions Output";
    const filePath = dirPath + "\\submissions.txt";

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const message = (req.body.message || "").trim();
    const email = req.body.user_email || "No email provided";

    if (message.length === 0 || message.length > 500) {
      return res.status(400).send("Invalid message length.");
    }

    const line = `${new Date().toISOString()} | ${email} | ${message}\n`;
    fs.appendFileSync(filePath, line);

    res.send("OK");

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
