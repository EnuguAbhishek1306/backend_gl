require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const adminRoutes = require('./routes/adminRoutes');
const certificationRoutes = require("./routes/certificationRoutes");
const nonTechRoutes=require('./routes/nonTechJobRoutes');
const majorRoutes=require('./routes/majorProjectRoutes');
const minorRoutes=require('./routes/minorProjectRoutes')

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/nontechjobs',nonTechRoutes)
app.use('/api/internships', internshipRoutes);  // Add internship routes
app.use('/api/admin', adminRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/majorproject",majorRoutes );
app.use("/api/minorproject",minorRoutes );


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
