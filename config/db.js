const mongoose = require('mongoose');
const config =  require('config');  // global value
const db = config.get('mongoURI');

// connect mongoDB
const connectDB = async () => {
  try{
    await mongoose.connect(db);
    console.log('MongoDB Connected ...')
  }catch(err){
    console.log(erro.message)
    // Exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;