const app = require("./app");
const http = require("http");
const { PORT } = require("./config/index");

// connect to db
require("./dbConnection/dbConnection").connect();

// creating server
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is runing on port :${PORT}`));
