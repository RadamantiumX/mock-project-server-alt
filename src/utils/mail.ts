import nodemailer from 'nodemailer'
// import fs from 'fs'
// import { promisify } from 'util'


// const readFileAsync = promisify(fs.readFile)

const htmlTemplate = `<html>
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanilla Leak</title>
</head>
<body class=“em_body” style="font-family: Verdana, Geneva, Tahoma, sans-serif; margin:0px; padding:0px;” bgcolor=“#efefef">
    <div class="main-box" style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: auto; height: 100vh; background-color: #dccfe3;">
       <a href="https://vanillaleak.com" target="_blank"><img src="https://www.vanillaleak.com/_next/static/media/logoSecundario.cd8ca59e.png" alt=""></a> 
        <div class="second-box" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1 class="title" style="color: #6653d3;  font-size: x-large;">VanillaLeak.com</h1>
            <h2 class="subtitle">Password Reset Instructions</h2>
        </div>
        <div class="card-box" style="width: 400px; height: 200px; padding: 20px; border:solid 1px #ddbddd; background-color: #ddbddd;">
           <h3>Hello There!</h3>
           <p>Click on the bellow button to reset your password account...</p>
           <div class="inner-btn" style="display:flex; flex-direction: column; align-items: center;">
            <button style="padding: 10px;background-color: #6653d3; font-size: medium; color: #f3eff3; cursor: pointer; border-radius: 20px;">
                Reset Password Link
            </button>
          </div>
           <p>Hope was helpful</p>
        </div>
        <div class="links-box" style="display: flex; flex-direction: row; align-items: center; margin-top: 40px;">
            <a href="">Term of Service</a> | <a href="">Privacy Policy</a>   
        </div>
    </div>
</body>
</html>`



export async function main(email:string) {
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
            html: htmlTemplate
    })

    console.log("Message sent: "+info.messageId)
}

