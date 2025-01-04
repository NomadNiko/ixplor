const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
require("dotenv").config();

const { G_CLIENT_ID, G_CLIENT_SECRET, G_REFRESH_TOKEN, ADMIN_EMAIL } =
  process.env;
const oauth2client = new OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  G_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

const sendEmailRegister = (to, url, name) => {
  oauth2client.setCredentials({
    refresh_token: G_REFRESH_TOKEN,
  });
  const accessToken = oauth2client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL,
      clientId: G_CLIENT_ID,
      clientSecret: G_CLIENT_SECRET,
      refreshToken: G_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: "Aloha " + name + ", Welcome to iXplor! Please Verify your Email.",
    html: `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="format-detection" content="date=no" />
  <meta name="format-detection" content="address=no" />
  <meta name="format-detection" content="email=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Welcome to iXplor ${name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');
    body,
    html,
    td,
    th,
    p,
    div,
    li,
    a,
    span {
      font-family: 'Exo 2', sans-serif !important;
      color: #ffffff !important;
    }
    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      min-height: 100% !important;
      width: 100% !important;
      -webkit-font-smoothing: antialiased;
      background-color: #1B1B1B !important;
    }
    #outlook a {
      padding: 0;
    }
    .ReadMsgBody,
    .ExternalClass {
      width: 100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }
    table,
    td,
    th {
      mso-table-lspace: 0 !important;
      mso-table-rspace: 0 !important;
      border-collapse: collapse;
    }
    body,
    td,
    th,
    p,
    div,
    li,
    a,
    span {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      mso-line-height-rule: exactly;
    }
    img {
      border: 0;
      outline: 0;
      line-height: 100%;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }
    .pc-gmail-fix {
      display: none;
      display: none !important;
    }
  </style>
  <style>
    @media (max-width: 620px) {
      .pc-w620-font-size-30px {
        font-size: 30px !important;
      }
      .pc-w620-line-height-133pc {
        line-height: 133% !important;
      }
      .pc-w620-font-size-16px {
        font-size: 16px !important;
      }
      .pc-w620-line-height-163pc {
        line-height: 163% !important;
      }
      .pc-w620-padding-35-35-35-35 {
        padding: 35px 35px 35px 35px !important;
      }
    }
  </style>
</head>
<body style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #1B1B1B;" bgcolor="#1B1B1B">
  <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #1B1B1B;" bgcolor="#1B1B1B" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
    <tr>
      <td align="center" valign="top">
        <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
                <tr>
                  <td valign="top">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                      <tr>
                        <td style="padding: 0px 0px 0px 0px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                              <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; border-radius: 0px; background-color: #1B1B1B;" bgcolor="#1B1B1B">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                        <tr>
                                          <td valign="top" align="center">
                                            <div style="text-decoration: none;">
                                              <div style="text-align:center;text-align-last:center;font-size:36px;letter-spacing:-0.6px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                                                <div style="margin-bottom: 0px;"><span style="line-height: 128%; text-decoration: none; text-transform: none;" class="pc-w620-font-size-30px pc-w620-line-height-133pc">Welcome to iXplor</span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td class="pc-w620-spacing-0-0-40-0" align="center" valign="top" style="padding: 0px 0px 60px 0px;">
                                      <img src="https://cloudfilesdm.com/postcards/5b973e8340d4f2fa083938db9dc8ed32.png" width="200" height="200" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 200px; height: auto; max-width: 100%; border: 0;" />
                                    </td>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <th valign="top" align="center" style="padding: 0px 0px 50px 0px; text-align: center; font-weight: normal; line-height: 1;">
                                      <a style="display: inline-block; box-sizing: border-box; border-radius: 8px; background-color: #1595e7; padding: 15px 17px 15px 17px; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="${url}" target="_blank"><span style="font-size:16px;letter-spacing:-0.2px;font-weight:500;font-style:normal;display: inline-block;font-variant-ligatures:normal;"><span style="display: inline-block; margin-bottom: 0px;"><span style="line-height: 150%; text-decoration: none; text-transform: none;">
                                      Click to Verify Email
                                      </span></span></span></a>
                                    </th>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                                      <img src="https://cloudfilesdm.com/postcards/image-1735794358024.png" width="200" height="200" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 200px; height: auto; max-width: 100%; border: 0;" />
                                    </td>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center" valign="top" style="padding: 0px 0px 29px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                        <tr>
                                          <td valign="top" align="center">
                                            <div style="text-decoration: none;">
                                              <div style="text-align:center;text-align-last:center;font-size:18px;letter-spacing:-0.2px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                                                <div style="margin-bottom: 0px;"><span style="line-height: 156%; text-decoration: none; text-transform: none;" class="pc-w620-font-size-16px pc-w620-line-height-163pc">
                                                Travel the Globe with Ease
                                                <br>
                                                ${url}
                                                </span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
</body>
</html>
  `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return { err };
    return info;
  });
};
const sendEmailReset = (to, url, text, name) => {
  oauth2client.setCredentials({
    refresh_token: G_REFRESH_TOKEN,
  });
  const accessToken = oauth2client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL,
      clientId: G_CLIENT_ID,
      clientSecret: G_CLIENT_SECRET,
      refreshToken: G_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: "Reset Password for iXplor",
    html: `
   <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="format-detection" content="date=no" />
  <meta name="format-detection" content="address=no" />
  <meta name="format-detection" content="email=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Reset Your Password</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap');
    body,
    html,
    td,
    th,
    p,
    div,
    li,
    a,
    span {
      font-family: 'Exo 2', sans-serif !important;
      color: #ffffff !important;
    }
    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      min-height: 100% !important;
      width: 100% !important;
      -webkit-font-smoothing: antialiased;
      background-color: #1B1B1B !important;
    }
    #outlook a {
      padding: 0;
    }
    .ReadMsgBody,
    .ExternalClass {
      width: 100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }
    table,
    td,
    th {
      mso-table-lspace: 0 !important;
      mso-table-rspace: 0 !important;
      border-collapse: collapse;
    }
    body,
    td,
    th,
    p,
    div,
    li,
    a,
    span {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      mso-line-height-rule: exactly;
    }
    img {
      border: 0;
      outline: 0;
      line-height: 100%;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }
    .pc-gmail-fix {
      display: none;
      display: none !important;
    }
  </style>
  <style>
    @media (max-width: 620px) {
      .pc-w620-font-size-30px {
        font-size: 30px !important;
      }
      .pc-w620-line-height-133pc {
        line-height: 133% !important;
      }
      .pc-w620-font-size-16px {
        font-size: 16px !important;
      }
      .pc-w620-line-height-163pc {
        line-height: 163% !important;
      }
      .pc-w620-padding-35-35-35-35 {
        padding: 35px 35px 35px 35px !important;
      }
    }
  </style>
</head>
<body style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #1B1B1B;" bgcolor="#1B1B1B">
  <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #1B1B1B;" bgcolor="#1B1B1B" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
    <tr>
      <td align="center" valign="top">
        <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
                <tr>
                  <td valign="top">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                      <tr>
                        <td style="padding: 0px 0px 0px 0px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                              <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; border-radius: 0px; background-color: #1B1B1B;" bgcolor="#1B1B1B">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                        <tr>
                                          <td valign="top" align="center">
                                            <div style="text-decoration: none;">
                                              <div style="text-align:center;text-align-last:center;font-size:36px;letter-spacing:-0.6px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                                                <div style="margin-bottom: 0px;"><span style="line-height: 128%; text-decoration: none; text-transform: none;" class="pc-w620-font-size-30px pc-w620-line-height-133pc">Reset Your Password</span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td class="pc-w620-spacing-0-0-40-0" align="center" valign="top" style="padding: 0px 0px 60px 0px;">
                                      <img src="https://cloudfilesdm.com/postcards/5b973e8340d4f2fa083938db9dc8ed32.png" width="200" height="200" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; object-fit: contain; width: 200px; height: auto; max-width: 100%; border: 0;" />
                                    </td>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <th valign="top" align="center" style="padding: 0px 0px 50px 0px; text-align: center; font-weight: normal; line-height: 1;">
                                      <a style="display: inline-block; box-sizing: border-box; border-radius: 8px; background-color: #1595e7; padding: 15px 17px 15px 17px; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="${url}" target="_blank"><span style="font-size:16px;letter-spacing:-0.2px;font-weight:500;font-style:normal;display: inline-block;font-variant-ligatures:normal;"><span style="display: inline-block; margin-bottom: 0px;"><span style="line-height: 150%; text-decoration: none; text-transform: none;">
                                      Click to Reset Password
                                      </span></span></span></a>
                                    </th>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                                      <img src="https://cloudfilesdm.com/postcards/image-1735794358024.png" width="200" height="200" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 200px; height: auto; max-width: 100%; border: 0;" />
                                    </td>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center" valign="top" style="padding: 0px 0px 29px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                                        <tr>
                                          <td valign="top" align="center">
                                            <div style="text-decoration: none;">
                                              <div style="text-align:center;text-align-last:center;font-size:18px;letter-spacing:-0.2px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                                                <div style="margin-bottom: 0px;"><span style="line-height: 156%; text-decoration: none; text-transform: none;" class="pc-w620-font-size-12px pc-w620-line-height-163pc">
                                                <br><br><br><br><br>
                                                If you didn't request a password reset, please ignore this email. 
                                                <br><br><br><br><br>
                                                </span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
</body>
</html>
  `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return { err };
    return info;
  });
};
module.exports = { sendEmailRegister, sendEmailReset };
