const menusRepository = require("../repository/menuRepositary")
class UserService {
    async CreateUser(req) {
        return menusRepository.CreateUser(req)
    }
    async GetUser() {
        return menusRepository.Getuser()
    }
    async GetUserById(id) {
        return menusRepository.GetUserById(id)
    }
    async DeleteUser(req, id) {
        return menusRepository.DeleteUser(req, id)
    }
    async UpdateUser(req, id) {
        return menusRepository.UpdateUser(req, id)
    }
}
module.exports = new UserService();