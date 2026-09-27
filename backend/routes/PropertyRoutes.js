const express = require("express");

const router = express.Router();

const {
    createProperty,
    getAllProperties,
    getPropertyById,
    getMyProperties,
    updateProperty,
    deleteProperty
} = require("../controllers/PropertyController");

const authenticateToken = require("../middleware/authMiddleware");


router.get("/test", (req, res) => {
    res.json({
        message: "Property API is working"
    });
});


// Get all properties
router.get("/", getAllProperties);

router.get(
    "/my-properties",
    authenticateToken,
    getMyProperties
);

router.get("/:id", getPropertyById);

router.put(
    "/:id",
    authenticateToken,
    updateProperty
);

router.delete(
    "/:id",
    authenticateToken,
    deleteProperty
);

// Create property
router.post(
    "/",
    authenticateToken,
    createProperty
);


module.exports = router;