const { Schema, model } = require('mongoose');

// Schema to create User Model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    //array of id values referencing from thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    //Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// let error;
// try {
//   await user.validate();
// } catch (err) {
//   error = err;
// }
// assert.ok(error);
// assert.equal(error.errors['name'].message, 'Oops!');
// assert.equal(error.errors['email'].message, 'Email validation failed');
// mongoosejs.com/docs/validation.html

//Create a virtual property 'friendCount` that retrieves the length of the user's friends array field on query
https: userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
