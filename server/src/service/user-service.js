const { User: userModel } = require("../models/user-model")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const emailService = require('./mail-service')
const tokenService = require("./token-service")
const dtoUser = require("../dtos/dto-User")
const ApiError = require("../exceptions/api-error")
class UserService {

  async registration(email, password) {
    const candidate = await userModel.findOne({ where: { email: email } })
    if (candidate !== null) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
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
    const user = await userModel.findOne({ where: { activationLink } })
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации")
    }
    await userModel.update({ isActivated: true }, { where: { activationLink } })
  }

  async login(email, password) {
    const isUser = await userModel.findOne({ where: { email } })

    if (isUser === null) {
      throw ApiError.BadRequest("Такой email не был найден")
    }
    const isPassEquals = await bcrypt.compare(password, isUser.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль")
    }

    const userDto = new dtoUser(isUser)
    const tokens = tokenService.generateTokens({ ...userDto })
    tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthoriziedError()
    }

    const data = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = tokenService.findToken(refreshToken)
    if (!data || !tokenFromDB) {
      throw ApiError.UnauthoriziedError()
    }

    const user = await userModel.findByPk(data.id)
    const userDto = new dtoUser(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }


  async getAllUsers() {
    return await userModel.findAll()
  }

}

module.exports = new UserService()