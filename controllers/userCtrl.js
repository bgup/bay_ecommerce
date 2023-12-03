import User from '../model/User.js';

// @desc Register user
// @route POST /api/v1/users/register
// @acces Private/Admin

export const registerUserCtrl = async (req, res) => {
    const { fullname, email, password } = req.body;
    //check user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.json({
            msg: "User already exist"
        })
    }
    console.log('fullname: '+fullname);
    
    //hash password
    // create user
    const user = await User.create({
        fullname, email, password
    });
    res.status(201).json({
        status:'success',
        message: 'User registered successfully',
        data: user
    })
};