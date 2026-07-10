import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API check health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running smoothly!' });
});

// API Get courses list (demo)
app.get('/api/courses', (req, res) => {
  res.json([
    { id: 1, title: 'Toán Cao Cấp 1', price: 299000 },
    { id: 2, title: 'Toán Rời Rạc', price: 399000 },
    { id: 3, title: 'Đại Số Tuyến Tính', price: 349000 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
