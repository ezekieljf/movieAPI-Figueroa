const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const port = 4000;
const app = express();

mongoose.connect(process.env.MONGODB_STRING);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", () => console.log("We're connected to the cloud database!"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const corsOptions = {
    origin: ['http://localhost:8000', 'http://localhost:5173', 'https://movie-vue-xi.vercel.app'], 
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);


if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}


module.exports = {app,mongoose};