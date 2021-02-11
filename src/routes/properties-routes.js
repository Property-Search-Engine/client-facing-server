const { Router } = require("express");
const auth = require("../middleware/auth-middleware");

const router = Router();

const {
    getProperty,
    searchProperties
} = require("../controllers/properties-controller");

router.get("/:propertyId", auth(), getProperty);
router.get("/", auth(), searchProperties);

module.exports = router;
