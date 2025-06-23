const sessionService = require("../service/sessionService");
const mc = require("../constant/MessageConstant");
const handler = require("../response/ResponseHandler");
const methods = {}

//CREATE USER
methods.CreateUser = async function (req, res) {
    try {
        var userData = await sessionService.CreateUser(req.body);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, 'User Not Create', null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, 'User Create Successfully..', userData);
        }
    }
    catch (error) {
        console.log("Error in createUser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, 'Internal server error', error.message);
    }
};

//GET USER
methods.GetUser = async function (req, res) {
    try {
        var userData = await sessionService.GetUser();
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, 'User Is Not Get', null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, 'User Get Successfully..', userData);
        }
    }
    catch (error) {
        console.log("Error in GetUser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, 'Internal server error', error.message);
    }
};

//GET USER BY ID
methods.GetUserById = async function (req, res) {
    try {
        console.log("Get User By Id")
        console.log(req.params.id);
        var userData = await sessionService.GetUserById(req.params.id);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, 'User Is Not Get', null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, 'User Get Successfully..', userData);
        }
    }
    catch (error) {
        console.log("Error in GetUserById: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, 'Internal server error', error.message);
    }
};

//DELETE USER
methods.DeleteUser = async function (req, res) {
    try {
        console.log("Delete User")
        console.log(req.params.id, req.body);
        var userData = await sessionService.DeleteUser(req.body, req.params.id);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, 'User Is Not Delete', null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, 'User Delete Successfully..', userData);
        }
    }
    catch (error) {
        console.log("Error in Deleteuser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, 'Internal server error', error.message);
    }
};

//UPDATE USER
methods.UpdateUser = async function (req, res) {
    try {
        console.log("Delete User")
        console.log(req.params.id, req.body);
        var userData = await sessionService.UpdateUser(req.body, req.params.id);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, 'User Is Not Delete', null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, 'User Delete Successfully..', userData);
        }
    }
    catch (error) {
        console.log("Error in Deleteuser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, 'Internal server error', error.message);
    }
};

//Join User
methods.JoinUser = async function (req, res) {
    console.log("join");
    try {
        var userData = await sessionService.JoinUser();
        console.log(userData);
        if (!userData) {
            return handler(res, mc.ERROR_MSG, mc.ERROR_CODE, 'User Is Not Join', null);
        }
        else {
            return handler(res, mc.SUCCESS_MSG, mc.SUCCESS_CODE, 'User Join Successfully..', userData);
        }
    }
    catch (error) {
        console.log("Error in JoinUser: ", error)
        return handler(res, mc.PAGE_NOT_FOUND_ERROR_MSG, mc.PAGE_NOT_FOUND_ERROR_CODE, 'Internal server error', error.message);
    }
};

module.exports = methods;