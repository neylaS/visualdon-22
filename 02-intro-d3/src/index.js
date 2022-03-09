import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!



//DOM:
d3.select("body").append("div").attr("class", "mon-svg").append("svg");
const svg = d3.select("svg").attr("height", "1000").attr("width", "1000");


// Dessiner les cercles:

//Cercle 1
svg.append("circle").attr("class", "circle1").attr("cx", "50").attr("cy", "50").attr("r", "40");

//Cercle  2
svg.append("circle").attr("class", "circle2").attr("cx", "150").attr("cy", "150").attr("r", "40");

//Cercle  3
svg.append("circle").attr("class", "circle3").attr("cx", "250").attr("cy", "250").attr("r", "40");


//changer la couleur d'un cercle:
d3.select(".circle2").attr("fill", "red")


//changer la position des cercles :
d3.select(".circle2").attr("cx","200")
d3.select(".circle3").attr("cx","300")

//ajouter du texte sous les cercles:
d3.select("svg").append("text").text("Premier cercle").attr("x", "10").attr("y", "120")
d3.select("svg").append("text").text("Deuxième cercle").attr("x", "150").attr("y", "210")
d3.select("svg").append("text").text("Troisième cercle").attr("x", "260").attr("y", "310")


//aligner les cercles grâce a un clic :

const circles = d3.selectAll("circle");
const texts = d3.selectAll("text");

d3.select(".circle3").on("click", () => {
    circles.attr("cx","100")
    texts.attr("x","50")
});


//données :
const data = [20, 5, 25, 8, 15];

//dessiner rectangles :
svg.selectAll("rect").data(data).enter().append("rect").attr("height", d=>d).attr("width", "20").attr("fill", "red").attr("y", d=>400-d).attr("x", (d,i)=>i*22+30);




