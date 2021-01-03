const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email inválido')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('senha')) {
                throw new Error('A senha não pode conter "senha"')
            }
        }
    },
    admin: {
        type: Boolean,
        default: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token
}

userSchema.statics.findByCredentials = async (email, pw) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Login não autorizado')
    }

    const isMatch = await bcrypt.compare(pw, user.password)

    if(!isMatch){
        throw new Error('Login não autorizado')
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User