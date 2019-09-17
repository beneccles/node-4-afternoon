const users = require("../models/users")
let id = 1

module.exports = {
    login: (req, res) => {
        const { session } = req;
        const { username, password } = req.body;

        // Check to see if the user already exists within our users.js file
        // Compare the entered user and password against whats already in the system.
        // If the comparsion fails, user will be empty, causing to be defined as falsy.
        const user = users.find(user => user.username === username && user.password === password);

        // If user is truthy, assign the user to the session. Otherwise, let the user know they are unauthorized.
        if (user) {
            session.user.username = user.username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Unauthorized.')
        }

    },
    register: (req, res) => {
        const { session } = req;
        const { username, password } = req.body;

        // Push the new user onto the array stored in users.js
        users.push({ id, username, password });
        id++;

        // Assign the username to the session object
        session.user.username = username;

        // Return the call with the session info created.
        res.status(200).send(session.user)
    },
    signout: (req, res) => {
        // Destroy the info after the session is done, so that it cannot be used by an unauthorized party.
        req.session.destroy();
        res.status(200).send(req.session);
    },
    getUser: (req, res) => {
        // Return the current session user.
        const { session } = req;
        res.status(200).send(session.user)
    }
}