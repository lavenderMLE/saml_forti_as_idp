import nodemailer from 'nodemailer' ;
import crypto from 'crypto' ;
import mailerConfig from '../../configs/mailerConfig' ;

let transporter = nodemailer.createTransport(mailerConfig);

export default async (toEmail , callback) => {

    let code =  crypto.randomBytes(20).toString('hex') ;

    let mailOptions = {
        from: mailerConfig.auth.user,
        to: toEmail,
        subject: 'CA1HEX.com Email Confirmation',
        html : `<h1>CA1HEX.com Email Confirmation</h1>` + 
                `<p> Confirm Code: ` + code + `</p>`

    };
    
    await transporter.sendMail(mailOptions, function (error) {
        if(error) console.log("Error Email Send") ;
        return callback(code);
    });
}
