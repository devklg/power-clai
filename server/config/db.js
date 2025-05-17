const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await createIndexes();
    
    return conn;
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

// Create indexes for performance optimization
const createIndexes = async () => {
  try {
    // When models are imported, ensure their indexes are created
    const PreEnrollee = mongoose.model('PreEnrollee');
    const Promoter = mongoose.model('Promoter');
    const User = mongoose.model('User');
    
    // Create indexes for PreEnrollee collection
    await PreEnrollee.collection.createIndex({ email: 1 }, { unique: true });
    await PreEnrollee.collection.createIndex({ positionNumber: 1 }, { unique: true });
    await PreEnrollee.collection.createIndex({ status: 1 });
    
    // Create indexes for Promoter collection
    await Promoter.collection.createIndex({ email: 1 }, { unique: true });
    await Promoter.collection.createIndex({ promoterId: 1 }, { unique: true });
    
    // Create indexes for User collection
    await User.collection.createIndex({ email: 1 }, { unique: true });
    
    console.log('Database indexes created successfully');
  } catch (err) {
    // If models aren't loaded yet, just continue
    if (err.message.includes('model') && err.message.includes('not registered')) {
      console.log('Note: Models not yet registered for indexing');
      return;
    }
    console.error(`Error creating indexes: ${err.message}`);
  }
};

module.exports = connectDB;