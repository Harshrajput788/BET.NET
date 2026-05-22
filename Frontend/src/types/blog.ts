interface ICoverImage {
    url:string,
    publicId:string,
}

export interface IBLOG extends Document {
    _id:string,
    title:string,
    content:string,
    coverImage:ICoverImage,
    createdBy:{
        _id:string,
        email:string,
    },
    createAt:Date,
    visits:number,
    visibility:boolean,
    tags:string[];
}
