const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Album } = require('../../db/models');

const router = express.Router();

// Get all albums
router.get(
    '/',
    asyncHandler(async (req, res) => {
        // const { userId, title, description, photoURL } = req.body;
        const albums = await Album.findAll();

        // await setTokenCookie(res, user);
        return res.json({
            albums,
        });
    }),
);

// Get album by id
router.get(
    '/:id',
    asyncHandler(async (req, res) => {

        console.log("YOU ARE IN THE BACKEND")
        const albumId = req.params.id;
        console.log(albumId)
        const album = await Album.findByPk(albumId);

        // await setTokenCookie(res, user);
        return res.json({
            album,
        });
    }),
);

// Get photo by userId
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


// Add album
router.post(
    '/',
    asyncHandler(async (req, res) => {

        // console.log("YOU ARE IN THE BACKEND")
        const { userId, title, description } = req.body;
        const album = await Album.create({ userId, title, description });

        // await setTokenCookie(res, user);
        return res.json({
            album,
        });
    }),
);

// Edit album by id
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { albumId, title, description } = req.body;
        // console.log("YOU ARE HERE")
        const albumToUpdate = await Album.findByPk(albumId);

        await albumToUpdate.update({
            title,
            description
        })

        const updatedAlbum = await Album.findByPk(albumId);

        // await setTokenCookie(res, user);
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
        // const { userId, title, description, photoURL } = req.body;
        const albumToDelete = await Album.findByPk(albumId);
        await albumToDelete.destroy()

        // await setTokenCookie(res, user);
        return res.json({
            albumToDelete,
        });
    }),
);

module.exports = router;