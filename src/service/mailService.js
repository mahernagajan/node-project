const nodemailer = require('nodemailer');
class mailservice {
    async sendMail(req) {
        console.log(req)
        try {
            let mailTransporter =
                nodemailer.createTransport(
                    {
                        service: 'gmail',
                        auth: {
                            user: 'nagajanthapaliya2004@gmail.com',
                            pass: 'pboonaquduuxtxos'
                        }
                    }
                );
            //send mail to request through get receiver email id
            // let mailDetails = {
            //     from: 'nagjanthapaliya@gmail.com',
            //     to: req.to,
            //     subject: req.subject,
            //     html: template
            // };
            //send mail to crate a new user
            let mailDetails = {
                from: 'nagjanthapaliya@gmail.com',
                to: req.eMail,
                subject: req.subject,
                html: req.html
            };
            // console.log(mailDetails);
            mailTransporter
                .sendMail(mailDetails,
                    function (err, data) {
                        if (err) {
                            console.log('Error Occurs');
                            console.log(err)
                        } else {
                            console.log('Email sent successfully');
                        }
                    });
        }
        catch (err) {
            console.log(err)
        }

    }
};
module.exports = new mailservice();