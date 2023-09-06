const ApiError = require("../exceptions/api-error")
const userService = require('../service/user-service')
const validator = require("express-validator")
class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      const errors = validator.validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Не удалось произвести валидацию: ", errors))
      }
      const data = await userService.registration(email, password)
      res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
      res.json(data)
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await userService.login(email, password)
      res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
      res.json(data)
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie("refreshToken")
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const link = req.params.link
      userService.activate(link)
      res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const data = await userService.refresh(refreshToken)
      res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
      res.json(data)
    } catch (e) {
      next(e)
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      res.json(users)
    } catch (e) {
      next(e)
    }
  }
}


module.exports = new UserController()