import httpStatus from "http-status";
import supertest from "supertest";
import app from "../../src/app";
import { init } from "../../src/app";
import { cleanDb } from "../helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/auth-factories";
import  prisma  from "../../src/db";

const server = supertest(app);


beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await init();
  await cleanDb();
})


describe("POST /signup", () => {
    it("should respond with status 422 when body is not given", async () => {
        const response = await server.post("/signup");

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    });

    it("should respond with status 400 when body is not valid", async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    
        const response = await server.post("/signup").send(invalidBody);
    
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    describe("when body is valid", () => {
        const generateValidBody = () => ({
            email: faker.internet.email(),
            password: faker.internet.password(10),
        });

        it("should respond with status 409 when there is an user with given email", async () => {
            const body = generateValidBody();
            await createUser(body);
    
            const response = await server.post("/signup").send(body);
    
            expect(response.status).toBe(httpStatus.CONFLICT);
          });

        it("should respond with status 201 and create user when given email is unique", async () => {
            const body = generateValidBody();
    
            const response = await server.post("/signup").send(body);
            console.log(response.body);
            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body).toEqual({
              id: expect.any(Number),
              email: body.email,
            });
        });

        it("should not return user password on body", async () => {
            const body = generateValidBody();
    
            const response = await server.post("/signup").send(body);
    
            expect(response.body).not.toHaveProperty("password");
        });

        it("should save user on db", async () => {
            const body = generateValidBody();
    
            const response = await server.post("/signup").send(body);
    
            const user = await prisma.users.findUnique({
              where: { email: body.email },
            });
            expect(user).toEqual(
              expect.objectContaining({
                id: response.body.id,
                email: body.email,
              }),
            );
          });
    
    });
});

describe("POST /login", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/login");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/login").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = generateValidBody();

      const response = await server.post("/login").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/login").send({
        ...body,
        password: faker.internet.password(10),
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/login").send(body);

        expect(response.status).toBe(httpStatus.OK);
      });

      it("should respond with user data", async () => {
        const body = generateValidBody();
        const user = await createUser(body);

        const response = await server.post("/login").send(body);

        expect(response.body.user).toEqual({
          id: user.id,
          email: user.email,
        });
      });

      it("should respond with session token", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/login").send(body);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});
