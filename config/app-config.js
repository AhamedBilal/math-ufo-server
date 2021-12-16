module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    URL: process.env.BASE_URL || 'http://localhost:8080',
    DATABASE: process.env.DATABASE || 'math_ufo',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.PASSWORD || 'neominds@123',
    SECRET: 'f71d29fba1d349c8cab0370c880cb44f',
    MAIL_SERVICE: process.env.MAIL_SERVICE || 'gmail',
    MAIL_USER: process.env.MAIL_USER || '',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
    MAIL_FROM: process.env.MAIL_FROM || '',
};
