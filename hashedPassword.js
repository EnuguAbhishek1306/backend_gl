// hashPassword.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function createAdmin() {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://abhishekreddy1306:ZhyQNup8hbQgkuDp@cluster0.fwfdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        tls: true,
        tlsAllowInvalidCertificates: true
    });
    
    // Generate salt and hash
    const password = 'Admin123!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed Password:', hashedPassword);
    
    // Optionally, you can add direct database insertion here
    const Admin = mongoose.model('Admin', new mongoose.Schema({
        email: String,
        password: String,
        isSuper: Boolean,
        createdAt: Date
    }));

    const admin = new Admin({
        email: 'superadmin@gmail.com',
        password: hashedPassword,
        isSuper: true,
        createdAt: new Date()
    });

    try {
        await admin.save();
        console.log('Admin created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
    }

    mongoose.connection.close();
}

createAdmin();