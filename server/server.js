const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./resources/users/users.router");
const authRouter = require("./resources/auth/auth.router");
const stripeRouter = require("./stripe/stripe.router");
const productRouter = require("./resources/products/products.router");

const app = express();
//Vi behöver tala om för cors vad som tillåts.
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//Inställningarna för cookies
app.use(
  cookieSession({
    name: "session",
    // keys: ["jdsijdi", "jadjs"] Man kan ha antingen key eller secret
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60, // 1 h - man kan också använda expires.
    //httpOnly: true, -Säkerhet, kan inte nås via javascript, bara i http-protokollet, true by defualt dock.
    // secure: false  - också by default.
    // sameSite: "lax", - ocså default om none tillåts 3partscookies då måste secure vara true.
  })
);

// console.log(process.env);

//Routes
//Denna tar oss till router som tar oss vidare till controllers där getUser-funktionen finns.
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/payments", stripeRouter);
app.use("/products", productRouter);

app.listen(3001, () => console.log("server is up and running.. "));
