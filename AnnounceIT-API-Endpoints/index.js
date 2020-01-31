import express, { json } from 'express';
import userRoutes from './routes/user';
import announceRoutes from './routes/announcement';

const app = express();
app.use(json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/announcements', announceRoutes);

const port = process.env.PORT || 3333;
app.listen(port, ()=>console.log(`Listening on ${port}...`));

module.exports = app;