const mysql = require("mysql");

const connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function(err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return err;
    }
});

module.exports = connection;
