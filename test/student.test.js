const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');  
const Student = require('../models/student');
const chai = require('chai');
const expect = chai.expect;
const jwt = require('jsonwebtoken');

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Student API', () => {
    let studentId;
    let token;  // Declare a variable for the token

    before(async () => {
        // Create a token for a teacher role
        token = jwt.sign({ role: 'Teacher' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    // Test POST /api/students
    it('should create a new student', async () => {
        const response = await request(app)
            .post('/api/students')
            .set('Authorization', `Bearer ${token}`)  // Set the token in the header
            .send({ name: 'John Doe', rollno: '12345', class: '10', section: 'A' });
        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('John Doe');
        studentId = response.body._id;  
    });

    // Test GET /api/students
    it('should get all students', async () => {
        const response = await request(app)
            .get('/api/students')
            .set('Authorization', `Bearer ${token}`);  // Set the token in the header
        expect(response.status).to.equal(200);
        expect(response.body.length).to.be.greaterThan(0);  
    });

    it('should get a student by ID', async () => {
        const response = await request(app)
            .get(`/api/students/${studentId}`)
            .set('Authorization', `Bearer ${token}`);  // Set the token in the header
        expect(response.status).to.equal(200);
        expect(response.body._id).to.equal(studentId);
    });

    // Test PUT /api/students/:id
    it('should update a student by ID', async () => {
        const response = await request(app)
            .put(`/api/students/${studentId}`)
            .set('Authorization', `Bearer ${token}`)  // Set the token in the header
            .send({ name: 'Jane Doe' });
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('Jane Doe');
    });

    // Test DELETE /api/students/:id
    it('should delete a student by ID', async () => {
        const response = await request(app)
            .delete(`/api/students/${studentId}`)
            .set('Authorization', `Bearer ${token}`);  // Set the token in the header
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('student deleted');
    });
});
