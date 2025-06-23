const userService = require("../service/UserService");
const mc = require("../constant/MessageConstant");
const handler = require("../response/ResponseHandler");
const mailService = require("../service/mailService");

const methods = {}

//CREATE USER
methods.createUser = async function (req, res) {
    try {
        const userData = await userService.createUser(req.body);

        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, mc.USER_NOT_CREATED, null);
        }
        return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_CREATED_SUCCESSFULLY, userData);
    } catch (error) {
        console.log("Error in createUser: ", error);
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, mc.INTERNAL_SERVER_ERROR, error.message);
    }
};


//GET USER
methods.getUser = async function (req, res) {
    try {
        var userData = await userService.getUser();
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, mc.USER_IS_NOT_GET, null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_GET_SUCCESSFULLY, userData);
        }
    }
    catch (error) {
        console.log("Error in GetUser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, mc.INTERNAL_SERVER_ERROR, error.message);
    }
};

//GET USER BY ID
methods.getUserById = async function (req, res) {
    try {
        console.log("Get User By Id")
        console.log(req.params.id);
        var userData = await userService.getUserById(req.params.id);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, mc.USER_IS_NOT_GET_BY_ID, null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_GET_BY_ID_SUCCESSFULLY, userData);
        }
    }
    catch (error) {
        console.log("Error in GetUserById: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, mc.INTERNAL_SERVER_ERROR, error.message);
    }
};

//DELETE USER
methods.deleteUser = async function (req, res) {
    try {
        console.log("Delete User")
        console.log(req.params.id, req.body);
        var userData = await userService.deleteUser(req.body, req.params.id);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, mc.USER_IS_NOT_DELETE, null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_DELETE_SUCCESSFULLY, userData);
        }
    }
    catch (error) {
        console.log("Error in Deleteuser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, mc.INTERNAL_SERVER_ERROR, error.message);
    }
};

//UPDATE USER
methods.updateUser = async function (req, res) {
    try {
        console.log("Delete User")
        console.log(req.params.id, req.body);
        var userData = await userService.updateUser(req.body, req.params.id);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, mc.USER_IS_NOT_UPDATE, null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_UPDATE_SUCCESSFULLY, userData);
        }
    }
    catch (error) {
        console.log("Error in Deleteuser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, mc.INTERNAL_SERVER_ERROR, error.message);
    }
};

//Join Array Element User
methods.joinArrayElementUser = async function (req, res) {
    console.log("join");
    try {
        var userData = await userService.joinArrayElementUser();
        console.log(userData);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, mc.USER_IS_NOT_JOIN_ARRAY_ELEMENT, null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_JOIN_ARRAY_ELEMENT_SUCCESSFULLY, userData);
        }
    }
    catch (error) {
        console.log("Error in JoinArrayElementUser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, mc.INTERNAL_SERVER_ERROR, error.message);
    }
};

methods.loginUser = async function (req, res, next) {
    try {
        const userData = await userService.loginUser(req.body);

        return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_LOGIN_SUCCESSFULLY, userData);
    } catch (error) {
        console.log("Error in loginUser: ", error);
        next(error); // Will be caught by `generalerror`
    }
};

methods.readdata = async function (req, res, next) {
    try {
        const userData = await userService.readdata(req.body);

        return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_READ_DATA_SUCCESSFULLY, userData);
    } catch (error) {
        console.log("Error in reading the data: ", error);
        next(error);
    }
};

methods.writedata = async function (req, res, next) {
    try {
        const { text } = req.body
        await userService.writedata(req.body);

        return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_WRITE_DATA_SUCCESSFULLY, text);
    } catch (error) {
        console.log("Error in write the data: ", error);
        next(error);
    }
};

methods.getxlsxdata = async function (req, res, next) {
    try {

        console.log(req.file);
        const userData = await userService.getxlsxdata(req);

        return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_READ_XLSXDATA_SUCCESSFULLY, userData);
    } catch (error) {
        console.log("Error in reading the data: ", error);
        next(error);
    }
};

methods.downloadexcel = async function (req, res, next) {
    try {

        console.log(req.file);
        const userData = await userService.downloadexcel(req);
        // const filePath = await userService.downloadexcel();
        res.download(userData, 'users.xlsx');


        // return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, 'Dowload File Successfully', userData);
    } catch (error) {
        console.log("Error in writing the data: ", error);
        next(error);
    }
};

methods.sendMail = async function (req, res, next) {
    try {
        const userData = await userService.sendMail(req.body);
        return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, mc.USER_SEND_MAIL_SUCCESSFULLY, userData);
    } catch (error) {
        console.log("Error in writing the data: ", error);
        next(error);
    }
};
module.exports = methods;