import { UserDB } from '../db/users';
import express from 'express'
import helpers from '../helpers';
import ErrorHandler from '../helpers/ErrorHandler';
import GetShopId from '../helpers/GetUserIdentity';

import GetUserIdentity from '../helpers/GetUserIdentity';
import { registerValidation } from '../validation/auth/register.validation';
import ValidationError from '../helpers/ValidationError';
import { EmailService } from '../email/email';

export const authenticationController = () => {
    return {
        register: async(req: express.Request, res: express.Response) => {
            try {
                const { email, password, fname, lname } = req.body;
                const isValidate = await registerValidation(req.body)

                if(isValidate.error) return ValidationError(res, isValidate.error.details[0].message)

                const existingUser = await UserDB().getUserByEmail(email);

                if(existingUser) {
                    return ErrorHandler(res, 403, 'User already exists');
                }

                const salt = helpers().random()
                const newUser = {
                    info: {
                        email,
                        fname,
                        lname
                    },
                    authentication: {
                        salt,
                        password: helpers().authentication(salt, password)
                    }
                }

                console.log(newUser)
                const user = await UserDB().createUser(newUser)

                return res.status(201).json({
                    fname: user.info.fname,
                    lname: user.info.lname,
                    email: user.info.email, 
                    isVarified: user.authentication.isVerified                   
                })
            } catch (error) {
                console.log(error)
                return ErrorHandler(res, 501, error)
            }
        },

        // 🥕 Email Verification
        sendEmailVerification: async(req: express.Request, res: express.Response) => {
            
            try {
                const { email } = req.body;

                console.log(req.body)

                // Find user by email
                const user:any = await UserDB().getUserByEmail(email)

                if(!user) return ErrorHandler(res, 403, 'User not exist')            

                const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000

                user.authentication.otp = otp;

                const result = await EmailService().sendEmail({to: email, subject: 'Verification', html: `
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Your Brand Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>California</p>
                    </div>
                </div>
                </div>
                
                ` })

                if(result.error){
                    ValidationError(res, result.error)
                }else{
                    await UserDB().updateUserById(user._id.toString(), user)
                    res.status(200).json(result)
                }
            } catch (error) {
                ValidationError(res, "Something went wrong")
            }

            

            
           
        },
        // 🥕 Email Verification
        verifyEmail: async(req: express.Request, res: express.Response) => {
            
            try {
                const { email, otp } = req.body;

                console.log(req.body)

                // Find user by email
                const user:any = await UserDB().getUserByEmail(email)

                if(!user) return ErrorHandler(res, 403, 'User not exist')            

                if(user.authentication.otp === otp){
                    user.authentication.isVerified = true
                    await UserDB().updateUserById(user._id.toString(), user)
                    res.status(201).json({message: "Email verification successful"})
                }else{
                    ValidationError(res, "OTP incorrect")
                }

         

                
            } catch (error) {
                ValidationError(res, "Something went wrong")
            }

        },

        // 🥕 Login
        login: async(req: express.Request, res: express.Response) => {
            const shop_id = GetShopId(req)
            const { email, password } = req.body;

            console.log(req.body)

            // Find user by email
            const user:any = await UserDB().getUserByEmail(email).select('+authentication.salt +authentication.password')

            if(!user) return ErrorHandler(res, 403, 'User not exist')            

            const expectedHash = helpers().authentication(user?.authentication?.salt, password)
            if(expectedHash != user.authentication.password) return ErrorHandler(res, 401, 'Wrong password')

            const salt = helpers().random()

            const newSessionToken = helpers().authentication(salt, user._id.toString())
            user.authentication.sessionToken = newSessionToken;

            await UserDB().updateUserById(user._id.toString(), user)

            res.cookie('sessionToken', newSessionToken, {
                sameSite: 'none',
                secure: true
            })
            res.status(200).json({
                statuCode: 200,
                info: user.info,
                _id: user._id,
                authentication: {
                    isVerified: user.authentication.isVerified,
                },
                sessionToken: newSessionToken
            })
        },

        logout: async(req:express.Request, res:express.Response) => {
            try {
                if(req.params.id){
                    await UserDB().updateUserById(req.params.id, {'info.lastActive': new Date()})
                    return res.status(200).json({success: true})
                }else{
                    return res.status(200).json({success: true})
                }
            } catch (error) {
                console.log(error)
                res.status(501).json(error)
            }
        },

         // 🥕 Deactive account
        deactiveAccount: async(req:express.Request, res: express.Response) => {
            
        }
    }
}