const Menus = require("../model/MenusModel");
const Session = require("../model/SessionModel");
const User = require("../model/UserModel");
const Sequelize = require("../config/db.config");

class UserRepository {
    async CreateUser(req) {
        return await Menus.create(req);
    }

    async Getuser() {
        return await Menus.findAll({ where: { softDelete: false } });
    }

    async GetUserById(id) {
        return await Menus.findOne({ where: { MId: id, softDelete: false } });
    }

    async DeleteUser(req, id) {
        return await Menus.update({ softDelete: true }, {
            where: { MId: id },
            returning: true
        });
    }

    async UpdateUser(req, id) {
        return await Menus.update(req, {
            where: { MId: id, softDelete: false },
            returning: true
        });
    }

}

module.exports = new UserRepository();