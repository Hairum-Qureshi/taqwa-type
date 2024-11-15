export const VERIFICATION_EMAIL = `<!DOCTYPE html>
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