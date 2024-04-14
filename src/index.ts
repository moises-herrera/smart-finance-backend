import express from 'express';
import { envConfig } from 'src/config';
import { dbConnect } from 'src/database';

const PORT = envConfig.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect().then(() => {
  console.log('Database connected');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});