import app from 'src/app';
import { appLogger } from './utils';

const main = (): void => {
  const PORT = app.get('port');

  app.listen(PORT, () => {
    appLogger.info(`Server running on port ${PORT}`);
  });
};

main();
