const mongoose = require("mongoose")
const UserModel = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AddNewUser = (req, res, next) => 
{
    var hashpassword = bcrypt.hashSync(req.body.password);

   if(hashpassword != ''){
         let Add_User = new UserModel({
         
            username: req.body.username,
            password: hashpassword,
            dob: req.body.dob,
            age: req.body.age,
            mobile: req.body.mobile,
            country: req.body.country,   
        })
       
        console.log(Add_User);
        Add_User.save()
            .then(response => {
                res.json({
                    status:true,
                    message: 'User Saved Successfully',
                    statuscode:200
                })
            })
            .catch(error => {
                res.json({
                    status:false,
                    message: 'AN ERROR OCCURED',
                    
                })
            })
        }
   }

 
const Login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    console.log(username);
    console.log(password);
    UserModel.findOne({ $or: [{ username: username }] })
        .then(user => {           
            if (UserModel) {

               try
               {
                
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    if (result) {
                        let token = jwt.sign({ name: user.username }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            status:true,
                            message: ' Login Successfully',
                            data:user,
                            token
                        })
                    } else {
                        res.json({
                            status:false,
                            message:'Password doesnot match'
                        })
                    }
                
                    })
                }
            
        
          catch(error)
          {
            res.json({
                status:false,
                message: 'No User Found'
            })
          }          
            
    }

        })
    
    
}

    module.exports = {AddNewUser, Login}