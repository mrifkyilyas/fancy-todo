const jwt = require('jsonwebtoken')

module.exports = {
    jwtSign: (data) => {
        return jwt.sign(data, process.env.JWT_SECRET)
    },
    jwtVerify: (token) => {
        try {
            return jwt.verify(token,  process.env.JWT_SECRET)
        }
        catch (error) {
            return null
        }
    }
}

