var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res){
    burger.selectAll(function(data){
        var bObject = {
            burgers: data
        };
        console.log(bObject);
        res.render("index", bObject);
    });
});

router.post("/api/burgers", function(req, res){
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, false
    ], function(result){
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res){
    var isEaten = "id = " + req.params.id;

    console.log("isEaten", isEaten);

    burger.updateOne({
        devoured: req.body.devoured
    }, isEaten, function(result){
        if(result.changedRows == 0){
            return res.status(404).end();
        } else{
            res.status(200).end();
        }
    });
});

module.exports = router;