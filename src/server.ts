import mongoose from "mongoose";
import app from "./app";
import 'dotenv/config';


const port = process.env.PORT || 5000;



async function main() {

  
try {
  // way-1
    await mongoose.connect(process.env.MONGO_URI as string);
    // way-2

  console.log('Database connected successfully');
    app.listen(port, () => {
  console.log(`Library Management app listening on port ${port}`)
})
} catch (error) {
    console.log(error);
    
}
}


main();
