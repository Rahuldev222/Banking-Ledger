const nodemailer = require('nodemailer');

// transporter to handle SMTP (EMAIL HANDLER SERVER) OF GOOGLE 
// SMTP -: SIMPLE MAIL TRANFER PROTOCOL
const APP_NAME = "Sexy Rawan Ltd";
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.Email_user,
        clientId: process.env.Client_ID,
        clientSecret: process.env.Client_Secret,
        refreshToken: process.env.Refresh_token,
    },
});

// varify connection configuration 
transporter.verify((error,sucess)=>{
    if(error){
        console.error("Error connection to gmail serevr: ",error);
    }
    else {
        // console.log("email server is ready to sent message")
        console.log("connected sucessult nodemailer SMTP",sucess)// my thought line
    }
})
// Function to sent Email 
const sentEmail = async (to,subject,text,html) => {
    try{
        const info = await transporter.sendMail({
            from: `"${APP_NAME}" <${process.env.Email_user}>`, //sender adress
            to, // list of recivers
            subject, // subject line 
            text,// plain text body 
            html,
        });
        console.log("message sent: %s", info.messageId);
        console.log("Previev URL: %s", nodemailer.getTestMessageUrl(info));// false Ethereal 
    }
    catch (error){
        console.log("Error while sending email:", error);
    }
};

async function sendRegistrationEmail(userEmail,name) {
    const subject = `Welcome to ${APP_NAME}, ${name}!`;
    const text = `Hello ${name}, 
Thank you for registering with ${APP_NAME}. Your account has been created successfully.
Best regards,
${APP_NAME} Team`;    

    const html = `
        <p>Hello ${name},</p>
        <p>Thank you for registering with <b>${APP_NAME}</b>. Your account has been created successfully.</p>
        <p>Best regards,<br> Backend Ledger Team</p>
    `;
    await sentEmail(userEmail,subject,text,html); // sentEmail called
}
module.exports = {sendRegistrationEmail};
// transporter jo hai wo nodemailer se bna hai 
// transporter = nodemailer.methods()
// if needen any otehr file then enly export 
// if sentEmail function need another file and module ten onlu export 