const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const PORT = process.env.PORT | 8000;
const { setupSocket } = require("./socket/index");
const { connectionDB } = require("./config/mongoDB");
const swaggerDocs = require("./swagger");
const { router } = require("./routes/userRoute");

const app = express();
app.use(helmet()); //secure http
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//http request logger(logs all request in dev format ex : time , status, bytes)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
setupSocket(server); //socket server connection

connectionDB(); //mongo connection

app.use("/user", router); //user routes (register, login)
app.use("/upload", express.static("upload"));
swaggerDocs(app);
server.listen(PORT, () => {
  console.log(`Server Running...${PORT}`);
});
