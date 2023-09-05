const jwt = require("jsonwebtoken")
const { Token: tokenModel } = require("../models/token-model")
class TokenService {

  generateTokens(payload) {
    const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH), { expiresIn: "30m" })
    const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS), { expiresIn: "30m" })
    return {
      refreshToken,
      accessToken
    }
  }

  async saveToken(UserId, refreshToken) {
    const isToken = await tokenModel.findOne({ where: { id: UserId } })
    if (isToken !== null) {
      return await tokenModel.update({ refreshToken }, { where: { id: UserId } })
    }


    const token = await tokenModel.create({ id: UserId, refreshToken })
    console.log(token)
    return token
  }
}

module.exports = new TokenService()