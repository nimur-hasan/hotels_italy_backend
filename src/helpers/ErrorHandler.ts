import express from 'express'

export default (res:express.Response, statusCode:number, message:string) => {
    return res.status(statusCode).json({
        statusCode,
        message
    })
}