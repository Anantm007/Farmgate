const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/adminAuth');

require('dotenv').config()

const MongoObjectId = require("mongoose").Types.ObjectId;


// Models
const Shop = require('../models/shop');
const Item = require("../models/item");
const User = require("../models/user");


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
    console.log(req.admin)
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


module.exports = router;