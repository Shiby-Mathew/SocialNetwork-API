const { connect, connection } = require("mongoose");

//connection and create DB
connect("mongodb://127.0.0.1:27017/networkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
