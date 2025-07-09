const timestamp = Date.now();

module.exports = {
  // Create User Payload
  user: {
    name: "user",
    email: `test${timestamp}@mail.com`,
    password: "user123"
  },

  // Login Payload
  loginUser: function () {
    return {
      email: this.user.email,
      password: this.user.password
    };
  },

  // Update User Payload
  updatedUser: {
    name: "newName",
    email: `new_test${timestamp}@mail.com`,
    password: "newpassword123"
  },

  // Admin key for deleting all users
  adminKey: {
    key_admin: "keyadmin123"
  },
  invalidUserWithoutPassword: {
    email: `new_test${timestamp}@mail.com`
  },
    invalidUserWithoutEmail: {
    password: "newpassword123"
  },
};
