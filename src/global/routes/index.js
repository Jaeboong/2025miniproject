const express = require("express");
const router = express.Router();

const memberRoutes = require("../../members/member.route");
const aiRoutes = require("../../ai/upload");
const studyRoutes = require("../../study/studyRoutes");

router.use("/users", memberRoutes);
router.use("/ai", aiRoutes);
router.use("/study", studyRoutes);

module.exports = router;
