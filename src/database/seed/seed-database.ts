import { connection } from 'mongoose';
import { dbConnect } from 'src/database';
import {
  AcquiredStock,
  Broker,
  Country,
  Currency,
  OTP,
  Operation,
  Stock,
  User,
} from 'src/database/models';
import {
  currencies,
  countries,
  brokers,
  stocks,
  users,
} from 'src/database/seed/data';

const deleteAllRecords = async (): Promise<void> => {
  try {
    await OTP.deleteMany({});
    await AcquiredStock.deleteMany({});
    await Operation.deleteMany({});
    await User.deleteMany({});
    await Currency.deleteMany({});
    await Country.deleteMany({});
    await Stock.deleteMany({});
    await Broker.deleteMany({});
  } catch (error) {
    console.log('Error while deleting records', error);
  }
};

const insertAllRecords = async (): Promise<void> => {
  try {
    await Currency.insertMany(currencies);
    await Country.insertMany(countries);
    await Stock.insertMany(stocks);
    await Broker.insertMany(brokers);
    await User.insertMany(users);
  } catch (error) {
    console.log('Error while inserting records', error);
  }
};

(async () => {
  try {
    await dbConnect();

    await deleteAllRecords();
    await insertAllRecords();
    connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.log('Error while seeding database', error);
  }
})();
