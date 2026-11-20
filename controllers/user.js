const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require("../auth"); 

module.exports.registerUser = async (req, res) => {
    if(!req.body.email.includes("@") || !req.body.email.includes(".com")){
        return res.status(400).send(false);
    }

    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        mobileNo : req.body.mobileNo,
        password : bcrypt.hashSync(req.body.password, 10)
    })

    return newUser.save()
    .then((result) => res.status(201).send({message: "Registered Successfully"}))
    .catch(error => auth.errorHandler(error, req, res))
};

module.exports.loginUser = (req, res) => {
    if(!req.body.email.includes("@") || !req.body.email.includes(".com")){
        return res.status(400).send(false);
    }
    return User.findOne({ email : req.body.email })
    .then(result => {    
        if(result == null){
            return res.status(404).send(false);
        } else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

            if (isPasswordCorrect) {
                return res.status(200).send({ access : auth.createAccessToken(result)});
            } else {
                return res.status(401).send(false);
            }

        }

    })
    .catch(error => auth.errorHandler(error, req, res))
}

module.exports.getDetails = (req,res) => {
    return User.findById(req.user.id)
    .then(user => {
        if(!user){
            return res.status(403).send({ message: 'User not found' });
        } else {
            user.password = "";
            const userObj = user.toObject();
            delete userObj.password;
            
            
            return res.status(200).send(userObj);
        }  
    })
    .catch(error => errorHandler(error, req, res));
};
