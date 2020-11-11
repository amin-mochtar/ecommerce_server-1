// const { response } = require('express')
const request = require('supertest')
const app = require('../app')


describe('test POST /login', () => {
    //jika login sukses
    it('login sukses', (done) => {
        request(app)
        .post('/login')
        .send({email:'admin@mail.com', password:'1234'})
        .then(response => {
            // console.log({response});
            //res.stasu(201).json({id:id, email:email})
            let { body, status} = response
            //{body} adalah key kembalian response
            // expetasi statusadalah 200
            // expetasi agar kembalian berupa data object, caranyaa ....
            expect(status).toEqual(200)
            // expect id menggunakan expect.any(number/string/boolean)
            expect(body).toHaveProperty('access_token', expect.any(String))

            // expect kembalian email
            expect(body).toHaveProperty('email', 'admin@mail.com')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
    // jika request gagal/tidak berhasil
    it('login gagal ketika email/password salah', (done) => {
        request(app)
        .post('/login')
        .send({email:'admin@mailll.com', password:'12345'})
        // .set
        .then(response => {
            
            let { body, status} = response
            //{body} adalah key kembalian response
            // expetasi statusadalah 400
            // expetasi agar kembalian berupa data object, caranyaa ....
            expect(status).toEqual(401)
            // expect kembalian message error
            expect(body).toHaveProperty('message', 'wrong email/password')
            done()
        })
        .catch(err => {
            console.log(err)
            done()
            
        })
    })
})