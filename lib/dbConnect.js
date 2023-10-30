import mongoose from 'mongoose';

const connectToMongoDB = async () => mongoose.connect(process.env.MONGODB_URI);

export default connectToMongoDB;