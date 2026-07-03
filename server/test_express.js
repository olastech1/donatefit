const app = require('./index');
const request = require('supertest');

async function test() {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Test Express User',
      email: 'test_express_user1@example.com',
      password: 'password123',
      role: 'creator'
    });
  
  console.log('STATUS:', res.status);
  console.log('BODY:', res.body);
  process.exit(0);
}
test();
