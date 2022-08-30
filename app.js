//Inicialização de bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

// Lorem ipsum
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//Gerar as aplicações e afins
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Backend

//Database

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
}
const Post = mongoose.model("Post", postSchema);

//Inicialização das páginas
app.get("/", function(req, res){

  //Buscando na database por todos os documentos da coleção posts e renderizando na home.ejs
  Post.find({}, function(err, posts){

    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts: posts,
    });
    
  });
    
});

//Página sobre (placeholder)
app.get("/about", function(req, res){

  res.render("about", {aboutContent: aboutContent});

});

//Página de contato (placeholder)
app.get("/contact", function(req, res){

  res.render("contact", {contactContent: contactContent});

});

//Página para compor os posts (acessível apenas direto na URL)
app.get("/compose", function(req, res){

  res.render("compose");

});

//Levando o usuário para o post quando ele clicka no Read More
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
    
  //Ele procura na DB qual único post tem o mesmo ID do que teve o Read More clickado e redireciona o usuário
  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
      title: post.title,
      content: post.content
    })
  
  })
    
});
   

//Lógica para publicar posts
app.post("/compose", function(req, res){

  const postTitle = req.body.postTitle
  const postContent = req.body.postContent

  post.save(function(err){
    !err ?  res.redirect("/") : console.log(err)
  });
  console.log(post);

});

//Inicializar blog
app.listen(3000, function() {

  console.log("Server started on port 3000");

});
