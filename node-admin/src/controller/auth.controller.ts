import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { RegisterValidation } from '../validation/register.validation';
import bcryptjs from 'bcryptjs';

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  const { error } = RegisterValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.password_confirm) {
    return res.status(400).send({ message: "Password's do not match" });
  }

  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10), //should be >=12 irl
  });

  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const user = await repository.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({ message: 'invalid credentials' });
  }

  if (!(await bcryptjs.compare(req.body.password, user.password))) {
    return res.status(404).send({ message: 'invalid credentials' });
  }

  const { password, ...data } = user;

  res.send(data);
};
