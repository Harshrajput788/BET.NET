
interface profileImage {
    url:string,
    publicId:string,
}

export interface IUSER extends Document{
    _id:string,
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