const express = require("express");
const app = express();
const PORT = 3300;
const bodyParser = require("body-parser");
const swaggerui = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const userRoute = require('./src/routes/UserRoutes');
const sessionsRoute=require('./src/routes/sessionRoutes');
const menusRoutes=require('./src/routes/menusRoutes');
const errorhandler=require("./src/errorhandler");

app.use(bodyParser.json());
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
app.use("/users", userRoute);
app.use("/sessions",sessionsRoute);
app.use("/menus",menusRoutes);
app.use(errorhandler);
app.listen(PORT, function () {
    console.log(`Started application on port ${PORT}`)
});
module.exports=app;