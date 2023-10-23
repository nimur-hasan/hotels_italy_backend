import express from 'express'
import nodemailer from 'nodemailer';
import { EmailService } from '../email/email';
import ValidationError from '../helpers/ValidationError';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service you prefer
    auth: {
      user: 'najmabegumm23@gmail.com',
      pass: 'hgsestrpmhmvlqfy',
    },
  });

export const emailController = () => {
    return {
        sendEmail: async(req: express.Request, res: express.Response) => {
            
              
            const { to, subject, text } = {
                to: "developernaim20@gmail.com",
                subject: "developernaim",
                text: "How are you!"
            };

            const mailOptions = {
            from: 'najmabegumm23@gmail.com',
            to,
            subject,
            text,
            };
        
            try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
            } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
            }
        },

        // 🥕 send b2c email

        B2CMail: async(req: express.Request, res: express.Response) => {
            try {
                const {
                    contact_mail, 
                    contact_phone,
                    from_date,
                    to_date,
                    type_of_message,
                    type_of_rooms,
                    number_of_rooms,
                    serviceReq,
                    message
                 } = req.body
    
                 const html = `
                    <div>
                        <table>
                            <thead>
                                <h4>Client's requirements.</h4>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Type Of Message: </td>
                                    <td><b>${type_of_message}</b></td>
                                </tr>
                                <tr>
                                    <td>Type Of Rooms: </td>
                                    <td><b>${type_of_rooms}</b></td>
                                </tr>
                                <tr>
                                    <td>Number Of Rooms: </td>
                                    <td><b>${number_of_rooms}</b></td>
                                </tr>
                                <tr>
                                    <td>Service Required: </td>
                                    <td><b>${serviceReq}</b></td>
                                </tr>
                                <tr>
                                    <td>From ( Date ): </td>
                                    <td><b>${from_date}</b></td>
                                </tr>
                                <tr>
                                    <td>To ( Date ): </td>
                                    <td><b>${to_date}</b></td>
                                </tr>
                                <tr>
                                    <td>Contact Mail: </td>
                                    <td><b>${contact_mail}</b></td>
                                </tr>
                                <tr>
                                    <td>Contact Phone: </td>
                                    <td><b>${contact_phone}</b></td>
                                </tr>
                                <tr>
                                    <td>Message: </td>
                                    <td><b>${message}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 `
    
                 const result = await EmailService().sendEmail({
                    to: 'lelelondra7@gmail.com, emaxlondon11@gmail.com, emaxlondon10@gmail.com, developernaim20@gmail.com, mdnimurhasann@gmail.com',
                    subject: 'B2C Mails',
                    html
                 })

                 console.log(result)
                 res.status(200).json(result)
            } catch (error) {
                ValidationError(res, error)
            }
        } 
       
    }
}