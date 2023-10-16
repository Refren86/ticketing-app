import request from "supertest";

import { app } from "../../app";

describe("signout route", () => {
  test("removes cookie on successful signout", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "asdqwe" })
      .expect(201);

    const res = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);

    expect(res.get("Set-Cookie")[0]).toBe(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
