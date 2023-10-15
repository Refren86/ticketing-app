import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // trust proxy through ingress nginx
app.use(express.json());

app.use(
  cookieSession({
    signed: false, // disabling default cookie encryption
    secure: process.env.NODE_ENV !== "test", // only available with HTTPS (added condition for testing purposes)
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
