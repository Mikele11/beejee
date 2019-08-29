const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const expect = require('chai').expect;

describe('User Auth', () => {

  it('Register exist', async () => {
    response = await api
      .post(`/api/auth/register`)
      .send({
        username:'superadmin@supeadmin',
        password:'123'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.success).to.equal(false);
    expect(response.body.msg).to.equal('Username already exists.');  
  });

  it('Authentication success', async () => {
    response = await api
      .post(`/api/auth/login`)
      .send({
        username:'admin@admin',
        password:'123'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.success).to.equal(true);
  });

  after('remove test data', () => console.log('after'));

})