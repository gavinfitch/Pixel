const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Photo, User } = require('../../db/models');

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

// Get photo by userId
router.get(
    '/users/:id',
    asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const photos = await Photo.findAll({
            where: { userId },
            include: [User]
        });

        // await setTokenCookie(res, user);
        return res.json({
            photos,
        });
    }),
);

// Add Photo
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { userId, title, description, photoURL, s3Name } = req.body;
        const photo = await Photo.create({ userId, title, description, photoURL, s3Name });

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

// Album select
router.put(
    '/:id/albumselect',
    asyncHandler(async (req, res) => {
        const { photoId, albumId } = req.body;
        const photoToUpdate = await Photo.findByPk(photoId);

        await photoToUpdate.update({
            albumId
        })

        const updatedPhoto = await Photo.findByPk(photoId);

        // await setTokenCookie(res, user);
        return res.json({
            updatedPhoto,
        });
    }),
);

// Album select
router.put(
    '/:id/albumremove',
    asyncHandler(async (req, res) => {
        const { photoId } = req.body;
        const photoToUpdate = await Photo.findByPk(photoId);

        await photoToUpdate.update({
            albumId: null
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