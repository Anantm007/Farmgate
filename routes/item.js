const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/shopAuth');

require('dotenv').config()
var multer = require('multer');
const fs = require("fs");

const MongoObjectId = require("mongoose").Types.ObjectId;

// Models
const Item = require("../models/item");
const Shop = require("../models/shop");

// Multer setup
const multerConf = {
    storage: multer.diskStorage({
      destination: function(req, file, next)
      {
        next(null,"./public/images");
      },
  
      filename: function(req, file, next)
      {
        const ext = file.mimetype.split("/")[1];
        next(null, file.fieldname + '-' + Date.now()+ "." + ext);
      }
    }),
  
    fileFilter: function(req, file, next)
    {
      if(!file)
      {
        next();
      }
  
      const image = file.mimetype.startsWith("image/");
  
      if(image)
      {
        next(null, true);
      }
      else
      {
        next({message: "File type not supported"}, false);
      }
    }
  };
  
  var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/images')
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
      }
  });
  var upload = multer({
      storage: storage,
      limits: {fileSize: 10}
    });
  

 
    
/*                                                       ROUTES                                                   */


// @route   POST /api/items 
// @desc    Add new item
// @access  Private 
router.post("/",
auth, 
multer(multerConf).single("image"), 
async(req, res) => {
    
    if(req.file.size > 1000000)
    {
        return res.json({
            success: false,
            message: "Please upload a file with size less than 1 MB"
        })
    }

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

    const {name, price, image, variant, quality} = req.body;    // Destructure
    
    const item = new Item({
        name,
        price,
        variant,
        quality,
        image,
        shop: req.shop.id     // After token is successfully verified
    })
        
    // Assigning image properties
    item.image.data = fs.readFileSync(req.file.path);
    item.image.contentType = "image/png";
   
    // Add the item to shop's item array
    const shop = await Shop.findById(item.shop);
    shop.items.unshift(item);
    console.log(shop.items)
    await shop.save();
    
    try {    
        // Saving product to the Database
        await item.save();

        return res.json({
            success: true,
            data: item
        })
       
    } catch (err) {
        res.json({
            success: false,
            message: err
        });
    }
})


// @route   GET /api/items/:id 
// @desc    Get a particular item
// @access  Public 
router.get("/:id", async(req, res) => {
  
  if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
  {
      return res.json({
          success: false,
          message: "Item Not Found"
        });
  }

  const item = await Item.findById(req.params.id).select('-image');

  if(!item)
  {
      return res.json({
        success: false,
        message: "Item not found!"
      })
  }

  return res.json({
    success: true,
    data: item
  })
  
});


// @route   PUT /api/items/:id 
// @desc    Update item
// @access  Private 
router.put("/:id",
    auth, 
    multer(multerConf).single("image"), 
    async(req, res) => {
      
        // Check whether the shop is authorized or not
        const item = await Item.findById(req.params.id);
        
        if( (item && JSON.stringify(item.shop) !== JSON.stringify(req.shop.id) ) || !item)
        {
          return res.json({
            success: false,
            message: "You are not authorized to perform this action!"
          })
        }
        
        if(req.file && req.file.size > 1000000)
        {
            return res.json({
                success: false,
                message: "Please upload a file with size less than 1 MB"
            })
        }

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

        
        let newFields = ({
          name: req.body.name || item.name,
          price: req.body.price || item.price,
          variant: req.body.variant || item.variant,
          quality: req.body.quality || item.quality,
          inStock: req.body.inStock || item.inStock,
          image: item.image
        });
          

        if(req.file)
        {   
          // Assigning image properties
          item.image.data = fs.readFileSync(req.file.path);
          item.image.contentType = "image/png";
        } 

        try {    
            // Saving product to the Database
            const item = await Item.findByIdAndUpdate(req.params.id, newFields, {new: true});
            return res.json({
                success: true,
                data: item
            })
           
        } catch (err) {
            res.json({
                success: false,
                message: err
            });
        }
})


// @route   DELETE /api/items//:id 
// @desc    Delete item using item id
// @access  Private
router.delete("/:id", auth, async(req, res) => {
  
  // Check whether the shop is authorized or not
  const item = await Item.findById(req.params.id);
  if( (item && JSON.stringify(item.shop) !== JSON.stringify(req.shop.id) ) || !item)
  {
    return res.json({
      success: false,
      message: "You are not authorized to perform this action!"
    })
  }

  if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
  {
      return res.json({
          success: false,
          message: "Item Not Found"
        });
  }

  await Item.findByIdAndDelete(req.params.id, async(err, item) => {
    if(err)
    {
      return res.json({
        success: false,
        message: "Item Not Found"
      })
    }

  })

  return res.json({
    success: true,
    message: "Item deleted"
  });

})



// @route   GET /api/items/photo/:id 
// @desc    Display image using item id
// @access  Public 
router.get('/photo/:id', async(req, res) => {

  if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
    {
        return res.json({
            success: false,
            message: "Item Not Found"
          });
    }

    const result = await Item.findById(req.params.id); 

    if (!result) 
    {
        res.json({
            success: false,
            message: "Image not found"
        });
    }   

    res.contentType('image/jpeg');
    res.send(result.image.data);     
  
});
  

module.exports = router;