const dotenv = require('dotenv');
dotenv.config(); 
const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const authroute=require('./routes/auth');
const cors = require('cors');

const app=express();




app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.json()); // Parse JSON request bodies

  // const {
  //   TWILIO_SERVICE_SID,
  //   TWILIO_ACCOUNT_SID,
  //   TWILIO_AUTH_TOKEN,
  //   JWT_SECRET,
  // } = process.env;
  // // eslint-disable-next-line import/order
  // const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  //   lazyLoading: true,
  // });
  

mongoose.connect("mongodb+srv://omkar:OMKAR@cluster0.duiwp6o.mongodb.net/kubernetes", {
    useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.use('/api/auth',authroute);

// const Login = require('./models/loginSchema'); 
// const Admin = require('./models/Admin'); 
// const Employee = require('./models/Employee'); 
// const User  = require('./models/User'); 


//sendotp  function 

// function sendotp(phoneNumber){
// try{
//     const otpResponse =  client.verify
//     .v2.services(TWILIO_SERVICE_SID)
//     .verifications.create({
//       to: `+${91}${phoneNumber}`,
//       channel: "sms",
//     });
//     console.log(otpResponse);
//     console.log('Otp sent');
//   }catch(err){
//     console.log(err);
//   }
// }

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];

//     jwt.verify(token, JWT_SECRET , (err, user) => {
//       if (err) {
//         return res.status(403).json("Token is not valid!");
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated!");
//   }
// };



// app.get('/work',async(req,res)=>{
//     res.status(200).json("hello");
// });

// app.post("/signup",async(req,res)=>{

//     const userType=req.body.userType;
//     const name=req.body.name;
//     const contactnumber=req.body.contactnumber; 
//     const email=req.body.email;

//     console.log('userType');
//     console.log(userType);            

//     try {
//       var signup=null;

//       if(userType=='Admin'){
//           signup = new Admin({
//           name: name,
//           contactnumber: contactnumber,
//           email:email,
//         });
//       }else if(userType=='User'){
//         signup =  new User({
//           name: name,
//           contactnumber:contactnumber,
//           email:email,
//         });
//       }
    
//         await signup.save();
//         const accessToken = jwt.sign({ contactnumber, name }, JWT_SECRET, { expiresIn: '7d' });
//         const refreshToken = jwt.sign({ contactnumber, name }, JWT_SECRET, { expiresIn: '7d' });
//         console.log('accessToken : '+accessToken);
//         console.log('refreshToken : '+refreshToken);

//         console.log(`Signed in  ${userType}  for ${name}`,accessToken,refreshToken);
//         res.status(200).json({ 'message': 'Successfully saved information','accessToken': accessToken,'refreshToken' : refreshToken });
//       } catch (error) {
//         console.error('Error signning in :', error);
//         res.status(500).json({'message':'failed'});

//       }
// });

// // app.post("/loginsendotp", async (req, res) => {
// //   const userType = req.body.userType;
// //   const contactnumber = req.body.contactnumber;

// //   try {
// //     const entity = await User.findOne({ contactnumber: contactnumber });

// //     if (entity === null) {
// //       res.status(400).json({ message: "This contact number is not registered." });
// //     } else {
// //       sendotp(entity.contactnumber);
// //       res.status(200).json({ message: "otp has been send Successfully" });
// //     }
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "An error occurred." });
// //   }
// // });


// app.post("/loginsendotp",async(req,res)=>{

//   const userType=req.body.userType;
//   const contactnumber=req.body.contactnumber; 
//   console.log('userType');
//   console.log(userType);  
  
//   try {
//     var entity = null;
//     if(userType == 'Admin'){
//       console.log('choose as a admin');   
//       entity= await Admin.findOne({contactnumber:contactnumber});

//     }else{
//       console.log('choose as a admin');   
//       entity= await User.findOne({contactnumber:contactnumber});
//     }
//    sendotp(entity.contactnumber);

//     const loginEntry = new Login({
//       userType: userType,
//       username: username,
//       contactnumber:contactnumber
//     });

