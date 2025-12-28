import { resendClient, sender } from '../lib/resend.js';
import { createWelcomeEmailTemplate } from './emailTemplate.js';

export const sendWelcomeEmail = async (email, name, clientURL) => {

    const {data, error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to Huddai alap!",
        html:createWelcomeEmailTemplate(name, clientURL)
    });

    if(error)
    {
        console.log("Error to sending Welcome Email:", error);
        throw new Error("failed to send welcome email");
    }

    console.log("Welcome Email sent successfully:", data); 
    return data;
};

// import { resendClient, sender } from '../lib/resend.js';
// import { createWelcomeEmailTemplate } from './emailTemplate.js';

// export const sendWelcomeEmail = async (email, name, clientURL) => {

//     const sendTo = process.env.NODE_ENV === "development" 
//         ? "mdneloy256@gmail.com"  // Your verified Resend email
//         : email;
        
//     const {data, error} = await resendClient.emails.send({
//         from: `${sender.name} <${sender.email}>`,
//         to: sendTo,  // ✅ Changed from 'email' to 'sendTo'
//         subject: "Welcome to Huddai Alap!",
//         html: createWelcomeEmailTemplate(name, clientURL)
//     });

//     if(error) {
//         console.log("Error sending Welcome Email:", error);
//         throw new Error("Failed to send welcome email");
//     }

//     console.log(`Welcome Email sent successfully to ${sendTo}:`, data); 
//     return data;
// };