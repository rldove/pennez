
module.exports.send = function (tos, subject, bodyHTML) {
    let aws = require('aws-sdk');
    aws.config.update({ "accessKeyId": "AKIAIH27GV4JJ7DK3SMA", "secretAccessKey": "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", "region": "us-east-1" });

    const ses = new aws.SES({ apiVersion: '2010-12-01' });


    return new Promise(function (resolve, reject) {
        var from = 'pennez@myhive.io';

        var body = {
            Html: { Data: bodyHTML }
        };

        var sendObj = {
            Source: from,
            Destination: { ToAddresses: tos },
            Message: {
                Subject: {
                    Data: subject
                },
                Body: body
            }
        }

        // this sends the email
        ses.sendEmail(sendObj, function (err, data) {
            if (!data) {
                data = {};
            }
            data.EMAILsendObj = sendObj;
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }

        });
    });
    // end send sms
}