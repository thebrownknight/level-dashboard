/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // The user's full name
    // e.g. Nikola Tesla
    name: {
      type: 'string',
      required: true
    },

    // The user's title
    // e.g. Genius
    title: {
      type: 'string'
    },

    // The user's email address
    // e.g. nikola@tesla.com
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    // The encrypted password for the user
    // e.g. asdfkjlha348934kaslf83bkjaf8932jkasdf
    encryptedPassword: {
      type: 'string',
      required: true
    },

    // The timestamp when the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    // Url for gravatar
    gravatarUrl: {
      type: 'string'
    }
  }
};
