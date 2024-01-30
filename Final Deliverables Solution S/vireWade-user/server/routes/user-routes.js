const router = require('express').Router();
const User = require("../controllers/User.js");
const { pool } = require("../config/db/db.js");


router.get('/users_all', async(req, res) => {
    const result = await pool.query('SELECT * FROM users;')
    res.status(201).json(result.rows)
});

router.post('/login', async(req, res) => {
    console.log("login")

    const { email, password } = req.body;
    const result = await User.authenticate({ email: email, password: password })
    console.log('here is payload' + JSON.stringify(result.payload));
    if (result.status == 'success') {
        res.send(JSON.stringify(result));
    } else {
        res.status(500).send(JSON.stringify(result));
    }
});

router.post('/register', async(req, res) => {
    console.log("register")
    const result = await User.create(req.body)
    console.log("result is " + JSON.stringify(result))
    if (result) {
        console.log("there is a result")
        const { status, message } = result;
        if (status === 'error') {
            res.status(500);
            res.send(result);
        } else {
            res.send(result)
        }
    }
})



module.exports = router;