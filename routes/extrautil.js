const express = require('express');
const router = express.Router();

const fs = require("fs");

// Models
const SuburbAndPostcode = require('../models/suburbAndPostcode');


// @route   POST /api/util/cleanPostcodes
// @desc    Remove duplicate postcodes from MongoDB
// @access  Private 
router.get("/cleanPostcodes", async(req, res) => {
    try {
        // path needs to be changes in future
        let data = JSON.parse(fs.readFileSync(`${__dirname}/postcodes_geo.json`, 'utf-8'));

        var flags = {};
        let myData = [];
        data.filter(function(obj) {
            if (!flags[obj.postcode]) {
                flags[obj.postcode] = true;
                myData.push(obj);
            }
        });

        myData.forEach(async(obj) => {
            let x = new SuburbAndPostcode({
                postcode: obj.postcode,
                suburb: obj.suburb
            })

            await x.save();
        })

        data = await SuburbAndPostcode.find({});

        return res.status(200).json(data)

    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
})


// @route   POST /api/util/specialInvoice/:orderId
// @desc    Generate PDF invoice using the user id
// @access  Private 
router.get("/specialInvoice/:id", async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return res.json({
            success: false,
            message: "Order not found"
        })
    } 
    const user = await User.findById(order.user).select("address zipCode");
    let orderItems = [];
    
    orderItems = [
        {
            itemName: "Banana",
            description: "Per pack",
            price: 2.5,
            quantity: 2,
            variant: "500 g",
            amount: 5
        },
        {
            itemName: "Beans Green",
            description: "Per pack",
            price: 3.6,
            quantity: 1,
            variant: "200 g",
            amount: 3.6
        },
        {
            itemName: "Carrot",
            description: "Per bag",
            price: 6.5,
            quantity: 1,
            variant: "1 kg",
            amount: 6.5
        },
        {
            itemName: "Cauliflower",
            description: "Half Cauliflower",
            price: 4.2,
            quantity: 1,
            variant: "Each",
            amount: 4.2
        },
        {
            itemName: "Sweet Potato",
            description: "Per pack",
            price: 9,
            quantity: 1,
            variant: "1 kg",
            amount: 9
        },
        {
            itemName: "Pumpkin - Butternut",
            description: "Cut",
            price: 4.7,
            quantity: 1,
            variant: "1 kg",
            amount: 4.7
        }
    ]
    const invoice = {
        shipping: {
          name: order.userName,
          address: user.address,
          city: "Adelaide",
          state: "South Australia",
          country: "Australia",
          postal_code: user.zipCode
        },
        items: orderItems,
        subtotal: order.subtotal,
        shippingAmount: 4.95, // Be careful
        tax: 0,
        total: order.totalAmount,
        invoice_nr: order._id
      };
      const code = shortid.generate();
      createInvoice(invoice, `${code}.pdf`);     
})

// @route   POST /api/order/special/:userId
// @desc    Create order using the user's id
// @access  Private 
// router.post('/special/:id', async(req, res) => {
//     const user = await User.findById(req.params.id);
    
//     const {instructions, subtotal, tax_shipping, totalAmount} = req.body;
    
//     let items = [];

//     user.cart.forEach(async(c) => {
//         let x = await Item.findById(c.item).select('name variant price description')
//         let i = {
//             item: c.item,
//             itemName: x.name,
//             price: x.price,
//             description: x.description.substring(0,20) + '...',
//             variant: x.variant,
//             amount: c.quantity * x.price,
//             quantity: c.quantity
//         }

//         items.push(i);
//     })

//     let item = await Item.findById(user.cart[0].item)
//     let shop = item.shop;
//     const s = await Shop.findById(shop).select('name email');

//     const order = new Order({
//         items,
//         user: user._id,
//         userName: user.name,
//         shop,
//         shopName: s.name, 
//         deliveryAddress: user.address,
//         instructions,
//         subtotal, 
//         tax_shipping, 
//         totalAmount,
//     })
    
//     await order.save();

//     user.cart = [];
//     user.history.push(order);
//     await user.save();

//     let ta,sh;
//     if(tax_shipping === 0)
//     {
//         ta = sh = 0;
//     }

//     else if(tax_shipping === 4.95)
//     {
//         sh = 4.95;
//         ta = 0;
//     }

//     else 
//     {
//         sh = 9.9;
//         ta = 0;
//     }
    
//     const invoice = {
//       shipping: {
//         name: order.userName,
//         address: user.address,
//         city: "Adelaide",
//         state: "South Australia",
//         country: "Australia",
//         postal_code: user.zipCode
//       },
//       items: items ,

//       subtotal: subtotal,
//       shippingAmount: sh,
//       tax: ta,
//       total: totalAmount,
//       invoice_nr: order._id
//     };
    
//     const code = shortid.generate();
//     createInvoice(invoice, `${code}.pdf`);

//     // Send order confirmation email to user and admin
//     let HelperOptions = {
//         from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
//         to : "farmgateishere@gmail.com",
//         subject : "Hey admin, a purchase has been made!",
//         text : "Hello Admin, \n\nA purchase of $" + totalAmount.toFixed(2) + " has been made by " + user.name + "\n\nRegards, \nThe Farmgate Team",
//         attachments: [{
//             filename: `${code}.pdf`,
//             path: path.join(__dirname, `../${code}.pdf`),
//             contentType: 'application/pdf'
//           }]
//     };
        
//     transporter.sendMail(HelperOptions,(err,info)=>{
//         if(err) throw err;
//         console.log("The message was sent");
//     });

//     let HelperOptions2 = {
//         from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
//         to : user.email,
//         subject : "Your order on Farmgate Market was successful",
//         text : "Hello " + user.name + ", \n\nYour purchase of $" + totalAmount.toFixed(2) + " on Farmgate Market was successful. Please check your dashboard to track the status of your order. You can also find more details in the attached receipt.\n\nRegards, \nThe Farmgate Team",
//         attachments: [{
//             filename: `${code}.pdf`,
//             path: path.join(__dirname, `../${code}.pdf`),
//             contentType: 'application/pdf'
//           }]
//     };

//     transporter.sendMail(HelperOptions2,(err,info)=>{
//         if(err) throw err;
//         console.log("The message was sent...");
//     });


//     let HelperOptions3 = {
//         from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
//         to : s.email,
//         subject : "You have a new order on Farmgate Market",
//         text : "Hello " + s.name + ", \n\nA new order for your shop was placed by" + user.name +  "on Farmgate Market. You can find more details in the attached receipt.\n\nRegards, \nThe Farmgate Team",
//         attachments: [{
//             filename: `${code}.pdf`,
//             path: path.join(__dirname, `../${code}.pdf`),
//             contentType: 'application/pdf'
//           }]
//     };
        
//     transporter.sendMail(HelperOptions3,(err,info)=>{
//         if(err) throw err;
//         console.log("The message was sent...");
//     });

//     return res.json({
//         success: true,
//         data: user
//     })
    
// })

module.exports = router;