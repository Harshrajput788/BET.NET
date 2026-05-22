import { Schema,model ,Document} from "mongoose";

interface profileImage {
    url:string,
    publicId:string,
}

export interface IUSER extends Document{
    firstName:string,
    lastName:string,
    email:string,
    userName:string,
    password:string,
    profile:profileImage,
    age:number,
    gender:"Male"|"Female",
    bio:string,
    verified:boolean,
    verifictionCode:string|undefined,
    expiarVerifictionCode:Date|undefined,
    forgotPassword:string|undefined,
    expairForgotPassword:Date|undefined
}

const userSchema = new Schema<IUSER>({
    firstName:{type:String,require:true,},
    lastName:{type:String,require:true,},
    email:{type:String,require:true,unique:true,},
    profile:{
        url:{type:String,default:'https://res.cloudinary.com/dnrifzem4/image/upload/v1779265282/q5sejwus4g2uxvsjoaub.webp'},
        publicId:{type:String}
    },
    userName:{type:String,require:true,unique:true},
    password:{type:String,require:true,},
    age:{type:Number,},
    gender:{type:String,enum:["Male","Female"]},
    bio:{type:String,},
    verified:{type:Boolean,default:false},
    verifictionCode:{type:String,},
    expiarVerifictionCode:{type:Date},
    forgotPassword:{type:String,},
    expairForgotPassword:{type:Date}
},{timestamps:true});


const userModel = model('user',userSchema);

export default userModel;