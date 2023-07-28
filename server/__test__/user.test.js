const request = require("supertest");
const app = require("../app");
const db = require("../db/connect");
const setupMockDB = require("./mock/database/setup");

describe("User Endpoints", () => {
  beforeAll(async () => {
    //Set the database to it's default state before starting test
    await setupMockDB();
  });
  afterAll(async () => {
    await db.end();
  });

  let token;
  const registerDetails = {
    username: "user",
    email: "email",
    password: "password",
    user_id: 4,
  };

  it("Should register user to app", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(registerDetails)
      .expect(201);

    const userObj = response.body;
    expect(userObj).toHaveProperty("user_id", 4);
    expect(userObj).toHaveProperty("email", "email");
    expect(userObj).toHaveProperty("username", "user");
    expect(userObj).toHaveProperty("last_login");
    expect(userObj).toHaveProperty("streak", 0);
  });

  it("Should let the user login", async () => {
    const response = await request(app)
      .post("/users/login")
      .send(registerDetails)
      .expect(200);

    const userObj = response.body;
    console.log(userObj);
    expect(userObj).toHaveProperty("authenticated", true);
    expect(userObj).toHaveProperty("token");
    token = userObj.token;
  });

  it("Should return a user's details", async () => {
    const response = await request(app)
      .get("/users")
      .set({ authorization: token })
      .expect(200);

    const userObj = response.body;
    expect(userObj).toHaveProperty("username", "user");
    expect(userObj).toHaveProperty("last_login");
    expect(userObj).toHaveProperty("streak", 0);
    expect(userObj).not.toHaveProperty("password");
  });

  it("Should error if user gives a wrong username", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        username: "user1",
        password: "password",
      })
      .expect(403);
  });

  it("Should error if user gives a wrong password", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        username: "user2",
        password: "passw",
      })
      .expect(403);
  });

  it("Should logout", async () => {
    await request(app)
      .delete("/users/logout")
      .set({ authorization: token })
      .expect(202);
  });

  it("should delete a user who is logged in as themself", async () => {
    const loginResp = await request(app)
      .post("/users/login")
      .send({ username: "user", password: "password" });

    const userObj = loginResp.body;
    const deleteToken = userObj.token;

    const response = await request(app)
      .delete("/users")
      .set({ authorization: deleteToken })
      .expect(204);
  });
});
