import 'dotenv/config';
import { connect } from 'mongoose';
import envConfig from 'src/config/env-config';

async function dbConnect(): Promise<void> {
  await connect(envConfig.DB_URI);
}

export default dbConnect;
