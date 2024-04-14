import { connection } from 'mongoose';
import { dbConnect } from 'src/database';
import { Country, Currency } from 'src/database/models';
import { countries } from 'src/database/seed/countries';
import { currencies } from 'src/database/seed/currencies';

(async () => {
  try {
    await dbConnect();

    await Currency.deleteMany({});
    await Country.deleteMany({});

    await Currency.insertMany(currencies);
    await Country.insertMany(countries);

    connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.log('Error while seeding database', error);
  }
})();
