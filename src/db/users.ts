import mongoose, { ObjectId } from "mongoose";

const UserSchema = new mongoose.Schema({
    info: {
        fname:{type: String, required: true},
        lname:{type: String, required: true},
        email: {type: String, required: true},
    },
    authentication: {        
        password: {type: String, required: true},
        salt: {type: String, required: true},
        sessionToken: {type: String, required: false},
        isVerified: {type: Boolean, default:false},
        otp: {type: String, default: ''}
    }
}, {
    timestamps: true,
})

interface UserInterface {
    _id: ObjectId
    info: {
        fname: String,
        lname: String,
        email: String,        
    },
    authentication: {        
        password: String,
        salt: String,
        sessionToken: String,
        isVerified: Boolean,
        otp: String
    }
}

export const UserModel = mongoose.model('User', UserSchema);

// 🔥 Database Query
export const UserDB = () => {
    return {

        // ❤️‍🔥 GET
        getAllUsers: (searchQuery:object, limit?:number, skip?:number, sortByRecent?:boolean) => 
        UserModel.find<UserInterface>(searchQuery).skip(skip).limit(limit).sort({ updatedAt: sortByRecent ? 'desc' : 'asc' }),

        getUserByEmail : (email:string) => UserModel.findOne<UserInterface>({ 'info.email':email }),
        getUserBySessionToken : (sessionToken:string) => UserModel.findOne<UserInterface>({
            'authentication.sessionToken': sessionToken
        }),

        getUserById : (id:string) => UserModel.findOne<UserInterface>({_id:id}),

        // ❤️‍🔥 CREATE
        createUser : (values: Record<string, any>) => new UserModel(values)
            .save().then((user) => user.toObject()),

        // ❤️‍🔥 DEACTIVE
        deactiveUser: (id:string) => UserModel.findByIdAndUpdate<UserInterface>({
            _id: id
        }, {'authentication.isActive': false}, {new:true}),

        // ❤️‍🔥 ACTIVE
        activeUser: (id:string) => UserModel.findByIdAndUpdate<UserInterface>({
            _id: id
        }, {'authentication.isActive': true}, {new: true}),

        // ❤️‍🔥 UPDATE
        updateUserById : (id:string, values: Record<string, any>) => UserModel.findOneAndUpdate<UserInterface>({_id:id}, values, {new: true}),
        deleteUserById : (id: string) => UserModel.findOneAndDelete<UserInterface>({_id:id}),
    }
}