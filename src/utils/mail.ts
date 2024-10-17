import nodemailer from 'nodemailer'
import { htmlTemplate } from './template';

export async function main(email:string, token:string) {
    //const htmlTemplate = await readFileAsync('./src/template/index.html','utf-8')
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'info@vanillaleak.com',
            pass: 'SeBa2010!'
        }
    })

    const info = await transporter.sendMail({
            from: 'Vanilla Leak <info@vanillaleak.com>',
            to: email,
            subject: 'Vanilla Leak | Reset your password',
            html: htmlTemplate(token)
    })

    console.log("Message sent: "+info.messageId)
}

