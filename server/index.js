import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ imit: '30mb', extended: true }));
app.use(cors());

app.use('/products', productRoutes);
app.use('/category', categoryRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
