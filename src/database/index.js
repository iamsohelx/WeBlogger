import mongoose from "mongoose";

const ConnDB = async () => {
   await mongoose.connect("mongodb+srv://iamtodox:iamtodo@cluster0.bfok1.mongodb.net/todo")
   .then(()=> console.log("db connected"))
   .catch((err)=>{
    console.log(err);
    
   })
};

export default ConnDB;