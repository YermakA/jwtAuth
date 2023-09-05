module.exports = class dtoUser {
  id
  email
  isActivated

  constructor(user) {
    this.id = user.id
    this.email = user.email
    this.isActivated = user.isActivated
  }

} 