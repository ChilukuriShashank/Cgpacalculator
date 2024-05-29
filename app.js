import express from 'express';
import router from './Routers/CgpaRouter.js';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors package

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS middleware
app.use(router);

mongoose.connect('mongodb+srv://admin:Shashank%4005112004@cluster0.kezeerg.mongodb.net/CGPA')
  .then(result => console.log("Connected to Database"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
