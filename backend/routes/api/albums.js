const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Album } = require('../../db/models');

const router = express.Router();

// Get all albums

// Add album

// Edit album by id

// Delete album by id

module.exports = router;