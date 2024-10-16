import nodemailer from 'nodemailer'

const htmlTemplate = '<h1>Vanilla Leak</h1>'

export async function main() {
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
            from: 'Vanilla Leak - Account managment <info@vanillaleak.com>',
            to: 'eduardo2502@gmail.com',
            subject: 'Testing this email sender',
            html: htmlTemplate
    })
}

