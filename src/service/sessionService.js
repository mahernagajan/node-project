const sessionRepository = require("../repository/sessionRepositary")
class UserService {
    async CreateUser(req) {
        return sessionRepository.CreateUser(req)
    }
    async GetUser() {
        return sessionRepository.Getuser()
    }
    async GetUserById(id) {
        return sessionRepository.GetUserById(id)
    }
    async DeleteUser(req, id) {
        return sessionRepository.DeleteUser(req, id)
    }
    async UpdateUser(req, id) {
        return sessionRepository.UpdateUser(req, id)
    }
    async JoinUser() {
        return sessionRepository.JoinUser()
    }
}
module.exports = new UserService();