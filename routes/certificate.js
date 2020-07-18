const express = require("express");
const router = express.Router();

// Models
const Certificate = require("../models/certificate");



// @route   GET /api/certificate
// @desc    Get all certificates
// @access  Public
router.get("/", async(req, res) => {
    try {
        const certificates = await Certificate.find({});

        if(certificates.length > 0) {
            return res.status(200).json({success: true, certificates})
        }

        else {    
            return res.json({success: false, message: "No certificates found"})
        
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err})
    }
})


// @route   POST /api/certificate/shop/:shopId
// @desc    Find certificates of a particular shop
// @access  Public
router.get("/shop/:shopId", async(req, res) => {
    try {
        const certificates = await Certificate.find({shop: req.params.shopId}).select("_id name url");
        
        if(certificates.length > 0) {
            return res.status(200).json({success: true, certificates})
        }

        else {    
            return res.json({success: false, message: "No certificates found"})
        
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err})
    }
})


// @route   POST /api/certificate
// @desc    Create a new certificate
// @access  Public
router.post("/", async(req, res) => {
    try {
        const {name, url, shop} = req.body;

        let certificate = new Certificate({
            name,
            url,
            shop
        });
        
        await certificate.save();

        return res.status(200).json({success: true, certificate});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err})
    }
})


// @route   DELETE /api/certificate/:id
// @desc    Delete a certificate
// @access  Public
router.delete("/:id", async(req, res) => {
    try {
        const {name, url, shop} = req.body;

        let certificate = new Certificate({
            name,
            url,
            shop
        });
        
        await certificate.save();

        return res.status(200).json({success: true, certificate});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err})
    }
})


module.exports = router;