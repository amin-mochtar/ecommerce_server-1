'use strict';

const {hashPassword} = require('../helper/bcrypt.js')

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Users', [{
     email: 'admin@mail.com',
     password: hashPassword('1234'),
     role: 'admin',
     createdAt: new Date(),
     updatedAt: new Date()
     }], {});
  
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Users', null, {});
  }
};
