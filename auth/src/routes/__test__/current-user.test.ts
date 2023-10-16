import request from "supertest";

import { app } from "../../app";

describe("currentuser route", () => {
  it("return user data on 200", async () => {
    const cookie = await signup();

    const getUserRes = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie[0])
      .send()
      .expect(200);

    expect(getUserRes.body.currentUser.email).toBe("test@test.com");
  });

  it("returns 401 when cookie is not set", async () => {
    await signup();

    const getUserRes = await request(app)
      .get("/api/users/currentuser")
      .send()
      .expect(200);

    expect(getUserRes.body.currentUser).toBeNull();
  });
});
