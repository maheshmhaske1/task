const bcrypt = require('bcrypt')

require('dotenv').config()

const employee = require('../../model/users/employee.model')
const jwtHelper = require('../../helpers/authentication.helper')


// -------------------- employee registration -------------------- //
exports.register = async (req, res) => {
    const { name, gender, city, password, mobile, age, username } = req.body

    const userexist = await employee.find({
        $or:
            [
                { mobile: mobile },
                { username: username }
            ]
    })

    if (userexist.length != 0) {
        return res.json({
            status: false,
            message: `employee already exist please login`,
        })
    }

    if (!mobile || !password) {
        return res.json({
            status: false,
            message: `mobile and password are compulsory`,
        })
    }


    let hashed_password = await bcrypt.hash(password, 10);

    await new employee({
        name: name,
        gender: gender,
        city: city,
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
                    message: `employee registered`,
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

// -------------------- employee login -------------------- //
exports.login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.json({
            status: false,
            message: `username and password is required fields`,
        })
    }

    let userexist = await employee.find({
        $or: [
            { mobile: username },
            { username: username },
        ]
    })
    if (userexist.length == 0) {
        return res.json({
            status: false,
            message: `user not registered`,
        })
    }

    userexist = userexist[0]
    if (bcrypt.compareSync(password, userexist.password)) {
        const token = await jwtHelper.generate_token_user(userexist._id, username)

        await employee.findByIdAndUpdate({ _id: userexist._id },
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

// // -------------------- get-user-list -------------------- //
// exports.get_all_user = async (req, res) => {

//     await user.find({ is_deleted: false },
//         {
//             password: 0,
//             token: 0
//         })
//         .exec()
//         .then((users) => {
//             if (user) {
//                 return res.json({
//                     status: true,
//                     message: "user list",
//                     data: users
//                 })
//             }

//         })
//         .catch((error) => {
//             return res.json({
//                 status: false,
//                 message: "something went wrong"
//             })
//         })
// }

// // -------------------- get-user-details -------------------- //
// exports.get_user = async (req, res) => {

//     const { user_id } = req.params

//     await user.findById({ _id: user_id, is_deleted: false },
//         {
//             password: 0,
//             token: 0
//         },)
//         .exec()
//         .then((users) => {
//             if (user) {
//                 return res.json({
//                     status: true,
//                     message: "user details",
//                     data: users
//                 })
//             }

//         })
//         .catch((error) => {
//             return res.json({
//                 status: false,
//                 message: "something went wrong"
//             })
//         })
// }

