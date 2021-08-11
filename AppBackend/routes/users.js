var express = require('express');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

var router = express.Router();
var token = jwt.sign({ authorized: true }, 'llave',{}); 

const User = require('../models/userModel')


//Traer lista entera de usuarios con query parameters para la busqueda
router.get('/', async (req, res) => {
  try {
    
    const firstName = req.query.firstname;
    const lastName = req.query.lastname;
    const phone = req.query.phone;
    const email = req.query.email;
    const httpToken = req.headers['authorization'];


    if(httpToken){
      const decoded = jwt.verify(httpToken,'llave');
      console.log(decoded.authorized);
      if(decoded.authorized){

        //0000
        if(!firstName && !lastName&& !phone && !email){
          const cursor = await User.find();
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        }
    
        // 0001,0010,0100,1000 (phone email lastname firstname)

        //0001
        if(firstName && !lastName && !email && !phone){
          const cursor = await User.find({firstName:firstName});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        //0010
        if(!firstName && lastName && !email && !phone){
          const cursor = await User.find({lastName:lastName});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        //0100
        if(!firstName && !lastName && email && !phone){
          const cursor = await User.find({email:email});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        //1000
        if(!firstName&& !lastName && !email && phone){
          const cursor = await User.find({phone:phone});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
    
        //0011 0101 0110 1001 1010 1100
        //0011
        if(firstName && lastName && !email && !phone){
          const cursor = await User.find({firstName:firstName , lastName:lastName});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        //0101
        if(firstName && !lastName && email &&! phone){
          const cursor = await User.find({firstName:firstName , email:email});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        //0110
        if(!firstName && lastName && email && !phone){
          const cursor = await User.find({lastName:lastName , email:email});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        //1001
        if(firstName && !lastName && !email && phone){
          const cursor = await User.find({firstName:firstName , phone:phone});
          res.json(cursor);
          console.log(cursor)
          res.end();
        }
        //1010
        if(!firstName && lastName && !email && phone){
          const cursor = await User.find({lastName:lastName , phone:phone});
          res.json(cursor);
          console.log(cursor)
          res.end();
        }
        //1100
        if(!firstName && !lastName && email && phone){
          const cursor = await User.find({email:email , phone:phone});
          res.json(cursor);
          console.log(cursor)
          res.end();
        }
    
        //0111 1011 1101 1110
        if(firstName && lastName && email && !phone){
          const cursor = await User.find({firstName:firstName , lastName:lastName , email:email});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        if(firstName && lastName && !email && phone){
          const cursor = await User.find({firstName:firstName , lastName:lastName , phone:phone});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        if(firstName && !lastName && email && phone){
          const cursor = await User.find({firstName:firstName , email:email , phone:phone});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        if(!firstName && lastName && email && phone){
          const cursor = await User.find({lastName:lastName , email:email , phone:phone});
          res.json(cursor);
          console.log(cursor)
          res.end(); 
        } 
        // 1111
        if(firstName && lastName && phone && email){
          const cursor = await User.find({firstName:firstName, lastName:lastName , phone:phone , email:email });
          res.json(cursor);
          console.log(cursor)
          res.end();
        }
    



      }
    }


 

  } catch (error) {
    console.log(error);
  }
});


//Traer un usuario por el id
router.get('/:id', async (req, res) => {
    const id =req.params.id;
  try {
    const cursor = await User.findOne({_id : id});
    res.json(cursor);
    console.log(cursor)
    res.end(); 

  } catch (error) {
    console.log(error);
  }
});

//Guardar usuario
router.post('/', async (req, res) => {
  const body = req.body
  
  
  body.password = passwordHash.generate(body.password) ;
  body.isActive = false;

  try {
      const user = new User(body)
      await user.save()
      res.end(); 
  } catch (error) {
      console.log('error', error)
  }
});
//Borrar usuario
router.delete('/:id', async (req, res) => {
  const id =req.params.id;
  
  try {
      await User.deleteOne({ _id: id });
      res.end(); 
  } catch (error) {
      console.log('error', error)
  }
});
//updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
//Actualizar usuario
router.put('/:id', async (req, res) => {
  const id =req.params.id;
  const body = req.body;
  
  try {
      await User.updateOne({ _id: id }, body);

      res.end(); 
  } catch (error) {
      console.log('error', error)
  }
});
//Cambiar password

router.put('/pwd/:id', async (req, res) => {
  const id = req.params.id;
  const password = req.body.password;
  const hashed = passwordHash.generate(password);
  
  try {
      await User.updateOne({ _id: id },  {password : hashed});
      res.end(); 

  } catch (error) {
      console.log('error', error)
  }
});


//authentication
router.post('/login', async (req,res)=>{
  const body = req.body;
  console.log(body)
  


  try {
    
    let cursor = await User.findOne({email : body.email});

    if(body.email == cursor.email && passwordHash.verify(body.password,cursor.password)){
      
       
      res.json({token : token , user:cursor});
      
    } else {
      res.json({message : 'Incorrect Password'});
    };
  } catch (error) {
    console.log('error', error)

  }
});


module.exports = router;
