import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '@prisma/client';
import { createUser, getUserByEmail } from '../repositories/authRepositorie'


export type TypeUserData = Omit<users, 'id'>;

export async function LogIn(authData: TypeUserData){
  
  const user = await getUserByEmail(authData.email);

  if (user && bcrypt.compareSync(authData.password, user.password )) {
      
    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
    const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

    const jwtConfig = {
      expiresIn: EXPIRES_IN
    };

    const token = jwt.sign(user, SECRET, jwtConfig);
    
    return token;
  } else {
    return null;
  }

}

export async function SignUp(userData: TypeUserData){

  const encryptedPassword = bcrypt.hashSync(userData.password, 10);

  const newUserData : TypeUserData = {
    email: userData.email,
    password: encryptedPassword
  }

  await createUser(newUserData);
}