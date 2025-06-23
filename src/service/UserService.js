const userRepository = require("../repository/UserRepository")
const bcrypt = require("bcrypt");
const mailService = require("./mailService");
const { InvalidRequestException, InvalidAuthentication } = require("../customError");
const excelJs = require("exceljs");
const path = require('path');
const template = require("../../userTemplate");
const mc = require("../constant/MessageConstant");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
    async createUser(req) {
        const { firstName, lastName, password } = req

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            ...req,
            fullName: firstName.concat(" ", lastName),
            password: hashedPassword
        };
        const createUser = await userRepository.createUser(userData);

        if (createUser) {
            const sendmail = { eMail: createUser.eMail, subject: mc.SUBJECT, html: template(userData) }
            await mailService.sendMail(sendmail);
        }
        return createUser
    }
    async getUser() {
        return userRepository.getUser()
    }
    async getUserById(id) {
        return userRepository.getUserById(id)
    }
    async deleteUser(req, id) {
        return userRepository.deleteUser(req, id)
    }
    async updateUser(req, id) {
        return userRepository.updateUser(req, id)
    }
    async joinArrayElementUser() {
        return userRepository.joinArrayElementUser()
    }
    async loginUser(req) {
        try {
            const { eMail, password } = req;

            if (!eMail || !password) {
                throw new InvalidRequestException("Email and Password are required", 400);
            }

            const data = await userRepository.loginUser({ eMail });

            if (!data) {
                throw new InvalidAuthentication("User Not Found", 404);
            }

            const isMatch = await bcrypt.compare(password, data.password);
            if (!isMatch) {
                throw new InvalidAuthentication("Invalid Email or Password", 401);
            }
            const SECRET_KEY = process.env.SECRET_KEY
            console.log(SECRET_KEY)
            const token = jwt.sign({ useremail: data.eMail, }, SECRET_KEY, {
                expiresIn: '1h'
            });
            const logindata = { data, token: token }
            console.log(logindata)
            return logindata;

        } catch (err) {
            throw err;
        }
    }

    async readdata(req) {
        try {
            return userRepository.readdata(req)

        } catch (err) {
            throw err;
        }
    }

    async writedata(req) {
        try {
            return userRepository.writedata(req)

        } catch (err) {
            throw err;
        }
    }

    async getxlsxdata(req) {
        try {
            return userRepository.getxlsxdata(req)

        } catch (err) {
            throw err;
        }
    }

    async downloadexcel(req) {

        const users = await userRepository.downloadexcel(req);
        console.log(users);
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("My Users");

        worksheet.columns = [
            { header: "S no.", key: "s_no" },
            { header: "Property Name", key: "Property Name" },
            { header: "Name", key: "Name" },
            { header: "Department", key: "Department" },
            { header: "Job", key: "Job" },
            { header: "Date", key: "Date" },
            { header: "Time", key: "Time" },
            { header: "Modified By", key: "Modified By" },
        ];

        // let counter = 1;
        users.forEach((user, index) => {
            // console.log(counter)]
            // worksheet.addRow({ s_no: counter++, ...user });
            worksheet.addRow({ s_no: index + 1, ...user });
            //using counter add blank row
            // if ((counter-1) % 10 === 0) {
            //     // console.log("counter")
            //     // console.log(counter)
            //     worksheet.addRow([])
            if ((index + 1) % 10 === 0) {
                worksheet.addRow([])
            }
        });
        //set formatting one row is gray and one is white
        worksheet.eachRow((row, rownumber) => {

            const fillcolor = rownumber % 2 === 0 ? 'FFFFFF' : 'D3D3D3'
            var borderstyle = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
                color: { argb: "000000" }
            }

            //set border
            worksheet.getRow(rownumber).eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: fillcolor },
                };
                cell.border = borderstyle;
            })
        })
        //set header to bold
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'A9A9A9' },
            };
            { cell.font = { bold: true }; }
        });

        //set column width to auto
        worksheet.columns.forEach((column) => {
            let maxLength = 0;
            column.eachCell((cell) => {
                var columnLength = cell.value ? cell.value.toString().length + 3 : 15;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            console.log(maxLength);
            column.width = maxLength //< 10 ? 10 : maxLength;
        });

        //add specific column to highlit to font bold
        // const date = worksheet.getColumn('Date')
        // date.eachCell((cell)=>{
        //     cell.font = { bold: true };
        // })

        const filePath = path.join(__dirname, '../files/users.xlsx');
        await workbook.xlsx.writeFile(filePath);
        return userRepository.downloadexcel(req), filePath
    }

    async sendMail(req) {
        try {
            return mailService.sendMail(req)
        } catch (err) {
            throw err;
        }
    }
};

module.exports = new UserService();