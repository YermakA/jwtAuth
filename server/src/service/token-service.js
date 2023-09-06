const jwt = require("jsonwebtoken")
const { Token: tokenModel } = require("../models/token-model")
const { where } = require("sequelize")
class TokenService {

  generateTokens(payload) {
    const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH), { expiresIn: "30m" })
    const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS), { expiresIn: "30s" })
    return {
      refreshToken,
      accessToken
    }
  }

  validateAccessToken(accessToken) {
    try {
      const data = jwt.verify(accessToken, process.env.JWT_ACCESS)
      return data
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const data = jwt.verify(refreshToken, process.env.JWT_REFRESH)
      return data
    } catch (error) {
      return null
    }
  }
  async saveToken(UserId, refreshToken) {
    const isToken = await tokenModel.findOne({ where: { id: UserId } })
    if (isToken !== null) {
      return await tokenModel.update({ refreshToken }, { where: { id: UserId } })
    }


    const token = await tokenModel.create({ id: UserId, refreshToken })
    return token
  }

  async removeToken(refreshToken) {

    return await tokenModel.destroy({
      where: {
        refreshToken
      }
    })
  }

  async findToken(refreshToken) {
    const token = await tokenModel.findOne({ where: { refreshToken } })
    return token
  }

}

module.exports = new TokenService()