// const request = require("supertest");
// const app = require("../app");
// const db = require("../db/connect");
// const setupMockDB = require("./mock/database/setup");

// describe("User Endpoints", () => {
//   beforeAll(async () => {
//     //Set the database to it's default state before starting test
//     await setupMockDB();
//   });
//   afterAll(async () => {
//     await db.end();
//   });

//   let token;
//   const registerDetails = {
//     username: "user",
//     email: "email",
//     password: "password",
//   };

//   it("Should register user to app", async () => {
//     const response = await request(app)
//       .post("/users/register")
//       .send(registerDetails)
//       .expect(201);

//     const userObj = response.body;
//     console.log(userObj);
//     expect(userObj).toHaveProperty("user_id", 1);
//     expect(userObj).toHaveProperty("email", "email");
//     expect(userObj).toHaveProperty("password");
//     expect(userObj).toHaveProperty("username", "user");
//   });

//   it("Should give error if user tries to register again", async () => {
//     const response = await request(app)
//       .post("/users/register")
//       .send(registerDetails)
//       .expect(500);

//     let { Error } = response.body;

//     expect(Error).toBe("User already registered");
//   });
// });
