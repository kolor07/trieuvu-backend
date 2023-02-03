const authConfig = {
    secret: process.env.ACCESS_TOKEN_SECRET,
    jwtExpiration: 30, // 2 minutes
    jwtRefreshExpiration: 86400, // 24 hours

    /* for test */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
};

export default authConfig;
