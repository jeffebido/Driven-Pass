import * as jwt from "jsonwebtoken";
import { users } from "@prisma/client";

import { createUser } from "./factories/auth-factories";
import  prisma  from "../src/db"

export async function cleanDb() {
  await prisma.credentials.deleteMany({});
  await prisma.networks.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  return token;
}