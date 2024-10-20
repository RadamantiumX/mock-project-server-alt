export async function verifyRecaptcha(captchaToken:any) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`
    try {
        const response = await fetch(verificationURL,{
            method: 'POST',
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        const data = await response.json()
        if(data.success){
            return { success: true }
        } else {
            return {success: false, error: 'Captcha verification failed'}
        }
    }catch(error){
        return {success: false, error: 'Server error'}
    }
}