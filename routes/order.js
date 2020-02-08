const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/userAuth');
const shopAuth = require('../middleware/shopAuth');
const adminAuth = require('../middleware/adminAuth');

require('dotenv').config()

// nodemailer to send emails
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


// Models
const User = require('../models/user');
const Shop = require('../models/shop');
const Order = require('../models/order');
const Item = require("../models/item");

/*                                                  ROUTES                                                  */


// @route   GET /api/order/status-values
// @desc    Get status values of orders
// @access  Public 
router.get('/statusValues', async(req, res) => {
    return res.json({
        success: true,
        data: Order.schema.path("status").enumValues
    })  
}) 

// @route   POST /api/order/:userId
// @desc    Create order using the user's id
// @access  Private 
router.post('/:id', auth, async(req, res) => {
    const user = await User.findById(req.params.id);
    
    const {instructions, subtotal, tax_shipping, totalAmount} = req.body;
    let items = [];

    user.cart.forEach(c => {
        let i = {
            item: c.item,
            quantity: c.quantity
        }

        items.push(i);
    })

    let item = await Item.findById(user.cart[0].item)
    let shop = item.shop;
    const s = await Shop.findById(shop).select('name');

    const order = new Order({
        items,
        user: user._id,
        userName: user.name,
        shop,
        shopName: s.name, 
        deliveryAddress: user.address,
        instructions,
        subtotal, 
        tax_shipping, 
        totalAmount
    })
    
    await order.save();

    user.cart = [];
    user.history.push(order);
    await user.save();

    // Send order confirmation email to user and admin
    let HelperOptions = {
        from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
        to : "farmgateishere@gmail.com",
        subject : "Hey admin, a purchase has been made!",
        text : "Hello Pelle, \n\nA purchase of $" + totalAmount + " has been made by " + user.name + "\n\nRegards, \nFarmgate"
    };
        
    transporter.sendMail(HelperOptions,(err,info)=>{
        if(err) throw err;
        console.log("The message was sent");
    });

    let HelperOptions2 = {
        from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
        to : user.email,
        subject : "Your order on Farmgate Market was successful",
        text : "Hello " + user.name + ", \n\nYou purchase of $ " + totalAmount + " on Farmgate Market was successful. Please check your dashboard to track the status of your order.\n\nRegards, \Farmgate Market"
    };
        
    transporter.sendMail(HelperOptions2,(err,info)=>{
        if(err) throw err;
        console.log("The message was sent...");
    });

    return res.json({
        success: true,
        data: user
    })
    
})


// @route   GET /api/order/:id
// @desc    Get a particular order
// @access  Public 
router.get('/:id',async(req, res) => {
    
    try {
        const order = await Order.findById(req.params.id);
     
        return res.json({
            success: true,
            data: order
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err
        })
    }
})
    

// @route   GET /api/order/:shopId
// @desc    Get all orders for a particular shop
// @access  Private 
router.get('/:id', shopAuth, async(req, res) => {
    
    if(req.shop.id != req.params.id)
    {
        return res.json({
            success: false,
            message: "Sorry, you are not authorized!"
        })
    }

    try {
        const orders = await Order.findMany({shop: req.params.id}).sort('-createdAt');
     
        return res.json({
            success: true,
            count: orders.length,
            data: orders
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err
        })
    }
})


// @route   GET /api/order/all
// @desc    Get all orders for admin
// @access  Private 
router.get('/admin/all', async(req, res) => {
    try {
        const orders = await Order.find().sort('-createdAt');
     
        return res.json({
            success: true,
            count: orders.length,       
            data: orders
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err
        })
    }
})

// @route   PUT /api/order/admin/update/:id
// @desc    Update order by admin
// @access  Private 
router.put('/admin/update/:id', adminAuth, async(req, res) => {
    await Order.update({_id: req.params.id}, {$set: {status: req.body.status}}, (err, order) => {
        if(err)
        {
            return res.json({
                success: false,
                message: err
            })
        }
        return res.json({
            success: true,
            data: order
        });
    });
})



module.exports = router;