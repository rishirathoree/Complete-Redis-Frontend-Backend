const moment = require("moment");

function AddMomentHours(hourValue) {
    const current = moment();
    const newTime = current.add(hourValue, 'hours');
    // console.log(newTime.toISOString(), 'adding hours');
    return newTime.toISOString();
}

function AddMomentDays(dayValue) {
    const current = moment();
    const newTime = current.add(dayValue, 'days');
    return newTime.toISOString();
}

module.exports = {
    AddMomentHours,
    AddMomentDays
};
