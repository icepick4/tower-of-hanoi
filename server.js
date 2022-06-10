const EXPRESS = require("express");
const path = require("path");
const app = EXPRESS();
app.use("/", EXPRESS.static(path.join(__dirname, "2d/drag-and-drop/public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "./2d/drag-and-drop/public/index.html");
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
