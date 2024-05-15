import { connection } from 'mongoose';
import { dbConnect } from 'src/database';
import { Broker, Country, Currency, Stock } from 'src/database/models';
import { currencies, countries, brokers, stocks } from 'src/database/seed/data';

const deleteAllRecords = async (): Promise<void> => {
  try {
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
