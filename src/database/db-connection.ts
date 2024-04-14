import { connect } from 'mongoose';
import { envConfig } from 'src/config';

/**
 * Connect to the database.
 */
export const dbConnect = async () => {
  try {
    if (!envConfig.DB_URI) {
      throw new Error('DB_URI not found');
    }

    await connect(envConfig.DB_URI);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
