import { hashSync } from 'bcryptjs';
import { Types } from 'mongoose';
import { IUser, Role } from 'src/interfaces';
import { currenciesMapped } from './currencies';
import { countriesMapped } from './countries';

interface ISeedUser extends IUser {
  _id: Types.ObjectId;
}

export const users: ISeedUser[] = [
  {
    _id: new Types.ObjectId(),
    fullName: 'Test',
    email: 'test@email.com',
    password: hashSync('Aa12345678', 10),
    role: Role.Admin,
    currency: currenciesMapped['COP'],
    balance: 5000000,
    country: countriesMapped['CO'],
  },
  {
    _id: new Types.ObjectId(),
    fullName: 'Test',
    email: 'test@email.com',
    password: hashSync('Aa12345678', 10),
    role: Role.User,
    currency: currenciesMapped['USD'],
    balance: 20000,
    country: countriesMapped['CO'],
  },
];
