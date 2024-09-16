const { OTP_VALID_MINUTE, SALT_ROUNDS } = require("../constants.js");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const passwordHasher = (password) => {
    const hashed = bcrypt.hashSync(password, SALT_ROUNDS);
    return hashed;
};

const bcrypterHashedPassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
};

const otpGenerator = () => {
    const randomOtp = Math.floor(Math.random() * 9000 + 1000);
    return randomOtp;
};

const generateExpiryTime = (minutes) => {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + minutes * 60000); // Add 'minutes' to current time
    return expiryTime;
};

const TimeExpiryJustifer = (time, limit) => {
    const timeInMillis = new Date(time).getTime();
    const limitInMillis = limit * 60 * 1000;
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - timeInMillis;
    return timeDifference <= limitInMillis;
};

const generateTemporaryToken = () => {
    const unhashedToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(unhashedToken).digest('hex');
    const tokenExpiry = generateExpiryTime(1);
    return { unhashedToken, hashedToken, tokenExpiry };
};

const addHoursToCurrentTime = (hours) => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + hours);
    return currentTime.toISOString();
};

const addDaysToCurrentDate = (numberOfDays) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + numberOfDays);
    return newDate;
};

module.exports = {
    passwordHasher,
    bcrypterHashedPassword,
    otpGenerator,
    generateExpiryTime,
    TimeExpiryJustifer,
    generateTemporaryToken,
    addHoursToCurrentTime,
    addDaysToCurrentDate
};
