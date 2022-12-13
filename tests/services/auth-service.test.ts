import { init } from "../../src/app";
import  prisma  from "../../src/db"
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { createUser, createUser as createUserSeed } from "../factories/auth-factories";
import { cleanDb } from "../helpers";
import {LogIn, SignUp} from "../../src/services/authService"
import { conflict, forbidden } from "../../src/utils/errors";

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await init();
  await cleanDb();
})

describe("createUser", () => {

  it("should throw duplicatedUserError if there is a user with given email", async () => {
    const existingUser = await createUserSeed();
    const email = existingUser.email;
    const password = faker.internet.password(10)
    try {
      await SignUp({email,password});
      fail("should throw duplicatedUserError");
    } catch (error) {
      expect(error).toEqual(conflict());
    }
  });



   
});


describe("signIn", () => {
  const generateParams = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(10),
  });

  it("should throw InvalidCredentialError if there is no user for given email", async () => {
    const params = generateParams();

    try {
      await LogIn(params);
      fail("should throw InvalidCredentialError");
    } catch (error) {
      expect(error).toEqual(conflict());
    }
  });

  it("should throw InvalidCredentialError if given password is invalid", async () => {
    const params = generateParams();
    await createUser({
      email: params.email,
      password: "invalid-password",
    });

    try {
      await LogIn(params);
      fail("should throw InvalidCredentialError");
    } catch (error) {
      expect(error).toEqual(forbidden());
    }
  });


});