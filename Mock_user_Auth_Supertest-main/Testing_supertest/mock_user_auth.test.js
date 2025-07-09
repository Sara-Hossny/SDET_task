const request = require('supertest');
const config = require('./Config/config'); // import test config
const testData = require('./testData/requestData'); // import request data
const expected = require('./testData/responseData'); // import expected response data

// Override BASE_URL dynamically if env var exists
config.BASE_URL = process.env.API_BASE_URL || config.BASE_URL;
const { BASE_URL, endpoints } = config;
console.log(`Using BASE_URL: ${BASE_URL}`);

let token = '';

describe('User API Flow (with modular test data and response expectations)', () => {

  it('Create User - should register successfully', async () => {
    const res = await request(BASE_URL)
      .post(endpoints.createUser)
      .send(testData.user);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(expected.createUserResponse);
  });

  it('Authenticate User - should return token', async () => {
    const res = await request(BASE_URL)
      .post(endpoints.authUser)
      .send(testData.loginUser());

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(expected.authUserResponse);

    token = res.body.token; // Save token for authenticated routes
  });

  it('Get User Profile - should return full profile with token', async () => {
    const res = await request(BASE_URL)
      .get(endpoints.getUser)
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(expected.getUserResponse(testData.user));
  });

  it('Update User - should succeed', async () => {
    const res = await request(BASE_URL)
      .patch(endpoints.updateUser)
      .set('Authorization', token)
      .send(testData.updatedUser);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(expected.updateUserResponse);
  });

  it('Delete User - should succeed', async () => {
    const res = await request(BASE_URL)
      .delete(endpoints.deleteUser)
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(expected.deleteUserResponse);
  });

  it('Delete All Users (Admin) - should succeed', async () => {
    const res = await request(BASE_URL)
      .delete(endpoints.deleteAllUsers)
      .send(testData.adminKey);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(expected.deleteAllUsersResponse);
  });
  
  it('Delete User - missing token should fail', async () => {
    const res = await request(BASE_URL)
      .delete(endpoints.deleteUser); // no token

    expect(res.statusCode).toBe(403);
  });
  it('Get User Profile - missing token should fail', async () => {
    const res = await request(BASE_URL)
      .get(endpoints.getUser); 

    expect(res.statusCode).toBe(403);
  });
  it('Create User - missing email should fail', async () => {
    const res = await request(BASE_URL)
      .post(endpoints.createUser)
      .send(testData.invalidUserWithoutEmail);
    expect(res.statusCode).toBe(400);
  });
  it('Create User - missing Password should fail', async () => {
    const res = await request(BASE_URL)
      .post(endpoints.createUser)
      .send( testData.invalidUserWithoutPassword );
    expect(res.statusCode).toBe(400);
  });
  it('Create User - empty should fail', async () => {
    const res = await request(BASE_URL)
      .post(endpoints.createUser)
      .send( {} );
    expect(res.statusCode).toBe(400);
  });
  
  it('Delete All Users (Admin) - missing adminKey should fail', async () => {
  const res = await request(BASE_URL)
    .delete(endpoints.deleteAllUsers)
    .send({}); // no adminKey sent

  expect(res.statusCode).toBe(403); 
});


});
