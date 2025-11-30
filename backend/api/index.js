const app = require('../app');

module.exports = (req, res) => {
    res.status(200).json({ message: "Hello from API!" });
    return app(req, res);
};
