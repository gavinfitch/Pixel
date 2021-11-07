const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Photo } = require('../../db/models');

const router = express.Router();

// Add Photo
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { userId, title, description, photoURL } = req.body;
        const photo = await Photo.create({ userId, title, description, photoURL });

        // await setTokenCookie(res, user);
        return res.json({
            photo,
        });
    }),
);

module.exports = router;