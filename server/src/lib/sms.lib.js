const axios = require('axios')
const sendSMS = async (phoneNumber, otp) => {
    try {
        const response = await axios.post(`http://sms.smsindori.com/http-api.php?username=Lise&password=12345&senderid=IMRSMS&route=06&number=${phoneNumber}&message=${otp}%20is%20your%20Login%20otp%20for%20agrilinks%20IMRSMS&templateid=1207167594991592693`);
        return { success: true, response: response.data };
    } catch (error) {
        // console.error('Error sending SMS:', error);
        return { success: false, error: 'Failed to send SMS' };
    }
};
module.exports = { sendSMS }