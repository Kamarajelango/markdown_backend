const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const helper=require('../helpers/auth.helper')


const service={
    async register(req, res) {
        try {
            //Data Validation
            let user = await helper.validateRegister(req.body)
            delete user.cpassword
            //UserExists
            const userExist = await helper.findByEmail(user.email)
            if (userExist) return res.status(400).send({ error: "user already exists" })

            //Generate Password Hash                
            user.password = await bcrypt.hash(user.password, await bcrypt.genSalt())


            //Insert User
            const { insertedId } = await helper.create({...user,active:true})
            res.send({ message: "user registered", userId: insertedId })


        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    },
    async login(req, res) {
        console.log("login service")
        try {
            //Data Validation
            let user = await helper.validateLogin(req.body)
            console.log("login....loading.....")

            //UserExists
            const dbUser = await helper.findByEmail(user.email)
            if (!dbUser) return res.status(400).send({ error: "user doesn't exists" })
            console.log("userexist validation")

            //Possword Validation
            const isSame = await bcrypt.compare(user.password, dbUser.password)
            if (!isSame) return res.status(401).send({ error: "Invalid password" })
            console.log("password validation")

            //Generate3 auth Token
            const authToken = await jwt.sign({ _id: dbUser._id, email: dbUser.email }, process.env.JWT_SECRET, { expiresIn: '11h' })
            console.log("authtoken")
            res.send({ message: "User logged in", authToken })

        } catch (err) {
            res.status(500).send({ error: err.message })
            console.log("somthing")
        }
    }
}
module.exports=service;