import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import podcastRoutes from './routes/podcastRoutes.js'

connectDB();


const port = process.env.PORT || 5000;
const app = express();

// const __dirname = path.resolve();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())



app.use('/api/users', userRoutes)
app.use('/api/podcasts', podcastRoutes);


app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));