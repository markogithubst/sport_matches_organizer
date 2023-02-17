const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
  {
    _id: new ObjectId('63eb6abf9792291234cd6a75'),
    username: 'jops12',
    name: 'Josip',
    surname: 'Bogunovic',
    email: 'jboguno@gmail.com',
    password: 'password',
    phone: '+385993404575',
    role: 'USER'
  },
  {
    _id: new ObjectId('63eb6abf9792291234cd6a76'),
    username: 'marks',
    name: 'Marko',
    surname: 'Vukusic',
    email: 'mvukusic@gmail.com',
    password: 'password',
    phone: '+385993404576',
    role: 'USER'
  },
  {
    _id: new ObjectId('63eb6abf9792291234cd6a77'),
    username: 'ivks3',
    name: 'Ivana',
    surname: 'Burazin',
    email: 'iburazin@gmail.com',
    password: 'password',
    phone: '+1993404577',
    role: 'USER'
  },
  {
    _id: new ObjectId('63eb788d339bb827e5fe77d2'),
    username: 'franks',
    name: 'Frane',
    surname: 'Kalebic',
    email: 'fkalebic@gmail.com',
    password: 'password',
    phone: '+385993404544',
    role: 'USER'
  },
  {
    _id: new ObjectId('63eb788d339bb827e5fe77d3'),
    username: 'lovrks',
    name: 'Lobre',
    surname: 'Begovic',
    email: 'lbegovic@gmail.com',
    password: 'password',
    phone: '+385993411576',
    role: 'USER'
  },
  {
    _id: new ObjectId('63eb788d339bb827e5fe77d4'),
    username: 'karlks',
    name: 'Karlo',
    surname: 'Dujmic',
    email: 'kdujemic@gmail.com',
    password: 'password',
    phone: '+1993231457',
    role: 'USER'
  },
  {
    _id: new ObjectId('63eb788d339bb827e5fe77d5'),
    username: 'admin',
    name: 'admin',
    surname: 'admin',
    email: 'admin@gmail.com',
    password: 'password',
    phone: '+1993231456',
    role: 'USER'
  }
];
