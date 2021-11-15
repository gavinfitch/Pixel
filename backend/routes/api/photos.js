const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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

// Get photos by userId
router.get(
    '/users/:id',
    asyncHandler(async (req, res) => {
        const photos = await Photo.findAll({
            order: [
                ['title', 'ASC']
            ],
            include: [User],
        });

        return res.json({
            photos,
        });
    }),
);

const validateUploadPhoto = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide title.'),
    check('photoURL')
        .exists({ checkFalsy: true })
        .withMessage('There was an error with the upload. Please try again.'),
    handleValidationErrors,
];

// Add Photo
router.post(
    '/',
    validateUploadPhoto,
    asyncHandler(async (req, res) => {
        const { userId, title, description, photoURL, s3Name } = req.body;
        const photo = await Photo.create({ userId, title, description, photoURL, s3Name });

        return res.json({
            photo,
        });
    }),
);

const validateEditPhoto = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide title.'),
    handleValidationErrors,
];

// Update Photo
router.put(
    '/:id',
    validateEditPhoto,
    asyncHandler(async (req, res) => {
        const { photoId, title, description } = req.body;
        const photoToUpdate = await Photo.findByPk(photoId);

        await photoToUpdate.update({
            title,
            description
        })

        const updatedPhoto = await Photo.findByPk(photoId);

        return res.json({
            updatedPhoto,
        });
    }),
);

const validateAlbumSelect = [
    check('albumId')
        .exists({ checkFalsy: true })
        .withMessage('Please select album.'),
    handleValidationErrors,
];

// Album select
router.put(
    '/:id/albumselect',
    validateAlbumSelect,
    asyncHandler(async (req, res) => {
        const { photoId, albumId } = req.body;
        const photoToUpdate = await Photo.findByPk(photoId);

        await photoToUpdate.update({
            albumId
        })

        const updatedPhoto = await Photo.findByPk(photoId);

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
        const photoToDelete = await Photo.findByPk(photoId);
        await photoToDelete.destroy()

        return res.json({
            photoToDelete,
        });
    }),
);

module.exports = router;