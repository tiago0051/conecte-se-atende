import nodemailer from "nodemailer"

export default nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
})

