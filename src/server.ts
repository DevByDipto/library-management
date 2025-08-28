import mongoose from "mongoose";
import app from "./app";

const port = 5000




async function main() {
  await mongoose.connect('mongodb+srv://Library-Management:jtHMo153tVOdCfm9@cluster0.nc8opzq.mongodb.net/libraryManagementDb?retryWrites=true&w=majority&appName=Cluster0');
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
