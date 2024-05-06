import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { User } from 'src/database/models';
import {
  IAuth,
  IAuthResponse,
  IStandardResponse,
  IUser,
  IUserDocument,
  Role,
} from 'src/interfaces';
import {
  hashText,
  generateToken,
  verifyHashedText,
  HttpError,
} from 'src/utils';

/**
 * Find a user.
 *
 * @param filter The filter to apply.
 * @returns The user found.
 */
export const findOne = async (
  filter: Record<string, unknown>
): Promise<IUserDocument | null> => {
  const user = await User.findOne(filter);

  return user;
};

/**
 * Find a user by id.
 *
 * @returns The user found.
 */
export const findById = async (id: string): Promise<IUserDocument | null> => {
  const user = await findOne({ _id: new Types.ObjectId(id) });
  return user;
};

/**
 * Create a new user.
 *
 * @param user User data.
 * @returns The user created.
 */
export const createOne = async (user: IUser): Promise<IAuthResponse> => {
  const { email, password } = user;
  const existingUser = await findOne({ email });

  if (existingUser) {
    throw new HttpError(
      'Ya existe un usuario con ese correo electrónico.',
      400
    );
  }

  const passwordEncrypted = await hashText(password);

  const createdUser = await User.create({
    ...user,
    password: passwordEncrypted,
    role: Role.User,
  });

  const token = generateToken(createdUser.id);

  const response: IAuthResponse = {
    user: {
      ...createdUser.toJSON(),
      password: '',
    },
    accessToken: token,
  };

  return response;
};

/**
 * Login a user.
 *
 * @param auth The auth data.
 * @returns The auth response.
 */
export const loginUser = async (auth: IAuth): Promise<IAuthResponse> => {
  const { email, password } = auth;

  const existingUser = await findOne({ email });

  if (!existingUser) {
    throw new HttpError('Usuario no encontrado', StatusCodes.NOT_FOUND);
  }

  const isPasswordValid = await verifyHashedText(
    password,
    existingUser.password
  );

  if (!isPasswordValid) {
    throw new HttpError(
      'Email o contraseña invalidos',
      StatusCodes.BAD_REQUEST
    );
  }

  const token = generateToken(existingUser._id);

  const response: IAuthResponse = {
    accessToken: token,
    user: {
      ...existingUser.toJSON(),
      password: '',
    },
  };

  return response;
};

/**
 * Update a user.
 *
 * @param id The user id.
 * @param user The user data.
 * @returns The updated user.
 */
export const updateOne = async (
  id: string,
  user: Partial<IUser>
): Promise<IUserDocument | null> => {
  const userToUpdate = await findById(id);

  if (!userToUpdate) {
    throw new HttpError('Usuario no encontrado', StatusCodes.NOT_FOUND);
  }

  if (userToUpdate.email !== user.email) {
    const existingUser = await findOne({ email: user.email });

    if (existingUser) {
      throw new HttpError(
        'Ya existe una cuenta con ese email',
        StatusCodes.BAD_REQUEST
      );
    }
  }

  if (userToUpdate.email !== user.email) {
    const existingUser = await findOne({ username: user.email });

    if (existingUser) {
      throw new HttpError(
        'Ya existe una cuenta con ese email',
        StatusCodes.BAD_REQUEST
      );
    }
  }

  if (user.password) {
    const userPassword = user.password;
    user.password = await hashText(userPassword);
  } else {
    delete user.password;
  }

  const updatedUser = await User.findByIdAndUpdate(id, user, {
    new: true,
  });

  if (updatedUser?.password) {
    updatedUser.password = '';
  }

  return updatedUser;
};

/**
 * Renew a user token.
 *
 * @param id The user id.
 * @returns The auth response.
 */
export const renewToken = async (id: string): Promise<IAuthResponse> => {
  const user = await findById(id);

  if (!user) {
    throw new HttpError('Usuario no encontrado', StatusCodes.NOT_FOUND);
  }

  const token = generateToken(id);

  const response: IAuthResponse = {
    accessToken: token,
    user: {
      ...user.toJSON(),
      password: '',
    },
  };

  return response;
};

/**
 * Change user password.
 *
 * @param email The user email.
 * @returns Standard response.
 */
export const changeUserPassword = async (
  email: string,
  password: string
): Promise<IStandardResponse> => {
  const encryptedPassword = await hashText(password);
  const user = await User.findOneAndUpdate(
    {
      email,
    },
    { password: encryptedPassword },
    {
      new: true,
    }
  );

  if (!user) {
    throw new HttpError('Usuario no encontrado', 404);
  }

  const response: IStandardResponse = {
    message: 'Contraseña actualizada correctamente',
  };

  return response;
};

/**
 * Get user balance.
 *
 * @param id The user id.
 * @returns The user balance.
 */
export const getBalanceByUserId = async (
  id: string
): Promise<{ balance: number }> => {
  const result = await User.aggregate<{ balance: number }>([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 0,
        balance: 1,
      },
    },
  ]);

  if (!result.length) {
    throw new HttpError('Usuario no encontrado', 404);
  }

  return result[0];
};
