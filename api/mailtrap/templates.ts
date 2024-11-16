export const PASSWORD_RESET_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; border: 1px solid #ddd;">
    <h2 style="color: #2c3e50; text-align: center;">Asalamualaykum</h2>
    <p style="color: #555; line-height: 1.6;">
      You recently requested to reset your password for your <strong>Taqwa Type</strong> account. Click the button below to reset it:
    </p>
    <a href="{reset_link}" style="display: block; text-align: center; background-color: #009688; color: #fff; padding: 12px; border-radius: 5px; text-decoration: none; margin: 20px 0;">Reset Password</a>
    <p style="color: #555; line-height: 1.6;">
      If you did not request a password reset, please ignore this email. <br />
      This link will expire in 1 hour
    </p>
    <hr style="border-top: 1px solid #ddd;">
    <p style="font-size: 14px; color: #999; text-align: center;">
      May Allah bless your efforts in seeking knowledge. <br><strong>Taqwa Type Team</strong>
    </p>
  </div>
</body>
</html>`;

export const VERIFICATION_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verification Code</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; border: 1px solid #ddd;">
    <h2 style="color: #2c3e50; text-align: center;">Asalamualaykum</h2>
    <p style="color: #555; line-height: 1.6;">
      Your <strong>Taqwa Type</strong> verification code is below:
    </p>
    <div style="background-color: #e0f7fa; color: #009688; font-size: 24px; text-align: center; padding: 15px; border-radius: 5px; margin: 20px 0;">
      {VERIFICATION_CODE}
    </div>
    <p style="color: #555; line-height: 1.6;">
      Please enter this code to complete your account verification. <br /> This code expires in 1 day.
    </p>
    <hr style="border-top: 1px solid #ddd;">
    <p style="font-size: 14px; color: #999; text-align: center;">
      May your journey with the Quran and typing be fruitful. <br><strong>Taqwa Type Team</strong>
    </p>
  </div>
</body>
</html>`; 

export const WELCOME_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Taqwa Type</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; border: 1px solid #ddd;">
    <h2 style="color: #2c3e50; text-align: center;">Welcome to Taqwa Type!</h2>
    <p style="color: #555; line-height: 1.6;">
      Asalamualaykum! We're thrilled to have you join <strong>Taqwa Type</strong>.
    </p>
    <p style="color: #555; line-height: 1.6;">
      Our mission is to help you improve your typing skills while reflecting on the beautiful words of the Quran. Here are some tips to get started:
    </p>
    <ul style="color: #555; line-height: 1.6;">
      <li>Choose a Surah to read and type along.</li>
      <li>Track your progress and improve your typing speed.</li>
      <li>Connect with others on the journey to increase Taqwa.</li>
    </ul>
    <a href="{{welcome_link}}" style="display: block; text-align: center; background-color: #009688; color: #fff; padding: 12px; border-radius: 5px; text-decoration: none; margin: 20px 0;">Get Started</a>
    <hr style="border-top: 1px solid #ddd;">
    <p style="font-size: 14px; color: #999; text-align: center;">
      May Allah bless you with knowledge and understanding. <br><strong>Taqwa Type Team</strong>
    </p>
  </div>
</body>
</html>`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Password Reset Successful</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; border: 1px solid #ddd;">
      <h2 style="color: #2c3e50; text-align: center;">Asalamualaykum</h2>
      <p style="color: #555; line-height: 1.6;">
        Alhamdulillah, your password for <strong>Taqwa Type</strong> has been successfully reset.
      </p>
      <p style="color: #555; line-height: 1.6;">
        If you did not request this change, please contact our support team immediately to secure your account.
      </p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://taqwatype.com/login" style="background-color: #009688; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block;">
          Sign in to your account
        </a>
      </div>
      <hr style="border-top: 1px solid #ddd; margin-top: 40px;">
      <p style="font-size: 14px; color: #999; text-align: center;">
        May Allah make your journey with the Quran easier. <br>
        <strong>Taqwa Type Team</strong>
      </p>
    </div>
  </body>
  </html>
`;