//     await loginEntry.save();
//     res.status(200).json({'message':'Successfully send '});


//   }catch(err){
//     console.error('Error Sending otp:', error);
//     res.status(500).json({'message':'failed'});

//   }
// });

//   // try {
//   //   console.log('APi  git hitt');            


//   //   var entity= null;

//   //   if(userType == 'Admin'){

//   //     console.log('choose as a admin');   
//   //     entity= await Admin.findOne({contactnumber:contactnumber});

//   //     if(entity == null){
//   //       console.log('entity is null');
//   //       // res.status(400).json({'message':'This contactnumber is not registered on our server as a usertype you choose '});
//   //     }else{
//   //       sendotp(entity.contactnumber);
//   //       console.log('otp has been sent ');
//   //       // res.status(200).json({'message':'otp has been send Successfully '});
//   //     }

//   //   }else if (userType == 'Employee'){

//   //   console.log('choose as a employee');   
//   //   entity= await Employee.findOne({contactnumber:contactnumber});
//   //   console.log(entity);   

//   //    if(entity == null){
//   //     console.log(entity);
//   //       // res.status(400).json({'message':'This contactnumber is not registered on our server as a usertype you choose '});
//   //    }else{
//   //     console.log(entity.contactnumber);
//   //   sendotp(entity.contactnumber);
//   //   console.log('otp has been sent ');
//   //   // res.status(200).json({'message':'otp has been send Successfully '});
//   //    }  

//   //   }else  if(userType == 'User'){

//   //     console.log('choose as a user');   
//   //     entity= await User.findOne({contactnumber:contactnumber});

//   //     if(entity == null){
//   //       console.log('entity is null');
//   //       //  res.status(400).json({'message':'This contactnumber is not registered on our server as a usertype you choose '});
//   //     }else{
//   //       console.log(entity.contactnumber);
//   //       sendotp(entity.contactnumber);
//   //       // res.status(200).json({'message':'otp has been send Successfully '});
//   //     }   
//   //   }

//   //   else{
//   //     // res.status(400).json({'message':'This contactnumber is not registered on our server'});
//   //   }
  
//   //     const loginEntry = new Login({
//   //       userType: userType,
//   //       username: username,
//   //       contactnumber:contactnumber
//   //     });
  
//   //     await loginEntry.save();
//   //     console.log(`Logged ${userType} login for ${username}`);
//   //     res.status(200).json({'message':'Succesfully saved a information'});
//   //   }catch (error) {
//   //     console.error('Error logging login:', error);
//   //     res.status(500).json({'message':'failed'});

//   //   }
//   // });
// // const sendotp = async () => {
// //   try{
// //     const otpResponse = await client.verify
// //     .v2.services(TWILIO_SERVICE_SID)
// //     .verifications.create({
// //       to: `+${countryCode}${phoneNumber}`,
// //       channel: "sms",
// //     });
// //     console.log(otpResponse);
// //     console.log('Otp sent');
// //   }catch(err){
// //     console.log(err);
// //   }
// // }


// app.post('/verifyotp',async (req,res,next)=>{
//   const userType=req.body.userType;
//   const {
//     contactnumber,
//       otp
//   } = req.body;


//   try {

//       const verifiedResponse = await client.verify
//       .v2.services(process.env.TWILIO_SERVICE_SID)
//           .verificationChecks.create({
//               to: `+${91}${contactnumber}`,
//                               code: otp,
//           });
//           console.log('Otp has been verified');

//           var entity= null;

//     if(userType == 'Admin'){

//       console.log('choose as a admin');   
//       entity= await Admin.findOne({contactnumber:contactnumber});

//      }else if (userType == 'Employee'){

//     console.log('choose as a employee');   
//     entity= await Employee.findOne({contactnumber:contactnumber});
   
//     }else  if(userType == 'User'){

//       console.log('choose as a user');   
//       entity= await User.findOne({contactnumber:contactnumber});
//     }
//           const loginEntry = new Login({
//             userType: userType,
//             name: entity.name,
//             contactnumber:contactnumber
//           });
      
