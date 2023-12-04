import User from '../model/User.js';
import bcrypt from "bcryptjs"
// @desc Register user
// @route POST /api/v1/users/register
// @acces Private/Admin

export const registerUserCtrl = async (req, res) => {
    const { fullname, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.json({
            msg: "User already exists"
        })
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    // create the user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    })
    res.status(201).json({
        status: 'success',
        message: 'User create successfuly',
        data: user
    })
};

export const loginUserCtrl = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound && bcrypt.compare(password, await userFound?.password)) {
        res.json({
            status: "Login success",
            message:"User login successfuly",
            userFound
        })
    } else {

        res.json({
            msg: "Ivalid login"
        })
    }

}