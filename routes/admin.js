const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/adminAuth');

require('dotenv').config()
const formidable = require("formidable");
const fs = require("fs");
const _ = require('lodash');

const MongoObjectId = require("mongoose").Types.ObjectId;


// Models
const Shop = require('../models/shop');
const Item = require("../models/item");
const User = require("../models/user");
const Query = require("../models/query");

// Nodemailer setup
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service : 'gmail',
    secure : false,
    port : 25,
    auth : {
        user : process.env.EmailId,
        pass : process.env.EmailPass
    },
    tls : {
        rejectUnauthorized : false
    }});



/*                                                           ROUTES                                       */

// @route   DELETE /api/admin/delete/user/:id 
// @desc    Delete a user account
// @access  Private
router.delete('/delete/user/:id', auth, async(req, res) => {

    if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
    {
        return res.json({
            success: false,
            message: "User Not Found"
          });
    }

    const admin = await User.findById(req.admin.id);
    if(admin && admin.role === 1)
    {   
        try {
                await User.findByIdAndDelete(req.params.id);   
                return res.json({
                    success: true,
                    message: "User deleted successfully"
                })
        } catch (err) {
            return res.json({
                success: false,
                message: "User could not be deleted"
            })
        }
    }

    else
    {
        return res.json({
            success: false,
            message: "Unauthorized!"
        })

    }
  
}) 


// @route   DELETE /api/admin/delete/shop/:id 
// @desc    Delete a user account
// @access  Private
router.delete('/delete/shop/:id', auth, async(req, res) => {

    if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
    {
        return res.json({
            success: false,
            message: "Shop Not Found"
          });
    }
    const admin = await User.findById(req.admin.id);
    if(admin && admin.role === 1)
    {   
        try {
            await Item.deleteMany({shop: req.params.id});

            await Shop.findByIdAndDelete(req.params.id);   
            return res.json({
                success: true,
                message: "Shop deleted successfully"
            })
        } catch (err) {
            return res.json({
                success: false,
                message: "Shop could not be deleted"
            })
        }
    }

    else
    {
        return res.json({
            success: false,
            message: "Unauthorized!"
        })

    }
  
}) 


// @route   POST /api/admin/feedback 
// @desc    Get user feedback
// @access  public
router.post("/feedback", async(req, res) => {
    
    // Checking for empty fields
    for (var keys in req.body) {
        if (req.body[keys] === undefined || req.body[keys] === "") 
          {
            var incomplete = keys;
            break;
          }
      }
  
      // Return error if there are some undefined values
      if (incomplete != undefined) {
        return res.json({
          success: false,
          message: "Please fill " + incomplete.toUpperCase()
        });
      }

      var re = /\S+@\S+\.\S+/;
      if(!re.test(req.body.email))
      {
          return res.json({
              success: false,
              message: "Please enter a valid email"
          })
      }
  
      const {name, email, description} = req.body;

      try {     
        const query = new Query({
            name,
            email,
            description
        })

        await query.save();

        
          // Send email to admin
          let HelperOptions ={

            from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
            to : 'farmgateishere@gmail.com',
            subject : `${name} has submitted a Query`,
            text : `Hello Admin, \n\n${description} \n\n${name} can be contacted at ${email}`
        };

        transporter.sendMail(HelperOptions,(err,info)=>{
            if(err) throw err;
            console.log("The message was sent");
        });

        return res.json({
            success: true,
            message: "Query submitted successfully"
        })
   
      } catch (err) {
          return res.json({
              success: false,
              message: err
          })
      }
})

// @route   PUT /api/admin/items/:id 
// @desc    Update item
// @access  Private 
router.put("/items/:id",
    auth, 
    async(req, res) => {
      
    // Formidable is used to handle form data. we are using it to handle image upload
    let form = new formidable.IncomingForm();
    form.keepExtensions = true // Extension for images
  
    form.parse(req, async(err, fields, files) => {
      if(err)
        {
            return res.status(400).json({
              success: false,
              message: 'Image could not be uploaded'});
        }
  
        
        // Saving product to the Database
        const item = await Item.findByIdAndUpdate(req.params.id, fields, {new: true});
        
        // Handle files
        if(files.image)
        {
            // Validate file size less than 1 MB
            if(files.image.size > 1000000)
            {
                return res.status(400).json({
                  success: false,
                  message: "File size should be less than 1 MB"
                })
            }
  
            item.image.data = fs.readFileSync(files.image.path);
            item.image.contentType = files.image.type;
        }

  
        // Save to database
        await item.save();

        return res.json({
          success: true,
          message: "Item Modified"
        })

    });
   
})


module.exports = router;