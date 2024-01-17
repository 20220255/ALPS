const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const colors = require("colors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

// connect to DB
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));

//Serve frontend
if (process.env.NODE_ENV === 'production') {
    // set build foldre as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}


app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
