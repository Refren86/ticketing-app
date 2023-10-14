import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import { body } from "express-validator";

import { UserModel } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email is already in use");
    }

    const newUser = UserModel.build({ email, password });
    await newUser.save();

    // Generate JWT
    const userJwt = jwt.sign({ id: newUser._id, email }, process.env.JWT_KEY!);

    // Store JWT in session object (will ve turned into base64 format and then json stringified)
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
