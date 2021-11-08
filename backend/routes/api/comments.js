const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Comment } = require('../../db/models');

const router = express.Router();

// Get all comments

// Add Comment
// Add album
router.post(
    '/',
    asyncHandler(async (req, res) => {

        // console.log("YOU ARE IN THE BACKEND")
        const { userId, photoId, content } = req.body;
        const comment = await Comment.create({ userId, photoId, content });

        // await setTokenCookie(res, user);
        return res.json({
            comment,
        });
    }),
);

// Edit comment by id

// Delete comment by id
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const commentId = req.params.id;
        // const { userId, title, description, photoURL } = req.body;
        const commentToDelete = await Comment.findByPk(commentId);
        await commentToDelete.destroy()

        // await setTokenCookie(res, user);
        return res.json({
            commentToDelete,
        });
    }),
);

module.exports = router;