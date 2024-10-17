

export const htmlTemplate = (token:string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <title>Vanilla Leak - Password Reset</title>
</head>
<body style="font-family: Verdana, Geneva, Tahoma, sans-serif; margin: 0; padding: 0;background-color: #e4dede;">
    <table class="box" style="width: 50%; height: 90vh; background-color: #d3c5c5; margin-left: 25%; margin-top: 5%;">
        <tr>
        
          <th scope="row" colspan="6"><a href="https://vanillaleak.com" target="_blank"><img src="https://www.vanillaleak.com/_next/static/media/logoSecundario.cd8ca59e.png" alt=""></a></th>
          
        </tr>
        <tr>
        
          <td scope="row" colspan="6"><h1 style="text-align: center;margin-bottom: -20px;">VanillaLeak.com</h1></td>
    
        </tr>
        <tr>
         
          <td scope="row" colspan="8"><h2 style="text-align: center;">Password Reset Instructions</h2></td>
         
        </tr>
        <tr>
          
          <td scope="row" colspan="8"><p style="text-align: center;margin-bottom: -20px;">Hello There!</p></td>
         
        </tr>
        <tr>
          
          <td scope="row" colspan="8"><p style="text-align: center;">Click on the bellow link to reset your password account...</p></td>
          
        </tr>
        <tr style="margin-bottom: 30px; padding-bottom: 40px;">
         
          <td scope="row" colspan="8" ><p style="text-align: center;"><a href="https://vanillaleak.com/auth/password-recovery?token=${token}" target="_blank" style="cursor: pointer;">Password Reset Link</a></p></td>
          
        </tr>
        <tr style="margin-bottom: 30px; padding-bottom: 40px;">
         
         <td scope="row" colspan="8"></td>
          
        </tr>
      </table>
      <table class="box" style="width: 50%; height: auto; margin-left: 25%;margin-bottom: 10%;">
        <tr>
          <th scope="row" colspan="6">
           <a href="https://vanillaleak.com/legal/terms" target="_blank">Terms of Service</a>
          </th>
          <th scope="row" colspan="6">
            <a href="https://vanillaleak.com/legal/privacy" target="_blank">Privacy Policy</a>
           </th>
        </tr>
      </table>
</body>
</html>
`