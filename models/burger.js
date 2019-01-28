var orm = require("../config/orm.js");

var burger = {
    selectAll: function(bb){
        orm.selectAll("burgers", function(res){
            bb(res);
        });
    },
    insertOne: function(col, val, bb){
        orm.insertOne("burgers", col, val, function(res){
            bb(res);
        });
    },
    updateOne: function(objVal, isEaten, bb){
        orm.updateOne("burgers", objVal, isEaten, function(res){
            bb(res);
        });
    }
};


module.exports = burger;