//           await loginEntry.save();
//           console.log(`Logged ${userType} login for ${entity.name}`);
//       res.status(200).send(`OTP verified successfully!: ${JSON.stringify(verifiedResponse)}`);


//   } catch (error) {
//       res.status(error ?.status || 400).send(error ?.message || 'Something went wrong!');

//   }

// });

// app.post("/login",async(req,res)=>{

//   const userType=req.body.userType;
//   const contactnumber=req.body.contactnumber; 
//   console.log('userType');
//   console.log(userType);            

//   try {
//       const loginEntry = new Login({
//         userType: userType,
//         username: username,
//         contactnumber:contactnumber
//       });
  
//       await loginEntry.save();
//       console.log(`Logged ${userType} login for ${username}`);
//       res.status(200).json({'message':'Succesfully saved a information'});
//     } catch (error) {
//       console.error('Error logging login:', error);
//       res.status(500).json({'message':'failed'});

//     }
// });

app.listen(5000,function(){
    console.log('Server started at port 5000');
})

// async function logLogin(userType, username) {
//   try {
//     const loginEntry = new Login({
//       userType: userType,
//       username: username
//     });

//     await loginEntry.save();
//     console.log(`Logged ${userType} login for ${username}`);
//   } catch (error) {
//     console.error('Error logging login:', error);
//   }
// }

// // Example usage
// logLogin('user', 'john_doe');
// logLogin('admin', 'admin_user');
// logLogin('employee', 'employee_user');





// const {
//   TWILIO_SERVICE_SID,
//   TWILIO_ACCOUNT_SID,
//   TWILIO_AUTH_TOKEN,
// } = process.env;
// // eslint-disable-next-line import/order
// const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
//   lazyLoading: true,
// });

// eslint-disable-next-line consistent-return

// eslint-disable-next-line import/order
// const jwt = require("jsonwebtoken");
// const adminLogger = require('../admin-logger');

// const CONFIG = require('../../../../config/config');

// const JWT_SECRET = CONFIG.jwt.secret;

// const {
//   TWILIO_SERVICE_SID,
//   TWILIO_ACCOUNT_SID,
//   TWILIO_AUTH_TOKEN,
// } = process.env;
// // eslint-disable-next-line import/order
// const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
//   lazyLoading: true,
// });

// // eslint-disable-next-line consistent-return
// const loginAdminverifyotp = async (_, arg, ctx) => {
//   const { models } = ctx;
//   const { User } = models;
//   const {
//     countryCode,
//     phoneNumber,
//     otp,
//   } = arg.data;

//   try {
//     let response = null;
//     const user = await User.findOne({
//       where: {
//         contactNumber: phoneNumber,
//       },
//     });

//     const verifiedResponse = await client.verify
//       .v2.services(TWILIO_SERVICE_SID)
//       .verificationChecks.create({
//         to: `+${countryCode}${phoneNumber}`,
//         code: otp,
//       });
//     // eslint-disable-next-line no-shadow
//     const generateAccessToken = () => {
//       jwt.sign({ id: user.id, contactNumber: user.contactNumber }, JWT_SECRET, {
//         expiresIn: "30d",
//       });
//     };

//     // eslint-disable-next-line no-shadow
//     const generateRefreshToken = () => {
//       jwt.sign({ id: user.id, contactNumber: user.contactNumber }, JWT_SECRET, {
//         expiresIn: "30d",
//       });
//     };

//     response = {
//       status: 'SUCCESS',
//       message: 'OTP has been Verfied , Login successfully',
//       // eslint-disable-next-line no-undef
//       accessToken: generateAccessToken,
//       // eslint-disable-next-line no-undef
//       refreshToken: generateRefreshToken,
//     };

//     console.log(verifiedResponse);
//     return response;
//   } catch (err) {
//     adminLogger(`ERROR WHILE Verifying OTP >>> ${err}`, ctx, 'error');
//     return { status: 'ERROR', message: 'OTP is not correct' };
//   }
// };

// module.exports = { loginAdminverifyotp };
