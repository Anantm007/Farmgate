const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/shopAuth');

require('dotenv').config()
var multer = require('multer');
const fs = require("fs");

// Express validation
const { check, validationResult } = require('express-validator');

// Models
const Item = require("../models/item");

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
  

/*                                                          ROUTES                                       */

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


// @route   GET /api/items/photo/:id 
// @desc    Display image using item id
// @access  Public 
router.get('/photo/:id', async(req, res) => {
    
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