const { createDbEnv, populateDbEnv, destroyDbEnv } = require('./setup-test-db')
const app = require('../../app');
const request = require('supertest');


describe('users endpoints', () => {
  let api;
  let token;

  beforeEach(async () => {
    await createDbEnv()
    await populateDbEnv()
  })

  afterEach(async () => {
    await destroyDbEnv()
  })
  
  beforeAll(async () => {
    api = app.listen(5002, () => console.log('Test server running on port 5002'))
  });
  

  afterAll(async () => {
    console.log('Gracefully stopping test server')
    await api.close()
  })

    it('should return all quizzes', async () =>{
        const res = await request(api).get('/');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toEqual(true);
    })

    it('should retrieve a quiz based on user', async () => {
        
      const res = await request(api).get('/quizzes/user/2');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0].user_id).toEqual(2);
    });

    
    it("Should register user to app", async () => {
        const response = await request(app)
          .post("/users/register")
          .send(registerDetails)
          .expect(201);
    
        const userObj = response.body;
        expect(userObj).toHaveProperty("username", "user");
      });
    
        //POST
        it("Should give an error if user tries to register again with the same details", async () => {
          const response = await request(app)
          .post("/users/register")
          .send(registerDetails)
            .expect(500);
      
          let { Error } = response.body;
      
          expect(Error).toBe("A user with username already exists" );
        });
    
      //POST
      it("Should return a token after logging in", async () => {
        const response = await request(app)
          .post("/users/login")
          .send(registerDetails)
          .expect(201);
    
        const userObj = response.body;
        expect(userObj).toHaveProperty("token");
        token = userObj.token;
      });
    
      //POST
      it("Should return error if user gives an incorrect username", async () => {
        await request(app)
          .post("/users/login")
          .send({
            username: "user1",
            password: "password",
          })
          .expect(403);
      });
    
      //POST
      it("Should return error if user gives an incorrect password", async () => {
        await request(app)
          .post("/users/login")
          .send({
            username: "user",
            password: "pass",
          })
          .expect(403);
      });
    
      //GET
      it("Should return an error message if the user tries to get their profile details without a valid token or one at all", async () => {
        const response1 = await request(app)
          .get("/users/details")
          .set({ authorization: "asdf" })
          .expect(403);
    
        let { Error } = response1.body;
        expect(Error).toBeDefined();
    
        const response2 = await request(app).get("/users/details").expect(403);
    
        ({ Error } = response2.body);
        expect(Error).toBeDefined();
      });
    
      //GET
      it("Should get profile details after being created", async () => {
        const response = await request(app)
          .get("/users/details")
          .set({ authorization: token })
          .expect(200);
    
        const userObj = response.body;
        expect(userObj).toHaveProperty("username", "user");
        expect(userObj).toHaveProperty("name", null);
      });  

});