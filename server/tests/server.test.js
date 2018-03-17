const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User}=require('./../models/user');

const user=[{email:'new email'}]

const todos = [{
  name: 'First test todo'
}, {
  name: 'Second test todo'
}];
beforeEach((done)=>{
    User.remove({}).then(()=>{
      return  User.insertMany(user)
    }).then(()=>done())
})
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var name = 'Test todo name';

    request(app)
      .post('/todos')
      .send({name})
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({name}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].name).toBe(name);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});
describe('POST/User',()=>{
    it('should create new user',(done)=>{
        var email='new email'
        request(app)
        .post('/users')
        .send({email})
        .expect(200)
        .expect((res)=>{
            expect(res.body.email).toBe(email)
        }).end((err,res)=>{
            if(err){
                return done(err)
            }
            User.find({}).then((users)=>{
                expect(users.length).toBe(2);
                expect(users[0].email).toBe(email)
                done()
            }).catch((e)=>done(e))
        })
    })
    it('should not create new user with invalid body data',(done)=>{
        request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err)
            }
            User.find().then((users)=>{
                expect(users.length).toBe(1)
                done()
            }).catch((e)=>done(e))
        })
    })
})

describe('GET/Todos',()=>{
    it('should get todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        },(err)=>res.status(400).send(err)).end(done)
    })
})

describe('GET/Users',()=>{
    it('should get users',(done)=>{
        request(app)
    .get('/users')
    .expect(200)
    .expect((res)=>{
        expect(res.body.users.length).toBe(1)
    },(err)=>res.status(400).send(err)).end(done)
    })
    
})