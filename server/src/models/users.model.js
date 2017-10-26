/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
    const db = app.get('db');

    db.schema.hasTable('user').then(exists => {
        if(!exists) {
            db.schema.createTable('user', table => {
                table.increments('id');
                table.string('username');
                table.string('password');
                table.string('permissions');
                table.string('createdAt');
                table.string('updatedAt');
            }).then(
                () => console.log('Updated user table'),
                e => console.error('Error updating test table', e)
            );
        }
    });


    return db;
};
