import { UserDB } from '../db/users';
import express from 'express';
import ErrorHandler from '../helpers/ErrorHandler';
import { get } from 'lodash'
import GetUserIdentity from '../helpers/GetUserIdentity';

export const userController = () => {
    return {
        getAllUsers: async(req:express.Request, res:express.Response) => {
            try {
                const { username, limit, skip,  } = req.query
            
                const searchQuery = []
                if(username){ searchQuery.push({"info.name":{$regex:`^${username}`, $options: 'i'}}) }
                
                let queryType='AND' // 👈 will coming from params

                let query = {}

                // ❤️‍🔥 initial validations
                const {userId, shopId} = GetUserIdentity(req)
                console.log(userId, shopId)
                if(username){
                    if(queryType == 'OR'){
                        query = {
                            shopId,
                            $or: searchQuery
                        }
                    }else{
                        query = {
                            shopId,
                            $and: searchQuery
                        }
                    }
                }else {
                    query = {shopId}
                }

                try {
                    const medicines = await UserDB().getAllUsers(query, parseInt(limit.toString()), parseInt(skip.toString()), true)
                    return res.status(200).json(medicines)
                } catch (error) {
                    console.log(error)
                    ErrorHandler(res, 501, error)
                }
            } catch (error) {
                return ErrorHandler(res, 500, error)
            }
        },
        getUserBySession: async(req:express.Request, res:express.Response) => {
            try {              
                const currentUser:any = get(req, 'identity')  
                res.status(200).json(currentUser);
            } catch (error) {
                return ErrorHandler(res, 500, error)
            }
        },
        getUserById: async(req:express.Request, res:express.Response) => {
            try {
                const user = await UserDB().getUserById(req.params.id);
                res.status(200).json(user);
            } catch (error) {
                return ErrorHandler(res, 500, error)
            }
        },
        activeUser: async(req:express.Request, res:express.Response) => {
            try {
                const user = await UserDB().activeUser(req.params.id)
                return res.status(201).json(user)
            } catch (error) {
                return ErrorHandler(res, 500, error)
            }
        },
        deActiveUser: async(req:express.Request, res:express.Response) => {
            try {
                const user = await UserDB().deactiveUser(req.params.id)
                return res.status(201).json(user)
            } catch (error) {
                return ErrorHandler(res, 500, error)
            }
        },
        updateProfile: async(req:express.Request, res:express.Response) => {
            try {
                const currentUser:any = get(req, 'identity')
                console.log(currentUser)
                if(currentUser){                    
                    const updatedProfile = await UserDB().updateUserById(currentUser._id, {info: {...currentUser.info, ...req.body}})
                    res.status(200).json(updatedProfile)
                }
            } catch (error) {
                return ErrorHandler(res, 500, error)
            }
        },
        deleteUserById: async(req:express.Request, res:express.Response) => {
            try {
                await UserDB().deleteUserById(req.params.id)
                return res.status(200).json({
                    statusCode: 200,
                    result: 'success',
                })
            } catch (error) {
                return ErrorHandler(res, 500, error)
            }
        }
    }
}