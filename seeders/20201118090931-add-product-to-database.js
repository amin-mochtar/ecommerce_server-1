'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
      name: 'tv antik',
      image_url: 'https://img.okezone.com/content/2017/08/02/207/1748395/okezone-innovation-televisi-pertama-terinspirasi-dari-transisi-faksimili-PV4OFFt9NK.jpg',
      price: 9000000,
      stock: 2,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'tv legend',
      image_url: 'https://assets-a1.kompasiana.com/items/album/2019/04/09/tv-retro-zaman-70an-80an-1-5cac5bbe95760e0ac71baff3.jpg',
      price: 5000000,
      stock: 3,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'GPX legend',
      image_url: 'https://www.bikesrepublic.com/wp-content/uploads/2019/01/GPX-Preview-2.jpg',
      price: 25000000,
      stock: 5,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'baju Ronaldo',
      image_url: 'https://www.jakartanotebook.com/images/products/99/63/19084/3/baju-dan-celana-sepakbola-real-madrid-no-7-ronaldo-size-m-or-t-shirt-white-12.jpg',
      price: 250000,
      stock: 20,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'Baju real madrid',
      image_url: 'https://www.jakartanotebook.com/images/products/99/63/19088/3/baju-dan-celana-sepakbola-real-madrid-no-11-bale-size-m-or-t-shirt-white-19.jpg',
      price: 250000,
      stock: 500,
      createdAt: new Date (),
      updatedAt: new Date ()
    },
    {
      name: 'jersey juventus',
      image_url: 'https://s4.bukalapak.com/bukalapak-kontenz-production/content_attachments/43059/w-744/2.jpeg',
      price: 210000,
      stock: 500,
      createdAt: new Date (),
      updatedAt: new Date ()
    },

  ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
    
  }
};
