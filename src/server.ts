import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 5000;




async function main() {
  await mongoose.connect(process.env.MONGO_URI || '');
  console.log('Database connected successfully');
  
try {
    app.listen(port, () => {
  console.log(`Library Management app listening on port ${port}`)
})
} catch (error) {
    console.log(error);
    
}
}


main();
