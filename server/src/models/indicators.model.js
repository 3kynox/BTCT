/* eslint-disable no-console */

// indicators-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('db');

  db.schema.hasTable('table_store').then(exists => {
    if(!exists) {
      db.schema.createTable('table_store', table => {
          table.string('Exchange');
          table.string('Pair');
          table.string('Base_balance');
          table.string('Quote_balance');
          table.string('On_Orders');
          table.string('Bid');
          table.string('Ask');
          table.string('Buy');
          table.string('Sell');
          table.string('Break_point');
          table.string('Bought_avg');
          table.string('Status_message');
          table.string('Bought_volume');
          table.string('Price');
          table.string('Sold_volume');
          table.string('Averaged_down_volume');
          table.string('Open_order');
          table.string('Last_order');
          table.string('EMA1');
          table.string('EMA2');
          table.string('LowBB');
          table.string('HighBB');
          table.string('SMA');
          table.string('Status_message1');
          table.string('Status_message2');
          table.string('GB_status');
      }).then(
        () => console.log('Updated table_store table'),
        e => console.error('Error updating table_store table', e)
      );
    }
  });
  

  return db;
};
