import bcrypt from 'bcryptjs';

export default async function createToken(root, { email, password }, context) {
  const user = await context.dbal.user.findOneBy({ email });

  if (!user) {
    return { errors: { password: ['Authentication failed'] } };
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return { errors: { password: ['Authentication failed'] } };
  }

  const token = await context.dbal.user.createToken(user);
  return { token };
}
