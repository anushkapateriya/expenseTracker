const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "expense_app",
    "root",
    "Anshu@123",
    {
        host: "localhost",
        dialect: "mysql"
    }
);

module.exports = sequelize;