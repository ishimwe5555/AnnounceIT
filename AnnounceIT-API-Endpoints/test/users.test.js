import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.should();
chai.use(chaiHttp);

const newUser = {
  
  email: '123456@test.com',
  userName: "johngoe",
  firstName: 'Test',
  lastName: 'testin',
  password: 'test@test.com',
  phoneNumber: '0788888888'
};
const newLogin = {
  userName: "johngoe",
  password:"test@test.com"
};
const newLogin2 = {
  userName: "johngowdy",
  password:"test@test.com"
};
const newLogin3 = {
  userName: "johngoe",
  password:"test@testerrrrrrrr.com"
};
// const newUser2 = {
//   id: users.length + 1,
//   email: 'test@test.com',
//   firstName: 'Testion',
//   lastName: 'gidh',
//   password: 'trub',
//   phoneNumber: '0788434537'

// };

const newUser3 = {
  email: 'norb',
  firstName: 'norbbcah',
  lastName: 'dfgh',
  password: 'tfghfgrub',
  phoneNumber: '078fgh8434537'
};


describe('User', () => {
  describe('Authentication', () => {

    it('Should create new user', done => {
      chai
        .request(app)
        .post('/api/v1/users/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('Should not create user with existing email', done => {
      chai
        .request(app)
        .post('/api/v1/users/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
    it('Should not create user with existing username', done => {
      chai
        .request(app)
        .post('/api/v1/users/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
    it('Should not create the user if there is validation error', done => {
      chai
        .request(app)
        .post('/api/v1/users/signup')
        .send(newUser3)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should login successfully', done => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(newLogin)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('Should not login if username does not exist', done => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(newLogin2)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('Should not login if password is incorrect', done => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(newLogin3)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('Users', () => {
  describe('Get and post', () => {
 
    it('user should not see list of all users', done => {
      chai
        .request(app)
        .get('/api/v1/users/')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('admin should see a specific user if ID exists', done => {
      chai
        .request(app)
        .get('/api/v1/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('admin should not see a specific user if ID does not exist', done => {
      chai
        .request(app)
        .get('/api/v1/users/686')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    
    it('Should not update details of user if not admin', done => {
      chai
        .request(app)
        .put('/api/v1/users/1')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('Should not create announcement without token', done => {
      chai
        .request(app)
        .post('/api/v1/announcements')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('Should not delete announcement if not admin', done => {
      chai
        .request(app)
        .delete('/api/v1/announcements/1')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
   
  });
});


describe('Testing the create Announcement Feature', () => {
  const announcement = {
    owner:3,
    start_date: 1 / 10 / 2020,
    end_date: 5 / 11 / 2020
  };


  const announcement2 = {
    owner: 'opp',
    text: 'ads',
    startDate: '01,10,2020',
    endDate: '05,11,2020'
  };
  const announcement3 = {
    owner:'string',
    text:"some text here",
    start_date: 1 / 10 / 2020,
    end_date: 5 / 11 / 2020
  };

  it('user Should update his Announcement', done => {
    chai
      .request(app)
      .patch('/api/v1/announcements/1/sold')
      .send(announcement)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Should not update announcement that does not exist', done => {
    chai
      .request(app)
      .post('/api/v1/announcements/786/sold')
      .send(announcement2)
      .end((error, res) => {
        res.should.have.status(404);
       
        done();
      });
    });
    it('user Should update his Announcement with validation', done => {
      chai
        .request(app)
        .patch('/api/v1/announcements/1/')
        .send(announcement3)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
 });
