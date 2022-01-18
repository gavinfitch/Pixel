module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001,
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    // awsConfig: {
    //     key: process.env.AWS_KEY,
    //     secretKey: process.env.AWS_SECRET_KEY,
    // }
};