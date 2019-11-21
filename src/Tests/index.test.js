const chai = require('chai');

const expect = chai.expect;
const url = `https://lambda-labs-swaap-staging.herokuapp.com/`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Returns user with id = 10', (done) => {
        request.post('/graphql')
        .send({ query: '{ user(id: 10) { id name username email } }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            res.body.user.should.have.property('id')
            res.body.user.should.have.property('name')
            res.body.user.should.have.property('username')
            res.body.user.should.have.property('email')
            done();
        })
    })

    it('Returns all users', (done) => {
        request.post('/graphql')
        .send({ query: '{ user { id name username email } }' })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // assume there are a 100 users in the database
            res.body.user.should.have.lengthOf(100);
        })  
    })
});