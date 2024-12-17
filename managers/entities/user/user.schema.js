module.exports = {
    createUser: [
        { model: 'username', label: 'Username', path: 'username', required: true },
        { model: 'email', label: 'Email', path: 'email', required: true, type: 'string', regex: /^\S+@\S+\.\S+$/ },
        { model: 'password', label: 'Password', path: 'password', required: true, type: 'string', length: { min: 8, max: 100 } },
    ],
}