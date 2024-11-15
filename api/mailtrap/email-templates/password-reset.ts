export const PASSWORD_RESET_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; border: 1px solid #ddd;">
    <h2 style="color: #2c3e50; text-align: center;">As-salamu alaykum,</h2>
    <p style="color: #555; line-height: 1.6;">
      You recently requested to reset your password for your <strong>Taqwa Type</strong> account. Click the button below to reset it:
    </p>
    <a href="{{reset_link}}" style="display: block; text-align: center; background-color: #009688; color: #fff; padding: 12px; border-radius: 5px; text-decoration: none; margin: 20px 0;">Reset Password</a>
    <p style="color: #555; line-height: 1.6;">
      If you did not request a password reset, please ignore this email.
    </p>
    <hr style="border-top: 1px solid #ddd;">
    <p style="font-size: 14px; color: #999; text-align: center;">
      May Allah bless your efforts in seeking knowledge. <br><strong>Taqwa Type Team</strong>
    </p>
  </div>
</body>
</html>`;