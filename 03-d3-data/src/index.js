import { json } from 'd3-fetch'
import * as d3 from 'd3';

// Fetch data 
Promise.all([
    json('https://jsonplaceholder.typicode.com/posts'),
    json('https://jsonplaceholder.typicode.com/users')
  ])
  .then(([posts, users]) =>  {
      console.log(posts);
      console.log(users);


//jouer avec les données dans le DOM
d3.select("body").append("div").attr("class","container");
d3.select(".container").append("strong").text("Posts par utilisateur : ");

// constentes
let tab=[];
let i=0;
let postFiltre;
let maxBL=0;
let userIdMaxBL;




// Exercice 1 - Calculer le nombre de posts par user
    users.forEach(usr => {
        postFiltre = posts.filter(post=>post.userId === usr.id)
     
      d3.select(".container").append("p").text(usr.name+" : "+postFiltre.length+" posts");
    })



// Exercice 2 - Calculer le post le plus long
    posts.forEach(post_index => {
      //If for sorting the longest body and save who is the owner for this body
    if (post_index.body.length> maxBL) {
        maxBL = post_index.body.length;
        userIdMaxBL = post_index.userId;
    }

    })
    d3.select(".container").append("strong").text("Le post le plus long : "); 
    d3.select(".container").append("p").text(users[userIdMaxBL].name+", a créé le post le plus long avec un total de "+ maxBL+" caractères");
    




    // Exercice 3 - Dessiner les données 
    const WIDTH = 500
    const HEIGHT = 500

    d3.select("body").append("div").attr("class","mon-svg");
    d3.select(".mon-svg").append("svg");
    const div = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT)
    

    // Boucle foreach qui créé un tableau
    users.forEach(usr => {
     postFiltre = posts.filter(post=>post.userId === usr.id) //permet de filtrer les users grace a l'id
      console.log("🚀 ~ file: index.js ~ line 25 ~ .then ~ postFiltre", postFiltre.length)
      tab[i]= postFiltre.length;
      i++;
    })

    //Créé le garphique
    const widthRect = 25;
    div.selectAll("rect")
      .data(tab)
      .enter()
      .append("rect")
      .attr('x', (d,i) => (i*40+50))
      .attr('y', d => 300-d*10)
      .attr('width', widthRect)
      .attr('height', d => d*10)
      .attr('stroke', 'none')
      .attr('fill', 'red');

     
      var texts = div.selectAll("text")
	      .data(tab)
	      .enter()
	      .append("text");

      texts
      .attr('x', (d,i) => (i*40+55))
      .attr('y', d => 300+20)
	    .text(function(d){ return d});

});