const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide last name.'),
    check('username')
        // .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide username of at least 1 character.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email address.'),
    check('email')
        // .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide valid email address.'),
    check('password')
        // .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Please provide password of at least 6 characters.'),

    handleValidationErrors,
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { username, firstName, lastName, email, password } = req.body;
        const user = await User.signup({ username, firstName, lastName, email, password });

        await setTokenCookie(res, user);
        return res.json({
            user,
        });
    }),
);

module.exports = router;