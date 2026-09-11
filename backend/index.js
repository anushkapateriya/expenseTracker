const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");
require("./models/expense");

const expenseRoute = require("./routes/expenseRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use(expenseRoute);

app.get("/", (req, res) => {
    res.send("Expense App Backend is running!");
});

sequelize.sync()
    .then(() => {
        console.log("Expense table created successfully!");

        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => {
        console.log("Database error:", error);
    });