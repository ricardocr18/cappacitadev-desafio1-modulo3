const knex = require('knex')
const dataBaseConfig = require ('./knexfile')

const databaseConnection = knex(dataBaseConfig)

module.exports = {databaseConnection}