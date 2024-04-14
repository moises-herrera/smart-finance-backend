import { connection } from 'mongoose';
import { dbConnect } from 'src/database';
import { Broker, Country, Currency, Stock } from 'src/database/models';
import { currencies, countries, brokers, stocks } from 'src/database/seed/data';

(async () => {
  try {
    await dbConnect();

    await Currency.deleteMany({});
    await Country.deleteMany({});
    await Stock.deleteMany({});
    await Broker.deleteMany({});

    await Currency.insertMany(currencies);
    await Country.insertMany(countries);
    await Stock.insertMany(stocks);
    await Broker.insertMany(brokers);

    connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.log('Error while seeding database', error);
  }
})();
