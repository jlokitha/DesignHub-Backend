import express from 'express';
import userRoutes from "./routes/user.routes";
import cors from "cors";
import authenticateToken from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api/auth', userRoutes);
app.use(authenticateToken);

app.listen(3000, (err) => {
    console.log('Server is running on port 3000');
});