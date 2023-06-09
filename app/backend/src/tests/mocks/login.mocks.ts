export const userMock = {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

export const validUser = {
    email: 'user@user.com',
    password: 'secret_user',
}

export const emptyEmail = { 
    password: 'secret_user'
}

export const emptyPassword = {
    email: 'user@user.com'
}

export const invalidEmail = {
    email: 'invalid@user.com',
    password: 'secret_user',
}

export const invalidPassword = {
    email: 'user@user.com',
    password: 'invalid_password'
}
