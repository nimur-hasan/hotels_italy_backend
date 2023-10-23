import crypto from 'crypto';

const SECRET = 'SHOP_MANAGEMENT'

export default () => {
    return {
        random : () => crypto.randomBytes(128).toString('base64'),
        authentication : (salt: string, password: string) => {
            return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
        }
    }
}