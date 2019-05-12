var express = require('express');
var mysql = require('mysql');

var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'e-commerce'
});

con.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");
}); 


    app.get('/products', function(req, res) {




        if(req.query.categoryId === ''){
            con.query("SELECT * FROM produkti", function (err, result, fields) {
            if (err) throw err;
            console.log(JSON.stringify(result));
    
    
    
          });
        }else{


        var x= req.query.categoryId;
        var sql = 'SELECT * FROM produkti WHERE categoryId = ?';
        con.query(sql, [x], function (err, result) {
        if (err) throw err;
        console.log(result);

    });

}
});

      app.listen(3000, function () {
        console.log("App listening on 3000")
    });
   
    
    
  

 