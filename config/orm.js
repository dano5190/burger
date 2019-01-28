var conn = require("./connection.js");



function printQMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
};


function objToSql(ob){
    var arr = [];

    for (var key in ob){
        var val = ob[key];

        if (Object.hasOwnProperty.call(ob, key)){
            if (typeof val === "string" && val.indexOf(" ") >= 0) {
                val = "'" + val + "'";
            }
            arr.push(key + "=" + val);
        }
    }
    return arr.toString();
}



var orm = {

selectAll: function(input, bb){
    var qString = "SELECT * FROM " + input + ";";
    conn.query(qString, function(err, res){
        if(err) throw err;
        console.log(res);
        bb(res);
    });
},
insertOne: function(table, col, val, bb){
    var qString = "INSERT INTO " + table;

    qString += " (";
    qString += col.toString();
    qString += ") ";
    qString += "VALUES (";
    qString += printQMarks(val.length);
    qString += ") ";

    console.log(qString);

    conn.query(qString, val, function(err, res){
        if (err) throw err;
        console.log(res);
        bb(res);
    });
},
updateOne: function(table, objCol, isEaten, bb){
    var qString = "UPDATE " + table;

    qString += " SET ";
    qString += objToSql(objCol);
    qString += " WHERE ";
    qString += isEaten;

    console.log(qString);

    conn.query(qString, function(err, res){
        if(err) throw err;
        console.log(res);
        bb(res);
    });
}
};

module.exports = orm;