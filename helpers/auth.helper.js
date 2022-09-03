const joi=require('joi')
const {ObjectId}=require("mongodb")
const db=require("../shared/mongo")

const registerSchema=joi.object({
    name: joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(3).max(15).required(),
    cpassword:joi.ref("password")
})

const loginSchema=joi.object({
    email:joi.string().email().required(),
  password:joi.string().min(3).max(15).required(),
  
})

const helper={
    validateRegister(user){
        try {
            console.log("register validate")
            return   registerSchema.validateAsync(user)           
        } catch ({ details: [{ message }]}) {
            throw new Error(message)
        }
    },
    validateLogin(user){
        try {
            console.log(" login validate")
            return   loginSchema.validateAsync(user)           
        } catch ({ details: [{ message }]}) {
            throw new Error(message)
        }
    },
    findByEmail(email){
         return  db.users.findOne({email,active:true})
    },
    findById(_id){
        return  db.users.findOne({_id:ObjectId(_id),active:true})
    },
    create(user){
      return db.users.insertOne(user)
    },
}

module.exports=helper;