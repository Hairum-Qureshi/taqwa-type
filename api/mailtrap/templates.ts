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
    <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <h3 style="color: #2c3e50;">Important Etiquette Guidelines</h3>
      <p style="color: #555; line-height: 1.6;">
        As we embark on this journey together, we kindly remind you to maintain Islamic etiquette while using Taqwa Type:
      </p>
      <ul style="color: #555; line-height: 1.6; padding-left: 20px;">
        <li>Ensure your <strong>profile picture is modest</strong> and respectful, in accordance with Islamic values.</li>
        <li>Be mindful of your interactions with others, upholding good character and manners (<em>akhlaq</em>).</li>
        <li>Use this platform to benefit yourself and others by deepening your connection with the Quran.</li>
      </ul>
      <p style="color: #777; font-size: 14px;">
        Let us all strive to seek Allah's pleasure through our actions. May this platform be a source of knowledge and blessings for you.
      </p>
    </div>
    <a href="{profile_link}" style="display: block; text-align: center; background-color: #009688; color: #ffffff; padding: 12px; border-radius: 5px; text-decoration: none; margin: 30px 0;">
      Go to your profile
    </a>

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
        <a href="https://taqwatype.com" style="background-color: #009688; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block;">
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

export const REPORT_WARNING_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NSFW Profile Picture Warning</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #ddd; margin-top: 20px;">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #2a3d3f; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px;">Taqwa Type</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; color: #333;">
                <h2 style="margin-top: 0; font-size: 20px; color: #2a3d3f;">NSFW Profile Picture Warning</h2>
                <p style="font-size: 14px; line-height: 1.6;">
                    Asalamualaykum,
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    We have received a report regarding your current profile picture on Taqwa Type, which has been flagged as inappropriate and not in compliance with our platform's values. As this is an Islamic site, NSFW (Not Safe For Work) content, including inappropriate or explicit imagery, is strictly prohibited.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    Below is the reported profile picture:
                </p>
                <div style="text-align: center; margin: 15px 0;">
                    <img src="{image_src}" alt="Reported Profile Picture" style="max-width: 100%; height: auto; border: 1px solid #ddd; padding: 5px; background-color: #f9f9f9;">
                </div>
                <p style="font-size: 14px; line-height: 1.6;">
                    You have <strong>1 day</strong> to update your profile picture to an appropriate image that adheres to our guidelines. Failure to comply within the specified time frame will result in a ban from the platform.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    If you believe this report is a mistake, please contact our team at <span style="color: #2a3d3f; text-decoration: underline;">{support_email}</span> as soon as possible. We are here to address any concerns or misunderstandings.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    We encourage you to uphold the values of modesty and respect that Taqwa Type is built upon.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    Jazakum Allahu Khairan for your understanding.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">- The Taqwa Type Team</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const PERMANENT_BAN_ALERT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Permanently Banned</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #ddd; margin-top: 20px;">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #2a3d3f; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px;">Taqwa Type</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; color: #333;">
                <h2 style="margin-top: 0; font-size: 20px; color: #2a3d3f;">Account Permanently Banned</h2>
                <p style="font-size: 14px; line-height: 1.6;">
                    Asalamualaykum,
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    We regret to inform you that your Taqwa Type account has been permanently banned due to a repeated violation of our platform's rules. Despite receiving a previous warning, it appears that the terms of conduct were not adhered to, which has led to this action.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    Taqwa Type is a platform that values respect, modesty, and Islamic principles. It is essential for all users to follow these guidelines to maintain a positive and respectful environment for everyone. Unfortunately, due to the disregard for the final warning given, we are unable to continue your access to the platform.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    If you believe this decision was made in error, you may contact us at <span style="color: #2a3d3f; text-decoration: underline;">{support_email}</span>. However, please be advised that repeated violations will not be tolerated, and this decision is final.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    Jazakum Allahu Khairan for your understanding and we appreciate your interest in trying our platform.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">- The Taqwa Type Team</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const BAN_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Temporarily Banned</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #ddd; margin-top: 20px;">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #2a3d3f; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px;">Taqwa Type</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; color: #333;">
                <h2 style="margin-top: 0; font-size: 20px; color: #2a3d3f;">Your Account Has Been Temporarily Banned</h2>
                <p style="font-size: 14px; line-height: 1.6;">
                    Assalamu Alaikum,
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    We regret to inform you that your Taqwa Type account has been temporarily banned for a period of 1 month due to a violation of our platform's rules. We take the principles of respect, modesty, and Islamic values seriously, and your actions did not align with the community standards we uphold.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    During this time, you will not be able to access your account. However, please note that after the 1-month ban, your account will be unbanned. We strongly advise you to reflect on our guidelines and ensure that future behavior aligns with the standards of the Taqwa Type platform.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    Please be aware that if any further violations of our rules occur after the ban period, your account will be permanently banned. We urge you to take this warning seriously.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    If you have any questions or believe this decision was made in error, please feel free to contact us at <a href="mailto:support@taqwatype.com" style="color: #2a3d3f; text-decoration: underline;">support@taqwatype.com</a>. We are here to assist you.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">
                    Jazakum Allahu Khairan for your understanding and cooperation.
                </p>
                <p style="font-size: 14px; line-height: 1.6;">- The Taqwa Type Team</p>
            </td>
        </tr>
    </table>
</body>
</html>`;