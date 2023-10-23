import express from 'express'

export default (res:express.Response, message:any) => {
    return res.status(401).json({
        statusCode:401,
        message
    })
}