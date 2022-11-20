
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my BlogPost website! You can go to different routes like /compose to make a new blogpost and /posts/(title of your post) to access your created blogpost individually.";
const aboutContent = "The whole website has been developed using pure Node.js and multiple modules like Express, BodyParser, EJS and Lodash.";
const contactContent = "Contact me at suvigyamadrid@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
})

app.get("/about", function (req, res) {
  res.render("about", { abtContent: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact", { coContent: contactContent });
})

app.get("/compose", function (req, res) {
  res.render("compose");
})

app.post("/compose", function (req, res) {
  const postContent = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(postContent);

  res.redirect("/");
})

app.get("/posts/:postName", function (req, res) {
  const requestedPost = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedPost = _.lowerCase(post.title);

    if (storedPost === requestedPost) {
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
  })
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
