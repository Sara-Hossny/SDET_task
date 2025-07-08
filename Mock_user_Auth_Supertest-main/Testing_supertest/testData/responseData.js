module.exports = {
  createUserResponse: {
    message: 'User registered with success',
    token: expect.any(String)  // token is dynamic
  },

  authUserResponse: {
    token: expect.any(String)
  },

  getUserResponse: (user) => ({
    id: expect.any(Number),
    name: user.name,
    email: user.email,
    password: user.password, 
    imageUrl: expect.any(String)
  }),

  updateUserResponse: {
    message: 'User updated with success'
  },

  deleteUserResponse: {
    message: 'User deleted with success'
  },

  deleteAllUsersResponse: {
    message: 'Users deleted with success'
  }
};
