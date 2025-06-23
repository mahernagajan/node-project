const Menus = require("../model/MenusModel");
const User = require("../model/UserModel");
const Sequelize = require("../config/db.config");
const fs = require("fs");
const xlsx = require("xlsx");

class UserRepository {
    async createUser(req) {
        return await User.create(req);
    }

    async getUser() {
        return await User.findAll({ where: { softDelete: false } });
    }

    async getUserById(id) {
        return await User.findOne({ where: { id, softDelete: false } });
    }

    async deleteUser(req, id) {
        return await User.update({ softDelete: true }, {
            where: { id: id },
            returning: true
        });
    }

    async updateUser(req, id) {
        return await User.update(req, {
            where: { id, softDelete: false },
            returning: true
        });
    }

    async joinArrayElementUser() {
        return await User.findAll({
            where: { softDelete: false },
            include: [{
                model: Menus,
                as: 'menus',
                attributes: ['MId', 'MName'],
                required: false,
                on: Sequelize.literal(`"menus"."MId" =ANY("users"."menuIds")`),
                where: { softDelete: false },
            }]
        });
    }

    async loginUser(req) {
        const where = { softDelete: false }
        const { eMail } = req || {}
        if (eMail) where.eMail = eMail
        return await User.findOne({ where });

    }
    async readdata(req) {
        return fs.readFileSync(req.fileName, 'utf8')

    }
    async writedata(req) {
        return fs.writeFileSync(req.fileName, req.text)

    }
    async getxlsxdata(req) {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        console.log(workbook)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        console.log(jsonData);
        return jsonData;
    }

    async downloadexcel(req) {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        console.log(jsonData);
        return jsonData;
    }
}
module.exports = new UserRepository();