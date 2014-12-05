require('dotenv').load();
var AuthCodeModel = require('./authCodeModel');
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

var generateCode = function(userPhone) {
    var code = Math.floor(Math.random()*90000) + 10000;
    var codeModel = new AuthCodeModel.AuthCode({ phone: userPhone, code: code });
    codeModel.save(function(err,codeModel) {
        if(err) throw err;
        console.log("code saved");
    });
    return code;
};

module.exports = {
    sendVerification: function(req, res) {
        var userPhone = req.body.phone;
        var code = generateCode(userPhone);

        client.sendMessage({
            to:'+1'+userPhone, // Any number Twilio can deliver to
            from: '+16508259600', // A number you bought from Twilio and can use for outbound communication
            body: "Enter "+code+" on the signup page to verify your account." // body of the SMS message
        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if(err) throw err;
            if(!err) {
                console.log("Message sent",responseData.body);
            }
        });

    },
    verifyCode: function(req, res) {
        var userPhone = req.body.phone;
        var code = req.body.code;
        console.log("USERPHONE",userPhone);
        console.log("CODE",code);
        AuthCodeModel.AuthCode.find({ phone: userPhone, code: code }, function(err,data) {
            if(err) return console.error(err);
            if(data.length === 0) {

            }
            console.log("Record",data);

        });
    }
}

