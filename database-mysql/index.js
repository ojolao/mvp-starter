var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var insertItem = function (itemInfo, callback) {
  connection.query('INSERT INTO items SET ?', itemInfo, function (err, response) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  });
};

var deleteItem = function (itemInfo, callback) {
  connection.query('DELETE from items WHERE id = ?', itemInfo, function(err, response) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  });
};

var updateItems = function (itemInfo, callback) {
  connection.query('truncate items', function (err, response) {
    if (err) {
      throw (err);
    } else {
      connection.query('Insert INTO items SET ?', itemInfo, function (err, response) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, response);
        }
      });
    }
  });
};

module.exports = {
  selectAll : selectAll,
  insertItem : insertItem,
  deleteItem : deleteItem,
  updateItems : updateItems
};
  
