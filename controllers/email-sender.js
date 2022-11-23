const dotenv = require('dotenv').config({
    path: '../.env'
})

const nodemailer = require('nodemailer');
const {google} = require('googleapis');



console.log('********************', process.env.CLIENT_SECRET);
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
    //https://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html?view=magazine
    
    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID, 
        CLIENT_SECRET, 
        REDIRECT_URI
    );
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
    
    async function sendMail() {
        try {
        const accessToken = await oAuth2Client.getAccessToken()
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            
            auth: {
            type: 'oAuth2',
            user: 'bootcamp.advance@gmail.com',
            clientId:CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
            }
        })
    
        const mailOptions = {
            from: 'bootcamp.advance@gmail.com',
            to: 'silviya.stoilova@gmail.com',
            subject: "Hello from vs using api",
            text: 'hello from api',
            html: '<h1?>hello from api</h1?>',
        };
    
        const result = await transporter.sendMail(mailOptions)
        return result;
    
        } catch (error) {
            return error;
        }
    }
    
    sendMail()
        .then((result) => console.log('Email sent...', result))
        .catch((error) => console.log(error.message));
    
    
    