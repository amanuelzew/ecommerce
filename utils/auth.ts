import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from "./db"

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET!)
  return token
}

export const getUserFromToken = async (header?: string) => {
  if (!header) {
    return null
  }

  const token = (header.split('Bearer')[1] ?? '').trim()
  let id: string

  try {
    const user = jwt.verify(token, process.env.SECRET!) as { id: string }
    id = user.id
  } catch (e) {
    console.error('invalid jwt', e)
    return null
  }
  const user = await db.user.findUnique({
    where: { id:id  },
    select: {
      id: true,
      email: true,
      isAdmin:true,
      firstName: true,
      lastName: true,
      cart:true
    },
  });
  return user;

}
export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await db.user.findUnique({
    where: { email },
    select:{id:true,email:true,firstName:true,lastName:true,isAdmin:true,password:true,cart:{select:{id:true,userId:true,cartItems:true}}}
  });

  if (match === null) throw new Error("invalid email or password");

  const correctpwd = await comparePassword(password, match.password);
  if (correctpwd === false) throw new Error("invalid email or password");

  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match;
  return { user, token };
};

export const signup = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const hashpwd = await hashPassword(password);
  
  const user = await db.user.create({
    data: {
      email: email,
      password: hashpwd,
      firstName: firstName,
      lastName: lastName,
      cart:{create:{}}
    },
  });
  const userWithCart = await db.user.findUnique({
    where: { id: user.id },
    include: { cart: true },
  });
  //await db.cart.create({data:{userId:user.id}})
  const token = createTokenForUser(user.id);
  return { userWithCart, token };
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password: string, hashpwd: string) => {
  return bcrypt.compare(password, hashpwd);
};
