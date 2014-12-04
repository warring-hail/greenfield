require('dotenv').load();

var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

var generateCode = function(userPhone) {
    var code = Math.floor(Math.random()*90000) + 10000;
    // Save code and number in database
    return code;
};

module.exports = {
    sendVerification: function(req, res) {
        var userPhone = req.body.phone;
        var code = generateCode(userPhone);

        console.log("SID",process.env.TWILIO_SID);
        console.log("AUTH TOKEN", process.env.TWILIO_AUTH_TOKEN);
        client.sendMessage({
            to:'+1'+userPhone, // Any number Twilio can deliver to
            from: '+16508259600', // A number you bought from Twilio and can use for outbound communication
            body: "Enter "+code+" on the signup page to verify your account." // body of the SMS message
        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if(err) throw err;
            if(!err) {
                console.log(responseData.from);
                console.log(responseData.body);
            }
        });

    },
    verifyCode: function(req, res) {
        var userPhone = req.body.phone;
        var userCode = req.body.code;

        // Lookup code in database by userPhone
        // If it's the correct code, send a response 201
        // If it's not, return false, if it's not send a 404
    }
}

