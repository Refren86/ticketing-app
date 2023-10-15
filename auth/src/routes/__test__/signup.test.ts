import request from "supertest";

import { app } from "../../app";

describe("Signup route", () => {
  test("returns 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "asdqwe" })
      .expect(201);
  });

  test("returns 400 when email is invalid", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "test", password: "asdqwe" })
      .expect(400);
  });

  test("returns 400 when password is invalid", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "1" })
      .expect(400);
  });

  test("returns 400 with missing email and password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ password: "asdqwe" })
      .expect(400);

    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com" })
      .expect(400);
  });

  test("disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "asdqwe" })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "asdqwe" })
      .expect(400);
  });

  test("sets a cookie after successful signup", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "asdqwe" })

    expect(res.get("Set-Cookie")).toBeDefined();
  });
});
