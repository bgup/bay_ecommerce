import mongoose from "moongose";
const Schema = mongoose.Schema;

const UserShema= new Schema=({
    fullname : {
        type:String,
        required: true,
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type:String,
        required:true
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    wishLists:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"WishList",
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },
    hasShippingAddress:{
        type:Boolean,
        default:false
    },
    shippingAddres:{
        lastName:{
            type:String
        },
        firstName:{
            type:String,
        },
        city:{
            type:String, 
        },
        postalCode:{
            type:String, 
        },
        province:{
            type:String, 
        },
        country:{
            type:String,
        },
        phone:{
            type:String, 
        },
    },
    
},
{
    timestamps:true
}
);

// comPile the schema to model
const User= mongoose.model('User',UserShema)

export default  User;