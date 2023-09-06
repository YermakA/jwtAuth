const ApiError = require("../exceptions/api-error")
const tokenService = require("../service/token-service")
module.exports = authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnauthoriziedError())
    }

    const accessToken = authorizationHeader.split(" ")[1]
    if (!accessToken) {
      return next(ApiError.UnauthoriziedError())
    }

    const data = tokenService.validateAccessToken(accessToken)
    if (!data) {
      return next(ApiError.UnauthoriziedError())
    }

    req.user = data
    next()
  } catch (error) {
    return next(ApiError.UnauthoriziedError())
  }
}