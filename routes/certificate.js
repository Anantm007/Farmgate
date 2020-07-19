const express = require("express");
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/shopAuth');

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


// @route   GET /api/certificate/:id
// @desc    Get particular certificate
// @access  Public
router.get("/:id", async(req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        if(!certificate) {
            return res.json({success: false, message: "No certificates found"})
        }

        else {    
            return res.status(200).json({success: true, certificate})
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
router.post("/", auth, async(req, res) => {
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


// @route   Update /api/certificate
// @desc    Update a new certificate
// @access  Public
router.put("/:id", auth, async(req, res) => {
    try {  
        const newData = req.body;

        const certificate = await Certificate.findByIdAndUpdate(req.params.id, newData, {new: true});

        return res.status(200).json({success: true, certificate});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err})
    }
})


// @route   DELETE /api/certificate/:id
// @desc    Delete a certificate
// @access  Public
router.delete("/:id", auth, async(req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id).select(" _id");

        if(!certificate) {
            return res.status(404).json({success: false, message: "Certificate not found"})
        }
        
        await Certificate.findByIdAndRemove(req.params.id);
        return res.status(200).json({success: true});

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err})
    }
})


module.exports = router;