const Menus = require("../model/MenusModel");
const Session = require("../model/SessionModel");
const User = require("../model/UserModel");
const Sequelize = require("../config/db.config");

class UserRepository {
    async CreateUser(req) {
        return await Session.create(req);
    }

    async Getuser() {
        return await Session.findAll({ where: { softDelete: false } });
    }

    async GetUserById(id) {
        return await Session.findOne({ where: { userId: id, softDelete: false } });
    }

    async DeleteUser(req, id) {
        return await Session.update({softDelete:true}, {
            where: { userId: id },
            returning: true
        });
    }
    
    async UpdateUser(req, id) {
        return await Session.update(req, {
            where: { userId:id, softDelete: false },
            returning: true
        });
    }

    async JoinUser() {
        return await Session.findAll({
            include: [
                {
                    model: User,
                    where: { softDelete: false },
                    attributes: ['id', 'firstName']
                },
            ],
        });
    }
}

module.exports = new UserRepository();