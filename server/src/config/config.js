/**
 * This file define the database configuration parameters
 * Default module used: sqlite

 * To change to MYSQL:
   - change password/user to valid mysql credentials
   - dialect: 'mysql'
   - remove 'storage' parameter
*/

module.exports = {
 port: process.env.PORT || 8081,
 db: {
   database: process.env.DB_NAME || 'blacksmith',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASS || '',
   options: {
     dialect: process.env.DIALECT || 'sqlite',
     host: process.env.HOST || 'localhost',
       storage: './db.sqlite'
   }
 },
 authentication: {
   jwtSecret: process.env.JWT_SECRET || 'secret'
 }
};
