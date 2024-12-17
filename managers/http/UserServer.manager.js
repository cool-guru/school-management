const http              = require('http');
const express           = require('express');
const cors              = require('cors');
const app               = express();

const adminRoutes = require('../../routes/adminRoutes');
const userRoutes = require('../../routes/userRoutes');
const classroomRoutes = require('../../routes/classroomRoutes');
const studentRoutes = require('../../routes/studentRoutes');

module.exports = class UserServer {
    constructor({config, managers}){
        this.config        = config;
        this.userApi       = managers.userApi;
        this.managers      = managers;
    }
    
    /** for injecting middlewares */
    use(args){
        app.use(args);
    }

    /** server configs */
    run(){
        const commonMiddleware = (app) => {
            app.use(cors({ origin: '*' }));
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.use('/static', express.static('public'));
        };

        const adminApp = express();
        commonMiddleware(adminApp);

        adminApp.use('/api', adminRoutes(this.managers));

        /** an error handler */
        adminApp.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(500).send('Something broke!')
        });
        
        /** a single middleware to handle all */
        adminApp.all('/api/:moduleName/:fnName', this.userApi.mw);

        const adminServer = http.createServer(adminApp);
        const ADMIN_PORT = this.config.dotEnv.ADMIN_PORT || 5222;

        adminServer.listen(ADMIN_PORT, () => {
            console.log(`Admin Server is running on port: ${ADMIN_PORT}`);
        });

        const userApp = express();
        commonMiddleware(userApp);

        userApp.use('/api', userRoutes(this.managers));
        userApp.use('/api', classroomRoutes(this.managers));
        userApp.use('/api', studentRoutes(this.managers));
        
        /** an error handler */
        userApp.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(500).send('Something broke!')
        });
        
        /** a single middleware to handle all */
        userApp.all('/api/:moduleName/:fnName', this.userApi.mw);

        const userServer = http.createServer(userApp);
        const USER_PORT = this.config.dotEnv.USER_PORT || 5111;

        userServer.listen(USER_PORT, () => {
            console.log(`User Server is running on port: ${USER_PORT}`);
        });
    }
}