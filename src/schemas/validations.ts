import z from 'zod'
import { AuthInput, PostInput, Message, UserUpdateInput } from 'types'

type UpdateUserPassword = Pick<AuthInput, "password" | "confirmPassword">
type UpdatedUserInfo = Pick<UserUpdateInput,"email" | "nickname">
// Minimum 8 characters, at least one uppercase letter,
// one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
)

const userSchema = z.object({
    nickname: z.string({
        invalid_type_error: 'The nickname must be a valid alphanumeric characters',
        required_error: 'The nickname is required'
    }).min(5,{
        message: 'The nickname must be larger than 5 characters minimum.'
    }).refine((s)=>!s.includes(' '), 'Incorrect nickname'),
    email: z.string().email({
        message: 'Please entry a valid email address'
    }),
    password: z.string().min(6, {message: 'The password must be at 6 characters minimum'}).max(30,{message: 'Is too long password'}), 
    confirmPassword: z.string().min(6, {message: 'The password confirmation not match...'}).max(30, {message:'The confimation of password not match...'})
   
}).refine((values) =>{
        return values.password === values.confirmPassword
    },
    {
        message: "Password must match!",
        path: ["confirmPassword"]
    }
)



const nickname = z.string({
    invalid_type_error: 'The nickname must be a valid alphanumeric characters',
    required_error: 'The nickname is required'
})
.min(5,{message: 'Nickname is too short (min. 5 characters)'})
.max(15, {message: 'Too long nickname (max. 15 characters)'})
.refine((s)=>!s.includes(' '), 'Incorrect nickname')

const email = z.string().email({message: 'Please entry a valid email address'})

const passwordSchema = z.object({
    password: z.string().min(6, {message: 'The password must be at 6 characters minimum'}).max(30,{message: 'Is too long password'}), 
    confirmPassword: z.string().min(6, {message: 'The password confirmation not match...'}).max(30, {message:'The confimation of password not match...'})
}).refine((values) =>{
    return values.password === values.confirmPassword
},
{
    message: "Password must match!",
    path: ["confirmPassword"]
}
)

const postSchema = z.object({
    content: z.string({
        required_error: 'Empty content'
    }).max(255)
})

const messageSchema = z.object({
    name: z.string({
        required_error: 'Empty field'
    }).max(20),
    email: z.string().email({
        message: 'Please entry a valida email address'
    }),
    message: z.string({
        required_error: 'Empty field'
    }).max(255)
})

export function validatePostSchema(input: PostInput){
    return postSchema.safeParse(input)
}



export function validateUserSchema(input: AuthInput){
    return userSchema.safeParse(input)
}

export function validatePasswordSchema(input:UpdateUserPassword){
    return passwordSchema.safeParse(input)
}

export function validateNickname(input: UpdatedUserInfo){
    return nickname.safeParse(input)
}

export function validateEmail(input: UpdatedUserInfo){
    return email.safeParse(input)
}



export function validateMessageSchema(input: Message){
    return messageSchema.safeParse(input)
}