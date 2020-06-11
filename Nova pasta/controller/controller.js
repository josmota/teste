const { sql,poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class MainController {

    async getAllData(req , res){
      try {
        const pool = await poolPromise
          const result = await pool.request()
          .query(queries.getAllData)
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addCliente(req , res){
      try {
        if(req.body.nome != null && req.body.cpf != null) {
            const pool = await poolPromise
            const result = await pool.request()
            .input('nome',sql.VarChar , req.body.nome)
            .input('cpf',sql.VarChar , req.body.cpf)
            .query(queries.addCliente)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
        } catch (error) {
          res.status(500)
          res.send(error.message)
      }
    }
    async updateCliente(req , res){
      try {
        if(req.query.id != null && req.body.nome != null && req.body.cpf != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('id',sql.Int , req.query.id)
          .input('newNome',sql.VarChar , req.body.nome)
          .input('cpf',sql.VarChar,req.body.cpf)
          .query(queries.updateCliente)
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    
    async deleteCliente(req , res){
      try {
        if(req.query.id != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('id',sql.VarChar, req.query.id)
            .query(queries.deleteCliente)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
}

const controller = new MainController()
module.exports = controller;