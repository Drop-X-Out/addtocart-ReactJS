const router = require('express').Router();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const User=require('../models/User');
const Admin=require('../models/Admin');
const { response } = require('express');
const { ConnectionClosedEvent } = require('mongodb');
const cors = require('cors');

router.use(cors());

  const {
    TWILIO_SERVICE_SID,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
  } = process.env;
  // eslint-disable-next-line import/order
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true,
  });

// router.post('/register', async(req,res)=>{
//     try{
//         const role=req.body.role;
//         console.log(req.body.role);
//         console.log(role == 'Admin');

//         if (role == 'Admin') {
//             const newUser = new Admin({
//               name: req.body.name,
//               email: req.body.email,
//               contactnumber: req.body.contactnumber,
//               role: req.body.role,
//               password: req.body.password,
//             });
          
//             try {
//               // Check for duplicate email or contact number
//               const existingUser = await Admin.findOne({
//                 $or: [{ email: newUser.email }, { contactnumber: newUser.contactnumber }],
//               });
          
//               if (existingUser) {
//                 const response = {
//                   status: 'Failed',
//                   message: 'Duplicate number or email found',
//                 };
//                  res.status(400).json(response);
//                  return
//               }
          
//               // If no duplicate is found, save the new user
//               await newUser.save();
//               res.status(200).json({
//                 status: 'SUCCESS',
//                 message: 'Successfully saved the information',
//               });
//                         } catch (err) {
//               console.error(err);
//               res.status(500).json('Internal Server error');
//               return
//             }
//           }
          
//         if (role === 'User') {
//             const newUser = new User({
//               name: req.body.name,
//               email: req.body.email,
//               contactnumber: req.body.contactnumber,
//               role: req.body.role,
//               password: req.body.password,
//             });
          
//             try {
//               // Check for duplicate email or contact number
//               const existingUser = await User.findOne({
//                 $or: [{ email: newUser.email }, { contactnumber: newUser.contactnumber }],
//               });
          
//               if (existingUser) {
//                 const response = {
//                   status: 'Failed',
//                   message: 'Duplicate number or email found',
//                 };
//                  res.status(400).json(response);
//                  return
//               }
          
//               // If no duplicate is found, save the new user
//               await newUser.save();
//               res.status(200).json({
//                 status: 'SUCCESS',
//                 message: 'Successfully saved the information',
//               });              return
//             } catch (err) {
//               console.error(err);
//               res.status(500).json('Internal Server error');
//               return
//             }
//           }
          
//           res.status(200).json({
//             status: 'SUCCESS',
//             message: 'Successfully saved the information',
//           });       
//     }catch(err){
//         // console.error(err);
//         res.status(500).json('Internal Server error');
//         return  
//       }  
// });

// router.post ('/checkContactNumber',async(req,res)=>{
//     const contactnumber=req.body.contactnumber;
//     console.log(contactnumber);

//     const user=await User.findOne({contactnumber});
//     const admin=await Admin.findOne({contactnumber});
//     if(admin===null && user===null ){
//         res.status(200).json({
//             status: 'SUCCESS',
//           }); 
//     }else{
//         res.status(200).json({
//             status: 'DUPLICATE',
//           }); 
//     }
    
// })

// router.post('/login',async(req,res)=>{
//     try{
//     const contactnumber=req.body.contactnumber;
//     const role=req.body.role;

//     if(role=='Admin'){
//         const userInstance = await Admin.findOne({ contactnumber });
    
//           if (userInstance) {
         
//               const otpResponse = await client.verify
//                 .v2.services(TWILIO_SERVICE_SID)
//                 .verifications.create({
//                   to: `+${91}${contactnumber}`,
//                   channel: "sms",
//                 });
//             const  response = {
//                 status: 'SUCCESS',
//                 message: 'OTP has been sent successfully',
//               };
//               res.status(200).send(` ${JSON.stringify(response)}`);
         
//           }else{
//             res.status(404).json('Admin Does not exist' );
//           }
//     }else{
//         const userInstance = await User.findOne({contactnumber});
             
//           if (userInstance) {
         
//               const otpResponse = await client.verify
//                 .v2.services(TWILIO_SERVICE_SID)
//                 .verifications.create({
//                   to: `+${91}${contactnumber}`,
//                   channel: "sms",
//                 });
//              const response = {
//                 status: 'SUCCESS',
//                 message: 'OTP has been sent successfully',
//               };
//               res.status(200).send(`: ${JSON.stringify(response)}`);
         
//           }else{
//             res.status(404).json('User Does not exist' );
//           }
//         }}catch(err){
//         console.log(err);
//         res.status(500).json('Internal Server error');
//     }
    
// });


router.post('/register', async (req, res) => {
    try {
      const role = req.body.role;
      console.log(req.body);
  
      if (role === 'Admin') {
        // Your Admin registration logic here
        const newUser = new Admin({
          name: req.body.name,
          email: req.body.email,
          contactnumber: req.body.contactnumber,
          role: req.body.role,
          password: req.body.password,
        });
  
        // Check for duplicate email or contact number
        // const existingUser = await Admin.findOne({
        //   $or: [{ email: newUser.email }, { contactnumber: newUser.contactnumber }],
        // });
  
        // if (existingUser) {
        //   const response = {
        //     status: 'Failed',
        //     message: 'Duplicate number or email found',
        //   };
        //   res.status(400).json(response);
        //   return; // Exit the route handler here
        // }
  
        // If no duplicate is found, save the new user
        await newUser.save();
        res.status(200).json({
          status: 'SUCCESS',
          message: 'Successfully saved the information',
        });
      } else if (role === 'User') {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            contactnumber: req.body.contactnumber,
            role: req.body.role,
            password: req.body.password,
          });
      }     await newUser.save();
      res.status(200).json({
        status: 'SUCCESS',
        message: 'Successfully saved the information',
      });
    } catch (err) {
      console.error('Server-side error:', err);
      res.status(500).json({ status: 'Failed', message: 'Internal Server error' });
    }
  });
  


router.post('/verify',async(req,res)=>{
    try{
        console.log(contactnumber,otp)

        const verifiedResponse = await client.verify
      .v2.services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${91}${contactnumber}`,
        code: otp,
      });
     const  response = {
        status: 'SUCCESS',
        message: 'OTP has been Verfied , Login successfully',
      };
      res.status(200).json({'message':response});


    }catch(err){
        console.log(err);
        res.status(500).json({'Internal server error ':err})
    }
})

module.exports=router;

