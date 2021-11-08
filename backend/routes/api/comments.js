const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Comment } = require('../../db/models');

const router = express.Router();

// Get all comments

// Add Comment

// Edit comment by id

// Delete comment by id

module.exports = router;