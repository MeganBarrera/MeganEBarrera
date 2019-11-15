var path = require("path");

module.exports = (app)=>{
    app.get("/home", (req, res)=>{
        res.render("home")
    });
    app.get("/about", (req, res)=>{
        res.render("about")
    });
    app.get("/portfolio", (req, res)=>{
        res.render("portfolio")
    });
        app.get("/portfolio-categories", (req, res)=>{
            res.render("portfolio-categories")
        });
        app.get("/portfolio-details", (req, res)=>{
            res.render("portfolio-details")
        });
    app.get("/blog", (req, res)=>{
        res.render("blog")
    });
        app.get("/blog-details", (req, res)=>{
            res.render("blog-details")
        });
    app.get("/contact", (req, res)=>{
        res.render("contact")
    });

    //---------AJAX CALLS---------//
    //Template
    app.get("/portfolio-details1", (req, res)=>{
        res.render("portfolio-details1")
    });

    //DATA
    var portfolio = require('../data/portfolio.js');
    // Routes
    app.get("/:url", function(req, res) {
        for (var i = 0; i < portfolio.length; i++) {
        if (portfolio[i].url === req.params.url) {
            return res.render("portfolio-details1", portfolio[i]);
        }
        }
    });

};