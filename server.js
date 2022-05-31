const EXPRESS = require("express");
const app = EXPRESS();
app.use("/", EXPRESS.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
