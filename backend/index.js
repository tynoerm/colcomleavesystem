import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from "cors";

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Optional: if you're sending cookies/auth headers
};

app.use(cors(corsOptions));
app.use(express.json()); 


import { leaveRoutes } from './routes/leaveRoutes.js'
import { usersRoutes } from './routes/usermanagementRoutes.js';
import { formselectionRoutes } from './routes/formselectionRoutes.js';


app.use("/leaveApplications" , leaveRoutes)

app.use("/users", usersRoutes)
app.use('/api/forms', formselectionRoutes);


app.use(express.urlencoded({ extended: true })); 
app.use(cors(corsOptions));


mongoose.connect("mongodb://127.0.0.1:27017/leavesystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 40000, 
  socketTimeoutMS: 40000,   
})
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });




// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Connection Established Successfully on " + port);
});