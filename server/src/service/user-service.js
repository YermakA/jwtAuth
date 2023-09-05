const { User: userModel } = require("../models/user-model")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const emailService = require('./mail-service')
const tokenService = require("./token-service")
const dtoUser = require("../dtos/dto-User")
class UserService {

  async registration(email, password) {
    const candidate = await userModel.findOne({ where: { email: email } })
    if (candidate !== null) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink
    }).then(data => data)
      .catch(e => { console.log(e) })
    await emailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
    const userDto = new dtoUser(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async activate(activationLink) {
    await userModel.update({ isActivated: true }, { where: { activationLink } })
  }
}

module.exports = new UserService()