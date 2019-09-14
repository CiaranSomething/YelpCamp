var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Butt's Hole",
        image: "https://farm3.staticflickr.com/2315/2053200770_065e8e8487.jpg",
        description: "Lorem ipsum dolor amet selfies listicle swag green juice, hot chicken poke mixtape. Street art put a bird on it adaptogen jianbing vaporware, vegan fixie biodiesel thundercats disrupt freegan. Locavore vaporware pickled, readymade vegan typewriter master cleanse unicorn occupy wayfarers hammock edison bulb craft beer yr kitsch. Food truck truffaut iPhone, blog before they sold out twee readymade salvia kogi drinking vinegar whatever mumblecore pok pok literally. Cliche lyft art party edison bulb sustainable. Flannel green juice 8-bit, normcore retro kinfolk ugh mixtape flexitarian craft beer cliche.˚."
    },
    {
        name: "Bell's End",
        image: "https://farm8.staticflickr.com/7910/47584414151_e45923f2c2.jpg",
        description: "Lorem ipsum dolor amet selfies listicle swag green juice, hot chicken poke mixtape. Street art put a bird on it adaptogen jianbing vaporware, vegan fixie biodiesel thundercats disrupt freegan. Locavore vaporware pickled, readymade vegan typewriter master cleanse unicorn occupy wayfarers hammock edison bulb craft beer yr kitsch. Food truck truffaut iPhone, blog before they sold out twee readymade salvia kogi drinking vinegar whatever mumblecore pok pok literally. Cliche lyft art party edison bulb sustainable. Flannel green juice 8-bit, normcore retro kinfolk ugh mixtape flexitarian craft beer cliche."
    },
    {
        name: "Cat Place",
        image: "https://farm9.staticflickr.com/8538/8687100436_e06f0fc1e4.jpg",
        description: "Lorem ipsum dolor amet selfies listicle swag green juice, hot chicken poke mixtape. Street art put a bird on it adaptogen jianbing vaporware, vegan fixie biodiesel thundercats disrupt freegan. Locavore vaporware pickled, readymade vegan typewriter master cleanse unicorn occupy wayfarers hammock edison bulb craft beer yr kitsch. Food truck truffaut iPhone, blog before they sold out twee readymade salvia kogi drinking vinegar whatever mumblecore pok pok literally. Cliche lyft art party edison bulb sustainable. Flannel green juice 8-bit, normcore retro kinfolk ugh mixtape flexitarian craft beer cliche."
    }
];

function seedDB(){
    //remove all comments
     Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("comments have been deleted");
        };
     });
    
    // //remove all campgrounds
     Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("everything has been deleted!");
            //add some campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place sucks.",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            }
                        )
                    }
                });
            });
        }
     });
};

module.exports = seedDB;
