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
    user_id: 1,
  };

  it("Should register user to app", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(registerDetails)
      .expect(201);

    const userObj = response.body;
    expect(userObj).toHaveProperty("user_id", 3);
    expect(userObj).toHaveProperty("email", "email");
    expect(userObj).toHaveProperty("password");
    expect(userObj).toHaveProperty("username", "user");
  });

  /*it("Should give error if user tries to register again", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(registerDetails)
      .expect(500);

    let { Error } = response.body;
    expect(Error).toBe("User already registered");
  });*/

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

  it("Should return a token after logging in", async () => {
    const response = await request(app)
      .post("/users/login")
      .send(registerDetails)
      .expect(200);

    const userObj = response.body;
    expect(userObj).toHaveProperty("token");
    token = userObj.token;
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

  //   it("Should return users by ID", async () => {
  //     const response = await request(app).get("/users/3").expect(200);
  //     const userObj = response.body;
  //     expect(userObj).toHaveProperty("user_id", 1);
  //     expect(userObj).toHaveProperty("username", "testuser");
  //     expect(userObj).toHaveProperty("email", "testuser@example.com");
  //     expect(userObj).toHaveProperty("password");
  //   });

  /*const profileDetails = {
    name: "My Name",
    profile_summary: "This is who I am",
  };
  it("Should update profile details", async () => {
    
    const response = await request(app)
      .patch("/users/update")
      .set({ authorization: token })
      .send(profileDetails)
      .expect(202);

    const userObj = response.body;
    expect(userObj).toHaveProperty("name", "My Name");
    expect(userObj).toHaveProperty("profile_summary");
  });*/

  it("Should logout", async () => {
    await request(app)
      .delete("/users/logout")
      .set({ authorization: token })
      .expect(202);
  });
});
