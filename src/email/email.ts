import express from 'express'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service you prefer
    auth: {
      user: 'najmabegumm23@gmail.com',
      pass: 'hgsestrpmhmvlqfy',
    },
  });

export const EmailService = () => {
    return {
        sendEmail: async(data:any) => {
            
              
            const { to, subject, html } = data;

            const mailOptions = {
            from: 'najmabegumm23@gmail.com',
            to,
            subject,
            html
            };
        
            try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return { message: 'Email sent successfully' };
            } catch (error) {
            console.error('Error sending email:', error);
            return{ error: 'Failed to send email' };
            }
        },

        // 🥕 send email verification
       
    }
}