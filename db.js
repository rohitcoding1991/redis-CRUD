const mongoose = require("mongoose")

  mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
    console.log("databse connected successfully")).catch((error)=> console.log("an db error occur",error))

const db = mongoose.connection
db.on("error",(err)=>{
    console.log(`mongodb error occur ${err}`);
})
module.exports = db