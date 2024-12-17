const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class User { 

    constructor({utils, cache, config, cortex, managers, validators, mongomodels }={}){
        this.config              = config;
        this.cortex              = cortex;
        this.validators          = validators; 
        this.mongomodels         = mongomodels;
        this.tokenManager        = managers.token;
        this.usersCollection     = "users";
        this.userExposed         = ['createUser', 'loginUser'];
    }

    // async createUser({username, email, password}){
    //     const user = {username, email, password};

    //     // Data validation
    //     let result = await this.validators.user.createUser(user);
    //     if(result) return result;
        
    //     // Creation Logic
    //     let createdUser     = {username, email, password}
    //     let longToken       = this.tokenManager.genLongToken({userId: createdUser._id, userKey: createdUser.key });
        
    //     // Response
    //     return {
    //         user: createdUser, 
    //         longToken 
    //     };
    // }

    async createUser({ username, email, password }) {
        const user = { username, email, password };

        let result = await this.validators.user.createUser(user);
        if(result) return result;

        const hashedPassword = await bcrypt.hash(password, 10);

        const UserModel = this.mongomodels.User;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            this.config.dotEnv.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            user: { id: newUser._id, username: newUser.username, email: newUser.email, label: newUser.label, role: newUser.role },
            token,
        };
    }

    async loginUser({ email, password }) {
        const UserModel = this.mongomodels.User;

        const user = await UserModel.findOne({ email });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        console.log('user', user);
        console.log('this.config', this.config);
        const token = jwt.sign(
            { id: user._id, role: user.role },
            this.config.dotEnv.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            user: { id: user._id, username: user.username, role: user.role },
            token,
        };
    }

}
