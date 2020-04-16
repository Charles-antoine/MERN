const router = require('express').Router();
var bcrypt = require('bcrypt');
let Login = require('../models/login.model.js');
//
const saltRounds = 10;
//
router.route('/').get((req, res) => {
    Login.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
//
router.route('/add').post((req,res) => {  
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const newLogin = new Login({
        username,
        password
    });

    newLogin.save()
    .then(() => res.json('User added!!'))
    .catch(err => res.status(400).json('Error: ' + err));
})
//
router.route('/authenticate/').post((req,res) => {
    const { username, password } = req.body;

    Login.find({username:username},(err, user) => {
        if (err) return res.status(500).send({message: `Error making request: ${err}`})
        if (user.length === 0) return res.status(404).send({message: 'The client does not exist '})
        if (user.length){
            if(user[0].password){
                if(bcrypt.compareSync(password, user[0].password)) {
                    return res.status(200).send(JSON.stringify(user));
                    //    return res.status(200).send([{success:true}]);
                }
            }else{
               return res.status(404).send({message: 'No _ Match '});
            }
        }           
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;