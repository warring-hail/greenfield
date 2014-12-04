// Make a post request to the correct URL
///2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}

//require the Twilio module and create a REST client
TWILIO_AUTH_TOKEN = "33221289c2cd812e654e1a58f51467a5";
TWILIO_SID = "AC9399d6f79b86ce3becf0e7b98f2a45a4";

var client = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN);

//Send an SMS text message

var generateCode = function(userPhone) {
    var code = Math.floor(Math.random()*90000) + 10000;
    // Save code and number in database
    return code;
};

module.exports = {
    sendVerification: function() {
        var userPhone = req.body.userPhone;
        var code = generateCode(userPhone);
        client.sendMessage({
            to:'+1'+userPhone, // Any number Twilio can deliver to
            from: '+16508259600', // A number you bought from Twilio and can use for outbound communication
            body: "Enter "+code+" on the signup page to verify your account." // body of the SMS message
        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) {
                console.log(responseData.from);
                console.log(responseData.body);
            }
        });
    },
    verifyCode: function() {
        var userPhone = req.body.userPhone;
        var submittedCode = req.body.code;
        // Lookup code in database by userPhone
    }

