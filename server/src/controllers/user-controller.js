const userService = require('../service/user-service')

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await userService.registration(email, password)
      res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
      res.json(data)
    } catch (e) {
      console.log(e)
    }
  }
  async login(req, res, next) {
    try {

    } catch (e) {

    }
  }
  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }
  async activate(req, res, next) {
    try {
      const link = req.params.link
      userService.activate(link)
      res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      console.log(e)
    }
  }
  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }
  async getUsers(req, res, next) {
    try {
      res.json(['123', '412s'])
    } catch (e) {

    }
  }
}


module.exports = new UserController()