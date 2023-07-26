const request = require("supertest");
const app = require("../app");
const db = require("../db/connect");
const setupMockDB = require("./mock/database/setup");

describe("Leaderboards Endpoints", () => {
  let token;
  let quizInst;

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
    await request(app).get("/quizzes").expect(403);
    await request(app)
      .get("/quizzes/6")
      .set({ authorization: token })
      .expect(404);
    await request(app)
      .get("/quizzes/user/55")
      .set({ authorization: token })
      .expect(404);
    await request(app)
      .get("/quizzes/language/7")
      .set({ authorization: token })
      .expect(404);
    await request(app)
      .get("/quizzes/7/7/7")
      .set({ authorization: token })
      .expect(404);
  });

  it("should get all quizzes", async () => {
    const response = await request(app)
      .get("/quizzes")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get all quizzes based on an id", async () => {
    const response = await request(app)
      .get("/quizzes/1")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].quiz_id).toBe(1);
  });

  it("should get all quizzes based on an user id", async () => {
    const response = await request(app)
      .get("/quizzes/user/1")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].user_id).toBe(1);
  });

  it("should get all quizzes based on an language id", async () => {
    const response = await request(app)
      .get("/quizzes/language/1")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].language_id).toBe(1);
  });

  it("should get all quizzes and bring back the beginner score", async () => {
    const response = await request(app)
      .get("/quizzes/level/beginner")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).not.toHaveProperty("intermediate_score");
    expect(response.body[0]).not.toHaveProperty("advanced_score");
  });

  it("should get all quizzes and bring back the intermediate score", async () => {
    const response = await request(app)
      .get("/quizzes/level/intermediate")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).not.toHaveProperty("beginner_score");
    expect(response.body[0]).not.toHaveProperty("advanced_score");
  });

  it("should get all quizzes and bring back the advanced score", async () => {
    const response = await request(app)
      .get("/quizzes/level/advanced")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).not.toHaveProperty("beginner_score");
    expect(response.body[0]).not.toHaveProperty("intermediate_score");
  });

  it("should bring back a quiz instance with a specific user id, langauge id and quiz id", async () => {
    const response = await request(app)
      .get("/quizzes/1/1/1")
      .set({ authorization: token })
      .expect(200);
    const userObj = response.body;

    const {
      user_id,
      quiz_id,
      language_id,
      beginner_score,
      intermediate_score,
      advanced_score,
    } = userObj;

    expect(user_id).toBe(1);
    expect(quiz_id).toBe(1);
    expect(language_id).toBe(1);
    expect(beginner_score).toBe(10);
    expect(intermediate_score).toBe(20);
    expect(advanced_score).toBe(30);
  });

  //PATCH
  it("Should update a quiz instance", async () => {
    const updatedScore = {
      quiz_id: 1,
      language_id: 2,
      beginner_score: 16,
    };

    const response = await request(app)
      .patch(`/quizzes/2`)
      .set({ authorization: token })
      .send(updatedScore)
      .expect(201);
    const userObj = response.body;

    const {
      user_id,
      quiz_id,
      language_id,
      beginner_score,
      intermediate_score,
      advanced_score,
      quiz_instance,
    } = userObj;

    expect(user_id).toBe(2);
    expect(quiz_instance).toBe(5);
    expect(quiz_id).toBe(1);
    expect(language_id).toBe(2);
    expect(beginner_score).toBe(16);
    expect(intermediate_score).toBe(5);
    expect(advanced_score).toBe(15);
  });

  it("Should not update a quiz instance if the score sent is lower", async () => {
    const updatedScore = {
      quiz_id: 1,
      language_id: 2,
      beginner_score: 14,
    };

    const response = await request(app)
      .patch(`/quizzes/2`)
      .set({ authorization: token })
      .send(updatedScore)
      .expect(201);
    const userObj = response.body;

    const {
      user_id,
      quiz_id,
      language_id,
      beginner_score,
      intermediate_score,
      advanced_score,
      quiz_instance,
    } = userObj;

    expect(user_id).toBe(2);
    expect(quiz_instance).toBe(5);
    expect(quiz_id).toBe(1);
    expect(language_id).toBe(2);
    expect(beginner_score).toBe(16);
    expect(intermediate_score).toBe(5);
    expect(advanced_score).toBe(15);
  });

  it("Should fail if the data sent isn't correct", async () => {
    const updatedScore = {
      language_id: 2,
      beginner_score: 14,
    };

    const response = await request(app)
      .patch(`/quizzes/2`)
      .set({ authorization: token })
      .send(updatedScore)
      .expect(500);
  });

  //POST
  it("posts a new quiz", async () => {
    const postNewQuizDetails = {
      quiz_id: 3,
      language_id: 1,
      user_id: 1,
      beginner_score: 0,
      intermediate_score: 20,
      advanced_score: 0,
    };

    const postResponse = await request(app)
      .post("/quizzes")
      .set({ authorization: token })
      .send(postNewQuizDetails)
      .expect(201);

    const { quiz_instance } = postResponse.body;
    quizInst = quiz_instance;

    expect(postResponse.body).toHaveProperty("quiz_id", 3);
    expect(postResponse.body).toHaveProperty("language_id", 1);
    expect(postResponse.body).toHaveProperty("user_id", 1);
    expect(postResponse.body).toHaveProperty("beginner_score", 0);
    expect(postResponse.body).toHaveProperty("intermediate_score", 20);
    expect(postResponse.body).toHaveProperty("advanced_score", 0);
  });
});
