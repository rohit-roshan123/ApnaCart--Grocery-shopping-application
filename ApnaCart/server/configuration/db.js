
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from 'mongoose';

 async function connectdb() {
  try {
    await mongoose.connect("mongodb+srv://varrerohitroshan:roshan1234@roshan.70o7ojr.mongodb.net/ApnaCart");
    console.log("You successfully connected to MongoDB!");
    return mongoose;
  } catch (err) {
    console.dir(err);
  }
}

export default connectdb;