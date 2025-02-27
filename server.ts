import express from 'express';
import userRoutes from "./routes/user.routes";
import cors from "cors";
import authenticateToken from "./middlewares/auth.middleware";
import dotenv from 'dotenv';
import componentRoutes from "./routes/component.routes";
import tagRoutes from "./routes/tag.routes";
import fileUpload from 'express-fileupload';
import path from 'path';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(fileUpload({
    createParentPath: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/auth', userRoutes);
app.use(authenticateToken);
app.use('/api/v1/component', componentRoutes);
app.use('/api/v1/tag', tagRoutes);

app.listen(3000, (err) => {
    console.log('Server is running on port 3000');
});
