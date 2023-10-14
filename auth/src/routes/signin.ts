import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import { body } from "express-validator";

import { UserModel } from "../models/user";
import { Password } from "./../services/password";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Password must be supplies"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordCorrect = await Password.compareHash(
      existingUser.password,
      password
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser._id, email },
      process.env.JWT_KEY!
    );

    // Store JWT in session object (will ve turned into base64 format and then json stringified)
    req.session = {
      jwt: userJwt,
    };

    res.send(existingUser);
  }
);

export { router as signInRouter };
