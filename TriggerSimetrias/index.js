require("dotenv").config();
var moment = require("moment-timezone");
moment.tz.setDefault(process.env.TIME_ZONE);

const { ProcessController } = require("./controllers/ProcessController");
const { sequelizeConnect } = require("./database/mysqldb");

sequelizeConnect();

module.exports = async function (context, myTimer) {
    const process = new ProcessController();
    await process.main();
};