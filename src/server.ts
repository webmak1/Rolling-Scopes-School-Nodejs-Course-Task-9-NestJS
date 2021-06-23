import { TryDBConnect } from 'common/dbConnect';
import { app } from './app';
import { config } from './common/config';

TryDBConnect(() => {
  app.listen(config.PORT, () => {
    console.log(`App is running on http://localhost:${config.PORT}`);
  });
});
