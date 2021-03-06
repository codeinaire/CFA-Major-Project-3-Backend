// const User = require('mongoose').model('User');
const mongoose = require('mongoose');
const User = require('../models/Users');


exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    });
};

exports.createUser = (req, res) => {
  const userSave = new User();
  const UserQuery = req.query;
  userSave.fullName = UserQuery.fullName;
  userSave.emailAddress = UserQuery.emailAddress;
  userSave.location = UserQuery.location;
  userSave.save()
    .then(() => {
      res.json('User successfully added');
    });
};

// this works when I put :User_id before the JWT
exports.getUser = (req, res) => {
  User.findById(req.params.user_id)
    .then(user => {
      res.json(user);
    });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.user_id }, req.query, {
    new: true,
  })
  .then(user => {
    res.json(user);
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.user_id;
  User.findByIdAndRemove(id)
    .then(
      res.send('User successfully deleted')
      );
};
