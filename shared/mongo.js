const {MongoClient}=require('mongodb')

const mongo={
    db:null,
    users:null,
   async connect(){   
       const client= new MongoClient(process.env.MONGO_DB_URL);
        await client.connect();
        console.log("Mongo connected successfully")
        console.log(`mongo db connected successfully ${process.env.MONGO_DB_URL}`)

        this.db=await client.db(process.env.MONGO_DB_NAME)
        console.log(`db selected - ${process.env.MONGO_DB_NAME}`)

        this.users=this.db.collection("users")
    },
}
module.exports=mongo;



