const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const URI = process.env.URI;
    await mongoose.connect(URI);
    console.log('The connection with the database was successful'.bgMagenta);
  } catch (error) {
    console.error('ERROR: could not connect to the database'.bgRed);
    console.log(error)
    process.exit(1);
  }
};

module.exports = connectDB;