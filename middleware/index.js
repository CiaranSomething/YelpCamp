//all the middleware goes here.
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                //does the user own the campground
                //have to use equals() method and not 'x === y' because foundCampground.author.id is a mongoose object and not a string
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                };
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.")
        res.redirect("back");
    }; 
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //does the user own the comment
                //have to use equals() method and not 'x === y' because foundComment.author.id is a mongoose object and not a string
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                };
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }; 
}

middlewareObj.isLoggedIn = function(req, res, next){
    //'next' means the function in which this is called moves onto the next method. 
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;