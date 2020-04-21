const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/userAuth');
const shopAuth = require('../middleware/shopAuth');
const adminAuth = require('../middleware/adminAuth');

require('dotenv').config()

var path = require('path'); 
const shortid = require('shortid');

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

// PDF Receipt
const {createInvoice} = require('./createInvoice');
const {shopWeeklyInvoice} = require('./shopWeeklyInvoice');


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
    // const orderCheck = await Order.findOne({accessCode});
    // if(orderCheck)
    // {
    //     return res.json({
    //         success: false,
    //         message: 'Order cannot be placed again'
    //     })
    // }

    let items = [];

    user.cart.forEach(async(c) => {
        let x = await Item.findById(c.item).select('name variant price description')
        let i = {
            item: c.item,
            itemName: x.name,
            price: x.price,
            description: x.description.substring(0,20) + '...',
            variant: x.variant,
            amount: c.quantity * x.price,
            quantity: c.quantity
        }

        items.push(i);
    })

    let item = await Item.findById(user.cart[0].item)
    let shop = item.shop;
    const s = await Shop.findById(shop).select('name email');

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
        totalAmount,
    })
    
    await order.save();

    user.cart = [];
    user.history.push(order);
    await user.save();

    let ta,sh;
    if(tax_shipping === 0)
    {
        ta = sh = 0;
    }

    else if(tax_shipping === 4.95)
    {
        sh = 4.95;
        ta = 0;
    }

    else 
    {
        sh = 9.9;
        ta = 0;
    }
    
    const invoice = {
      shipping: {
        name: order.userName,
        address: user.address,
        city: "Adelaide",
        state: "South Australia",
        country: "Australia",
        postal_code: user.zipCode
      },
      items: items ,

      subtotal: subtotal,
      shippingAmount: sh,
      tax: ta,
      total: totalAmount,
      invoice_nr: order._id
    };
    
    const code = shortid.generate();
    createInvoice(invoice, `${code}.pdf`);

    // Send order confirmation email to user and admin
    let HelperOptions = {
        from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
        to : "farmgateishere@gmail.com",
        subject : "Hey admin, a purchase has been made!",
        text : "Hello Admin, \n\nA purchase of $" + totalAmount.toFixed(2) + " has been made by " + user.name + "\n\nRegards, \nThe Farmgate Team",
        attachments: [{
            filename: `${code}.pdf`,
            path: path.join(__dirname, `../${code}.pdf`),
            contentType: 'application/pdf'
          }]
    };
        
    transporter.sendMail(HelperOptions,(err,info)=>{
        if(err) throw err;
        console.log("The message was sent");
    });

    let HelperOptions2 = {
        from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
        to : user.email,
        subject : "Your order on Farmgate Market was successful",
        text : "Hello " + user.name + ", \n\nYour purchase of $" + totalAmount.toFixed(2) + " on Farmgate Market was successful. Please check your dashboard to track the status of your order. You can also find more details in the attached receipt.\n\nRegards, \nThe Farmgate Team",
        attachments: [{
            filename: `${code}.pdf`,
            path: path.join(__dirname, `../${code}.pdf`),
            contentType: 'application/pdf'
          }]
    };

    transporter.sendMail(HelperOptions2,(err,info)=>{
        if(err) throw err;
        console.log("The message was sent...");
    });


    let HelperOptions3 = {
        from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
        to : s.email,
        subject : "You have a new order on Farmgate Market",
        text : "Hello " + s.name + ", \n\nA new order for your shop was placed by" + user.name +  "on Farmgate Market. You can find more details in the attached receipt.\n\nRegards, \nThe Farmgate Team",
        attachments: [{
            filename: `${code}.pdf`,
            path: path.join(__dirname, `../${code}.pdf`),
            contentType: 'application/pdf'
          }]
    };
        
    transporter.sendMail(HelperOptions3,(err,info)=>{
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
router.get('/shop/:id', shopAuth, async(req, res) => {
    
    if(req.shop.id != req.params.id)
    {
        return res.json({
            success: false,
            message: "Sorry, you are not authorized!"
        })
    }

    try {
        const orders = await Order.find({shop: req.params.id}).sort('-createdAt');
     
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



// @route   GET /api/order/user/:userId
// @desc    Get all orders for a particular user
// @access  Private 
router.get('/user/:id', auth, async(req, res) => {
    
    if(req.user.id != req.params.id)
    {
        return res.json({
            success: false,
            message: "Sorry, you are not authorized!"
        })
    }

    try {
        const orders = await Order.find({user: req.params.id}).sort('-createdAt');
        
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


// @route   GET /api/order/invoice/:shopId
// @desc    Generate Invoice for shop
// @access  Private 
router.get('/invoice/:id', adminAuth, async(req, res) => {

    try {   
        const shop = await Shop.findById(req.params.id);
        const orders = await Order.find({shop: req.params.id, InvoiceIncluded: false, createdAt: {
                $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
            }})
        
        let subtotal = 0;
        orders.forEach(async(o) => {
            subtotal += o.subtotal
        })

        
        const code = shortid.generate();
        const invoice = {
            shipping: {
            name: shop.name,
            address: shop.address,
            city: "Adelaide",
            state: "South Australia",
            country: "Australia",
            ABN: shop.ABN,
            postal_code: shop.zipCode
            },
            orders: orders,
    
            subtotal: subtotal,
            FarmgateFees: subtotal*0.225,
            total: 0.775*subtotal,
            invoice_nr: code
        };

        shopWeeklyInvoice(invoice, `${code}.pdf`);
        
        // Send invoice confirmation email to user and admin
        let HelperOptions = {
            from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
            to : "farmgateishere@gmail.com",
            subject : `Hey admin, an invoice has been generated for ${shop.name}`,
            text : "Hello Pelle, \n\nAn invoice of $" + invoice.total + `  has been generated for ${shop.name}` + "\n\nRegards, \nThe Farmgate Team",
            attachments: [{
                filename: `${code}.pdf`,
                path: path.join(__dirname, `../${code}.pdf`),
                contentType: 'application/pdf'
            }]
        };
            
        transporter.sendMail(HelperOptions,(err,info)=>{
            if(err) throw err;
            console.log("The message was sent");
        });

        let HelperOptions2 = {
            from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
            to : shop.email,
            subject : "Invoice generated for you on Farmgate Market",
            text : `Hello ${shop.name}, \n\nAn invoice of $` + invoice.total + ` has been generated. You should receive the payment soon. \n\nRegards, \nThe Farmgate Team`,
            attachments: [{
                filename: `${code}.pdf`,
                path: path.join(__dirname, `../${code}.pdf`),
                contentType: 'application/pdf'
            }]
        };
            
        transporter.sendMail(HelperOptions2,(err,info)=>{
            if(err) throw err;
            console.log("The message was sent...");
        });

        orders.forEach(async(o) => {
            o.InvoiceIncluded = true;
            await o.save();
        })

        return res.json({
            success: true,
            message: 'Invoice generated, please check your email'
        })
        
    } catch (err) {
        return res.json({
            success: false,
            message: err
        })
    }
})


// @route   GET /api/order/checkPromo
// @desc    Check whether the entered promo code is valid or not
// @access  Private 
router.post('/checkout/checkPromo', auth, async(req, res) => {
    
    try { 
        if(req.body.promoCode === 'pesticidefreeforme' || req.body.promoCode === 'eatingisseasonallyadjusted' )
        {
            return res.json({
                success: true
            })
        }   

        else
        {
            return res.json({
                success: false,
                message: "Sorry, this promo code is either invalid or has expired"
            })
        }
    } catch (err) {
        return res.json({
            success: false,
            message: err
        })
    }
})



module.exports = router;