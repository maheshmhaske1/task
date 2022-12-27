const jwt = require('jsonwebtoken');
require('dotenv').config()

const { TOKEN_SECRET } = process.env


// ------------- generate jwt token for patient ------------- //
exports.generate_token_user = async (_id, username) => {

    const token = await jwt.sign(
        { user_id: _id, username },
        TOKEN_SECRET,
        {
            expiresIn: "365d",
        }
    );
    return token
}

// ------------- authenticate jwt token for patient ------------- //
exports.authenticate_user = (req, res, next) => {
    let token = req.headers.authorization

    if (token)
        token = token.split(" ")[1]
    else if (token == undefined || token == null)
        token = req.body.token
            || req.query.token
            || req.headers["x-access-token"]
    else
        return res.json({
            Message_code: 999,
            Message_text: "please provide jwt token"
        })



    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

