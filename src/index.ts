import express from 'express';
import { dbConnect, envConfig } from 'src/config';

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