const express = require("express");
const path = require("path");

const port = 4000;

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const students = ["Wajid", "Azmat", "Ijaz", "Aman", "Yaseen"];

app.get("/", function (req, res, next) {
    req.message = "Message from first middleware";
    next();
})

app.get("/", function (req, res, next) {
    console.log(req.message);
    res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/students", function (req, res) {
    res.status(200).send({ students: students })
});

app.get("/addStudent", function (req, res) {
    res.status(200).send("<form action='/students' method='POST'><input name='fullName'><button>Submit</button></form>")
});

app.post("/students", function (req, res) {
    const { fullName } = req.body;
    students.push(fullName);
    console.log(students)
    res.status(200).send("Student added successfully")
})

app.get("/students/first", function (req, res) {
    res.status(200).send(`<h1>${students[0]}</h1`);
})

app.get("/students/:studentId", function (req, res) {
    console.log(req.params)
    let { studentId } = req.params;
    studentId = Number(studentId);
    if(!isNaN(studentId)) {
        res.status(200).send(`<h1>${students[studentId]}</h1`);
    } else {
        res.status(400).send("<h1>Error: Invalid Param value</h1>")
    }
})

app.use("/", function (req, res) {
    res.status(404).send("<h1>Error 404: Route not found</h1>")
});

app.listen(port, function () {
    console.log(`Server is running on port: ${port}`);
});