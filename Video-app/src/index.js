const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

//
// Registers a HTTP GET route for videoo  streaming.
//
app.get("/video", (req, res) => {

    const videoPath = path.join("Video-app/videos", "SampleVideo_1280x720_1mb.mp4");
    fs.stat(videoPath, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(videoPath).pipe(res);
    });
});

//
// Starts th HTTPP server.
//
app.listen(port, () => {
    console.log(`Microservice listening on port ${port}, point your browser at http://localhost:30021/video`);
});
