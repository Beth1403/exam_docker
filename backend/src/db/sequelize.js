const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')


const DB_NAME = process.env.DB_NAME || 'pokemon';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'example'; 
const DB_HOST = process.env.DB_HOST || 'mariadb';
const DB_PORT = process.env.DB_PORT || '3306'; 

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: true
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
      .then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
    .then(hash => User.create({ username: 'pikachu', password: hash }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de données a bien été initialisée !')
  })
}

module.exports = { 
  initDb, Pokemon, User
}