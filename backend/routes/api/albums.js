const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Album, Photo } = require('../../db/models');

const router = express.Router();

// Get all albums
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const albums = await Album.findAll();

        return res.json({
            albums,
        });
    }),
);

// Get album by id
router.get(
    '/:id',
    asyncHandler(async (req, res) => {

        const albumId = req.params.id;
        const album = await Album.findByPk(albumId);

        return res.json({
            album,
        });
    }),
);

// Get albums by userId
router.get(
    '/users/:id',
    asyncHandler(async (req, res) => {
        const userId = req.params.id;

        const albums = await Album.findAll({
            where: { userId }
        });

        return res.json({
            albums,
        });
    }),
);

const validateCreateAlbum = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide title.'),
    handleValidationErrors,
];

// Add album
router.post(
    '/',
    validateCreateAlbum,
    asyncHandler(async (req, res) => {

        const { userId, title, description } = req.body;
        const album = await Album.create({ userId, title, description });

        return res.json({
            album,
        });
    }),
);

const validateEditAlbum = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide title.'),
    handleValidationErrors,
];

// Edit album by id
router.put(
    '/:id',
    validateEditAlbum,
    asyncHandler(async (req, res) => {
        const { albumId, title, description } = req.body;

        const albumToUpdate = await Album.findByPk(albumId);

        await albumToUpdate.update({
            title,
            description
        })

        const updatedAlbum = await Album.findByPk(albumId);

        return res.json({
            updatedAlbum,
        });
    }),
);

// Delete album by id
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const albumId = req.params.id;
        const albumPhotos = await Photo.findAll({
            where: {
                albumId
            }
        })

        await albumPhotos.forEach((photo) => {
            photo.update({
                albumId: null
            })
        })

        const albumToDelete = await Album.findByPk(albumId);
        await albumToDelete.destroy()

        return res.json({
            albumToDelete,
        });
    }),
);

module.exports = router;