const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Photo } = require('../../db/models');

const router = express.Router();

// Get all photos
router.get(
    '/',
    asyncHandler(async (req, res) => {
        // const { userId, title, description, photoURL } = req.body;
        const photos = await Photo.findAll();

        // await setTokenCookie(res, user);
        return res.json({
            photos,
        });
    }),
);

// Get photo by id
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const photoId = req.params.id;
        const photo = await Photo.findByPk(photoId);

        // await setTokenCookie(res, user);
        return res.json({
            photo,
        });
    }),
);

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

// Update Photo
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { photoId, title, description } = req.body;
        // console.log("YOU ARE HERE")
        const photoToUpdate = await Photo.findByPk(photoId);

        await photoToUpdate.update({
            title,
            description
        })

        const updatedPhoto = await Photo.findByPk(photoId);

        // await setTokenCookie(res, user);
        return res.json({
            updatedPhoto,
        });
    }),
);

// Delete photo by id
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const photoId = req.params.id;
        // const { userId, title, description, photoURL } = req.body;
        const photoToDelete = await Photo.findByPk(photoId);
        await photoToDelete.destroy()

        // await setTokenCookie(res, user);
        return res.json({
            photoToDelete,
        });
    }),
);

module.exports = router;