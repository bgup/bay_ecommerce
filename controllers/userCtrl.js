import User from '../model/User.js';

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
    const user = await User.create({
        fullname, email, password
    })
    res.status(201).json({
        status: 'success',
        message: 'User create successfuly',
        data: user
    })
};