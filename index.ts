import express, { Application } from 'express';
import { casesRoutes } from './src/routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', casesRoutes);

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
