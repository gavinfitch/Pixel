const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { Comment } = require('../../db/models');

const router = express.Router();

// Get all comments
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const comments = await Comment.findAll();

        return res.json({
            comments,
        });
    }),
);

// Get comment by id
router.get(
    '/:id',
    asyncHandler(async (req, res) => {

        const commentId = req.params.id;
        const comment = await Comment.findByPk(commentId);

        return res.json({
            comment
        });
    }),
);

// Add Comment
router.post(
    '/',
    asyncHandler(async (req, res) => {

        const { userId, photoId, content } = req.body;
        const comment = await Comment.create({ userId, photoId, content });

        return res.json({
            comment,
        });
    }),
);

// Edit comment by id
router.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { commentId, content } = req.body;
        const commentToUpdate = await Comment.findByPk(commentId);

        await commentToUpdate.update({
            content
        })

        const updatedComment = await Comment.findByPk(commentId);

        return res.json({
            updatedComment,
        });
    }),
);

// Delete comment by id
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const commentId = req.params.id;
        const commentToDelete = await Comment.findByPk(commentId);
        await commentToDelete.destroy()

        return res.json({
            commentToDelete,
        });
    }),
);

module.exports = router;