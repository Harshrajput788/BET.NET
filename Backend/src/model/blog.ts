import { model, Schema,Document,Types } from "mongoose";

interface ICoverImage {
    url:string,
    publicId:string,
}

export interface IBLOG extends Document {
    title:string,
    content:string,
    coverImage:ICoverImage,
    createdBy:Types.ObjectId;
    createAt:Date,
    visits:number,
    visibility:boolean,
    tags:string[];
}

const blogSchema = new Schema<IBLOG>({
    title: {type: String,required: true,},
    content: {type: String,required: true,},
    createdBy: {type: Types.ObjectId,ref: "user",},
    createAt: {type: Date,default: Date.now,},
    visibility:{type:Boolean,required:true},
    visits:{type:Number,default:0},
    coverImage:{url:{type:String},publicId:{type:String}},
    tags:{type:[String]}
})

const blogModel = model("Blog", blogSchema);
export default blogModel;