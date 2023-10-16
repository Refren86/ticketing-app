import request from "supertest";

import { app } from "../../app";

describe("signin route", () => {
  beforeEach(async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "asdqwe" })
      .expect(201);
  });

  test("returns 400 when email is invalid", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({ email: "t", password: "asdqwe" })
      .expect(400);
  });

  test("returns 400 when password is not supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com" })
      .expect(400);
  });

  test("returns 400 if password is not correct", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "zxcdsa" })
      .expect(400);
  });

  test("returns 400 if supplied email does not exist", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({ email: "test123@test.com", password: "zxcdsa" })
      .expect(400);
  });

  test("sets a cookie after successful signin", async () => {
    const res = await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "asdqwe" })
      .expect(200);

    expect(res.get("Set-Cookie")).toBeDefined();
  });
});
