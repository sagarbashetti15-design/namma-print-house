import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/namma-print-house';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@nammaprinthouse.com';
    const adminPassword = 'AdminPassword123!';

    let user = await User.findOne({ email: adminEmail });
    
    if (user) {
      console.log('Admin user already exists. Updating password and role to ensure admin access.');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(adminPassword, salt);
      user.role = 'admin';
      await user.save();
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      user = new User({
        name: 'Store Admin',
        email: adminEmail,
        password: hashedPassword,
        mobile: '+919999999999',
        role: 'admin'
      });
      await user.save();
      console.log('Admin user created successfully.');
    }
    
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
