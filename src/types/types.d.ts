export interface AuthInput{
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string
}

export interface UserUpdateInput{
    nickname: string;
    email: string;
}

export interface PostInput{
    content: string;
    authorId: number;
    videoId: string;
}

export interface ResponsePostInput{
    content: string;
    authorId: number;
    videoId: string;
    postId: number;
}

export interface IPayload {
    id: number
    email: string
}

export interface Message {
    name: string,
    email: string,
    message: string
}