import express from 'express'
import { get } from 'lodash'

export default (req:express.Request) => {
    const user:any = get(req, 'identity')
    if(user) return {shopId: user?.shopId?._id, userId: user?._id}
    return null;
}