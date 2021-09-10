// import { shallow } from 'enzyme';
import request from 'supertest';
import db from '../../sequelize/models/index';
import app from '../../app';

describe('Models', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  it('should create a User', async () => {
    const person = await db.User.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
    });
    expect(person.id).toEqual(1);
  });
  // it('should display base router', async () => {
  //   const res = await request(app).get('/');
  //   console.log('****** ', res);
  //   expect(res.message).toEqual('*** Welcome to TVTS ***');
  // });
});
// afterAll(async () => {
//   await db.sequelize.close();
// });

describe('Models', () => {
  it('should display base router', async () => {
    const res = await request(app).get('/');
    console.log('****** ', res.statusCode);
    expect(res.statusCode).toEqual(200);
  });
});
