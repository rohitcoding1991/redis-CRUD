const nodemailer = require("nodemailer")
const ejs = require("ejs")
const path = require("path")
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.PASS_EMAIL
    }
})

const sendEmail = (to, subject, templateName, context) => {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        path.join(__dirname,'..','views',`${templateName}.ejs`),
        context,
        (err, html) => {
          if (err) {
            return reject(err);
          }
  
          const mailOptions = {
            from: process.env.USER_EMAIL,
            to,                                         
            subject,                                   
            html,                                       
          };
  
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return reject(error); 
            }
            console.log('Email sent: %s', info.messageId);
            resolve(info); 
          });
        }
      );
    });
  };


module.exports = {
    sendEmail
}