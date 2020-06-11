const sql = require('mssql/msnodesqlv8')

const poolPromise = new sql.ConnectionPool({
    connectionString: "server=.;Database=Master;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"
  })
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}