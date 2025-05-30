const express = require("express");
const router = express.Router();

const memberRoutes = require("../members/member.route");
const aiRoutes = require("../ai/upload");
const studyRoutes = require("../study/studyRoutes");
const problemRoutes = require("../problems/problem.route");

router.use("/users", memberRoutes);
router.use("/ai", aiRoutes);
router.use("/study", studyRoutes);
router.use("/problems", problemRoutes);

module.exports = router;
