const bcrypt = require('bcrypt')

require('dotenv').config()

const mentors = require('../../model/users/mentor.model')
const jwtHelper = require('../../helpers/authentication.helper')


// -------------------- mentor registration -------------------- //
exports.register = async (req, res) => {
    const { name, password, mobile, age, username } = req.body

    const userexist = await mentors.find({
        $or:
            [
                { mobile: mobile },
                { username: username }
            ]
    })

    if (userexist.length != 0) {
        return res.json({
            status: false,
            message: `mentor already exist please login`,
        })
    }

    if (!mobile || !password) {
        return res.json({
            status: false,
            message: `mobile and password are compulsory`,
        })
    }


    let hashed_password = await bcrypt.hash(password, 10);

    await new mentors({
        name: name,
        password: password,
        mobile: mobile,
        age: age,
        username: username,
        password: hashed_password
    }).save()
        .then(async (success) => {
            if (success) {
                const token = await jwtHelper.generate_token_user(success._id, username)
                await employee.findByIdAndUpdate({ _id: success._id },
                    {
                        $set: { token: token }
                    },
                    { returnOriginal: false })
                return res.json({
                    status: true,
                    message: `mentor registered`,
                    user: success,
                    token: token
                })
            }
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `something went wrong`, error,
            })
        })
}

// -------------------- mentor login -------------------- //
exports.login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.json({
            status: false,
            message: `username and password is required fields`,
        })
    }

    let userexist = await mentors.find({
        $or: [
            { mobile: username },
            { username: username },
        ]
    })
    if (userexist.length == 0) {
        return res.json({
            status: false,
            message: `mentor not registered`,
        })
    }

    userexist = userexist[0]
    if (bcrypt.compareSync(password, userexist.password)) {
        const token = await jwtHelper.generate_token_user(userexist._id, username)

        await mentors.findByIdAndUpdate({ _id: userexist._id },
            {
                $set: { token: token }
            })

        userexist.token = token
        return res.json({
            status: true,
            message: `logged in`,
            data: {
                user_id: userexist
            }
        })
    }

    else {
        return res.json({
            status: false,
            message: `incorrect password`,
        })
    }
}

