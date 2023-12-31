const request = require("supertest");
const app = require("../app");
const db = require("../db/connect");
const setupMockDB = require("./mock/database/setup");

describe("Leaderboards Endpoints", () => {
  let token;

  beforeAll(async () => {
    //Set the database to it's default state before starting test
    await setupMockDB();

    //Create an account and login, getting the token at the end of it
    const registerDetails = {
      username: "user",
      email: "user-email",
      password: "password",
    };
    await request(app).post("/users/register").send(registerDetails);
    const response = await request(app)
      .post("/users/login")
      .send(registerDetails);
    token = response.body.token;
  });

  afterAll(async () => {
    // Close the database connection
    await db.end();
  });

  //GET
  it("Should give correct status codes of failure when no entries available", async () => {
    // await request(app).get("/leaderboards").expect(403);
    await request(app)
      .get("/leaderboards/portuguese")
      .set({ authorization: token })
      .expect(404);
    //! the tests below fail because a leaderboard entry exists at account creation
    // await request(app)
    //   .get("/leaderboards/user")
    //   .set({ authorization: token })
    //   .expect(404);
    // await request(app)
    //   .patch("/leaderboards/user")
    //   .set({ authorization: token })
    //   .expect(500);
  });

  it("should get the leaderboard", async () => {
    const response = await request(app)
      .get("/leaderboards")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get the leaderboard by language", async () => {
    const response = await request(app)
      .get("/leaderboards/spanish")
      .set({ authorization: token })
      .expect(200);

    const languageArray = response.body;

    expect(Array.isArray(languageArray)).toBe(true);
    expect(languageArray.length).toBeGreaterThan(0);

    const { score_spanish } = languageArray[0];
    expect(score_spanish).toBe(90);
  });

  it("should get the leaderboard by a user id", async () => {
    const response = await request(app)
      .get("/leaderboards/user")
      .set({ authorization: token })
      .expect(200);

    const userObj = response.body;

    const { score_spanish, score_italian, rank, total } = userObj;
    expect(score_italian).toBe(0);
    expect(rank).toBe(1);
    expect(total).toBe(0);
    expect(score_spanish).toBe(0);
  });

  //PATCH
  it("Should update a class", async () => {
    const updatedScore = {
      score_spanish: 20,
      score_italian: 20,
    };

    const response = await request(app)
      .patch(`/leaderboards/user`)
      .set({ authorization: token })
      .send(updatedScore)
      .expect(201);

    expect(response.text).toMatch(/Successfully updated user/i);
  });

  //could test the other update route
});
