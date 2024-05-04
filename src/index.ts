import app from 'src/app';

const main = (): void => {
  const PORT = app.get('port');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
