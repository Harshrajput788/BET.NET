export const emailTempleate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Veficition Code</title>
  <style>
    /* Basic email-safe styles */
    body {
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      color: #333333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      border: 1px solid #f0f0f0;
      border-radius: 6px;
      background-color: #ffffff;
      box-shadow: 0 0 4px rgba(0,0,0,0.05);
    }

    .header {
      background-color: #ff7a00; /* Orange theme */
      color: #ffffff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 30px 20px;
      text-align: center;
    }

    .content h2 {
      color: #ff7a00;
      margin-bottom: 10px;
    }

    .otp-box {
      display: inline-block;
      background-color: #fff4e6; /* Light orange background */
      border: 1px solid #ff7a00;
      border-radius: 4px;
      padding: 15px 25px;
      font-size: 28px;
      letter-spacing: 4px;
      font-weight: bold;
      color: #ff7a00;
      margin: 20px 0;
    }

    .footer {
      background-color: #fff4e6;
      text-align: center;
      padding: 15px;
      color: #777777;
      font-size: 13px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    a {
      color: #ff7a00;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Secure Verification</h1>
    </div>
    <div class="content">
      <h2>Your One-Time Password (OTP)</h2>
      <p>Use the OTP below to complete your verification. It will expire in <strong>5 minutes</strong>.</p>
      
      <div class="otp-box">{verification}</div>

      <p>If you didn’t request this code, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      &copy; 2026 Your Company. All rights reserved.<br/>
      <a href="#">yourcompany.com</a>
    </div>
  </div>
</body>
</html>
`