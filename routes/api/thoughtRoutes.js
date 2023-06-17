const router = require("express").Router();
const { getThoughts } = require("../../controllers/thoughtController");

// /api/applications
router.route("/").get(getThoughts).post(createThought);
