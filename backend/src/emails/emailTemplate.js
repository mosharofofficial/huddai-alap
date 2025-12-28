export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Huddai Alap</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    
    <!-- Main Container -->
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
      <tr>
        <td align="center">
          
          <!-- Email Card -->
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            
            <!-- Header with Pattern -->
            <tr>
              <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; position: relative;">
                <div style="background-image: url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"/%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"none\"/%3E%3Cpath d=\"M50 0L100 50 50 100 0 50z\" fill=\"%23ffffff\" opacity=\".05\"/%3E%3C/svg%3E'); background-size: 100px 100px; padding: 50px 40px; text-align: center;">
                  
                  <!-- Logo Container -->
                  <div style="display: inline-block; background: linear-gradient(145deg, #ffffff, #f0f0f0); padding: 20px; border-radius: 50%; box-shadow: 0 10px 30px rgba(0,0,0,0.2), inset 0 -5px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                    <img src="http://localhost:5173/image/logo-01.png" alt="Huddai Alap" style="width: 70px; height: 70px; display: block; border-radius: 50%;">
                  </div>
                  
                  <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.2); letter-spacing: 1px;">Huddai Alap</h1>
                  <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px; font-weight: 300;">Connect. Chat. Share.</p>
                </div>
              </td>
            </tr>
            
            <!-- Welcome Message -->
            <tr>
              <td style="padding: 50px 40px 30px;">
                <div style="text-align: center; margin-bottom: 35px;">
                  <h2 style="color: #667eea; font-size: 28px; margin: 0 0 15px 0; font-weight: 600;">Welcome, ${name}! 🎉</h2>
                  <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); margin: 0 auto; border-radius: 2px;"></div>
                </div>
                
                <p style="color: #555; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; text-align: center;">
                  We're absolutely thrilled to welcome you to <strong style="color: #667eea;">Huddai Alap</strong>! 
                  You're now part of a vibrant community where meaningful conversations happen every day.
                </p>
              </td>
            </tr>
            
            <!-- Features Grid -->
            <tr>
              <td style="padding: 0 40px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="48%" style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 25px; border-radius: 15px; vertical-align: top;">
                      <div style="text-align: center;">
                        <div style="font-size: 40px; margin-bottom: 12px;">👤</div>
                        <h3 style="color: #667eea; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Create Profile</h3>
                        <p style="color: #666; font-size: 13px; margin: 0; line-height: 1.5;">Personalize your account with a photo and bio</p>
                      </div>
                    </td>
                    <td width="4%"></td>
                    <td width="48%" style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 25px; border-radius: 15px; vertical-align: top;">
                      <div style="text-align: center;">
                        <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
                        <h3 style="color: #667eea; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Find Friends</h3>
                        <p style="color: #666; font-size: 13px; margin: 0; line-height: 1.5;">Connect with people you know and care about</p>
                      </div>
                    </td>
                  </tr>
                  <tr><td colspan="3" height="15"></td></tr>
                  <tr>
                    <td width="48%" style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 25px; border-radius: 15px; vertical-align: top;">
                      <div style="text-align: center;">
                        <div style="font-size: 40px; margin-bottom: 12px;">💬</div>
                        <h3 style="color: #667eea; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Start Chatting</h3>
                        <p style="color: #666; font-size: 13px; margin: 0; line-height: 1.5;">Send messages, voice notes, and more</p>
                      </div>
                    </td>
                    <td width="4%"></td>
                    <td width="48%" style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 25px; border-radius: 15px; vertical-align: top;">
                      <div style="text-align: center;">
                        <div style="font-size: 40px; margin-bottom: 12px;">📸</div>
                        <h3 style="color: #667eea; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">Share Moments</h3>
                        <p style="color: #666; font-size: 13px; margin: 0; line-height: 1.5;">Exchange photos, videos, and memories</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- CTA Button -->
            <tr>
              <td style="padding: 0 40px 50px; text-align: center;">
                <a href="${clientURL}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 18px 50px; border-radius: 50px; font-size: 16px; font-weight: 600; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); transition: all 0.3s;">
                  🚀 Launch Huddai Alap
                </a>
                <p style="color: #999; font-size: 13px; margin: 20px 0 0 0;">
                  Click the button above to get started
                </p>
              </td>
            </tr>
            
            <!-- Help Section -->
            <tr>
              <td style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 30px 40px; border-top: 1px solid #e0e0e0;">
                <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0; text-align: center;">
                  Need help getting started? Our friendly support team is here for you 24/7.
                </p>
                <p style="color: #667eea; font-size: 14px; margin: 0; text-align: center; font-weight: 600;">
                  Happy chatting! 💜
                </p>
                <p style="color: #999; font-size: 13px; margin: 15px 0 0 0; text-align: center;">
                  Best regards,<br>
                  <strong style="color: #667eea;">The Huddai Alap Team</strong>
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #2d3748; padding: 30px 40px; text-align: center;">
                <p style="color: #a0aec0; font-size: 12px; margin: 0 0 15px 0;">
                  © 2025 Huddai Alap. All rights reserved.
                </p>
                <p style="margin: 0;">
                  <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 12px;">Privacy Policy</a>
                  <span style="color: #4a5568;">•</span>
                  <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 12px;">Terms of Service</a>
                  <span style="color: #4a5568;">•</span>
                  <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 12px;">Contact Us</a>
                </p>
                <p style="color: #718096; font-size: 11px; margin: 20px 0 0 0; line-height: 1.6;">
                  You're receiving this email because you recently created an account on Huddai Alap.<br>
                  If you didn't create this account, please ignore this email.
                </p>
              </td>
            </tr>
            
          </table>
          
        </td>
      </tr>
    </table>
    
  </body>
  </html>
  `;
}