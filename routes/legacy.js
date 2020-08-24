// @route   POST /api/order/special/:userId
// @desc    Create order using the user's id
// @access  Public
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
