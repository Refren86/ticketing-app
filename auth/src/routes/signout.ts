import { Request, Response, Router } from "express";

const router = Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null; // clearing the session, which will remove the cookies from header
  res.send({});
});

export { router as signOutRouter };
