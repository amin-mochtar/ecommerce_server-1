const { generateToken } = require('../helper/jwt')
const app = require('../app')
const { sequelize, Product } = require('../models');
const request = require('supertest')
// const UserController = require('../controllers/userController');
const { queryInterface } = sequelize



let access_token;
let userId;
let id = 0;
//lifecycle
// dijalankan setiap kali test selesai

afterAll((done) => {
    queryInterface.bulkDelete("Products")
        .then(() => {
            done()
        })
        .catch(err => {
            done()
        })
})

//errtest create product
//butuh akses token
// bisa digenerate dengan beforeAll(dijalankan sebelum test)


beforeAll(done => {
    //generate token
    request(app)
        .post('/login')
        .send({ email: 'admin@mail.com', password: '1234' })
        .then(response => {
            access_token = response.body.access_token
            userId = response.body.id
            done()
        })
        
        .catch(err => {
            done(err)
        })
})


describe('POST Create products', () => {
    it('sukses create product', (done) => {
        request(app)
            .post('/products')
            .set({ access_token: access_token })
            .send({
                name: 'produk murah',
                image_url: 'image_url.jpg',
                price: 5000,
                stock: 30,
                UserId: userId
            })
            .then(response => {

                let { body, status } = response
                console.log({IDDD:body.id});
                id = body.id

                expect(status).toEqual(201)
                expect(body).toHaveProperty('name', 'produk murah')
                expect(body).toHaveProperty('image_url', 'image_url.jpg')
                expect(body).toHaveProperty('price', 5000)
                expect(body).toHaveProperty('stock', 30)
                expect(body).toHaveProperty('UserId', expect.any(Number))
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })
    it('gagal create product karena access_token kosong', (done) => {
        request(app)
            .post('/products')
            .set({ access_token: null })
            .send({ name: 'produk murah', image_url: 'image_url.jpg', price: 5000, stock: 30 })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })
    it('gagal create product karena access_token bukan milik admin', (done) => {
        request(app)
            .post('/products')
            .set({ access_token: "iniaksestokenygsalah" })
            .send({ name: 'produk murah', image_url: 'image_url.jpg', price: 5000, stock: 30 })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })

    it('gagal create product karena ada field kosong', (done) => {
        request(app)
            .post('/products')
            .set({ access_token: access_token })
            .send({ name: '', image_url: 'image_url.jpg', price: 5000, stock: 30 })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Validation notEmpty on name failed')
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })
})

describe('GET /products', () => {
    it('sukses fetch all product', (done) => {
        request(app)
            .get('/products')
            .set({ access_token: access_token })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(200)
                expect(body).toBeInstanceOf(Object)
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })

    it('gagal fetch all product', (done) => {
        request(app)
            .get('/products')
            .set({ access_token: null })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {

                done(err)
            })
    })
})


describe('PUT Edit products', () => {
    it('sukses edit product', (done) => {
        request(app)
            .put(`/products/${id}`)
            .set({ access_token: access_token })
            .send({ name: 'produk murah', image_url: 'image_url.jpg', price: 5000, stock: 30 },)
            .then(product => {

                let { body, status } = product

                expect(status).toEqual(200)
                expect(body).toHaveProperty('name', 'produk murah')
                expect(body).toHaveProperty('image_url', 'image_url.jpg')
                expect(body).toHaveProperty('price', 5000)
                expect(body).toHaveProperty('stock', 30)
                done()
            })
            .catch(err => {
                console.log({ err })
                // exerrpect(err).toBeNull
                done(err)
            })
    })
    it('gagal edit product jika tidak ada token', (done) => {
        request(app)
            .put(`/products/${id}`)
            .set({ access_token: null })
            .send({ name: 'produk murah', image_url: 'image_url.jpg', price: 5000, stock: 30 })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })
    it('gagal edit product karena access_token bukan milik admin', (done) => {
        request(app)
            .put(`/products/${id}`)
            .set({ access_token: "iniaksestokenygsalah" })
            .send({ name: 'produk murah', image_url: 'image_url.jpg', price: 5000, stock: 30 })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })
    // it('gagal edit product karena stock minus', (done) => {
    //     request(app)
    //         .put(`/products/${id}`)
    //         .set({ access_token: access_token })
    //         .send({ name: 'produk murah', image_url: 'image_url.jpg', price: 5000, stock: -30 },)
    //         .then(product => {

    //             let { body, status } = product

    //             expect(status).toEqual(400)
    //             expect(body).toHaveProperty('message', 'Validation min on stock failed')
    //         })
    //         .catch(err => {
    //             console.log({ err })
    //             // exerrpect(err).toBeNull
    //             done(err)
    //         })
    // })
})

describe('DELETE products', () => {
    it('sukses delete product', (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set({ access_token: access_token })

            .then(product => {

                let { body, status } = product

                expect(status).toEqual(200)

                expect(body).toHaveProperty('message', 'success delete product')
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })
    it('gagal delete product', (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set({ access_token: null })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })
    it('gagal delete product karena access_token bukan milik admin', (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set({ access_token: "iniaksestokenygsalah" })
            .then(response => {

                let { body, status } = response

                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                console.log({ err })
                done(err)
            })
    })
})