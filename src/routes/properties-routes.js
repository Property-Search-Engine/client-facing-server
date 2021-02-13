const { Router } = require("express");

const router = Router();

const {
    getProperty,
    searchProperties
} = require("../controllers/properties-controller");

router.get("/:propertyId", getProperty);
router.get("/", searchProperties);

module.exports = router;
