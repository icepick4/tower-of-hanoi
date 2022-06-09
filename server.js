const EXPRESS = require("express");
const path = require("path");
const app = EXPRESS();
app.use("/", EXPRESS.static(path.join(__dirname, "threejs/public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "./threejs/public/index.html");
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
