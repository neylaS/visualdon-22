/* PARTIE 1 */
/* Faire une capture d'écran de la page des cantons Wikipédia */

async function capture(url) {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { // Adapter la taille du screenshot (surtout height)
            width: 1920,
            height: 1800
        }
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({
        path: 'img/screenshotCantons.png',
    })
    await browser.close();
}
capture('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');

/* PARTIE 2 */
/* Récupération des données */


const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Données_cantonales');

const datas = await page.$$eval('table tr', rangs => {
    return Array.from(rangs, rang => {
        const colonnes = rang.querySelectorAll('td');
        return Array.from(colonnes, colonne => colonne.innerText);
    });
});

let table = [];
for (let i = 2; i < 28; i++) {
    table.push([datas[i][0], datas[i][3]]);


    for (let i = 0; i < 26; i++) {
        let nom = table[i][0];
        if (nom.includes('\n')) {
            nom = nom.replace('\n', ' – ')
            nom = nom.replace('(', '');
            nom = nom.replace(')', '');
            if (nom.includes(',')) {
                nom = nom.replace(',', ' -')
                if (nom.includes(',')) {
                    nom = nom.replace(',', ' –')
                }
            }
        }
        table[i][0] = nom;
        table[i][1] = table[i][1].replaceAll(/\s/g, ''); // Supprime les espaces des nombres
        table[i][1] = parseInt(table[i][1]) // Transforme en integer
    }

    console.log('Vous trouvez ici les noms de cantons Suisse ainsi que leur populations:');
    console.log(table);
}

/* PARTIE 3 */
 /* Webscraper un site e-commerce */

async function webscrap() {
    const url = "https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
    const response = await fetch(url);
    const html = await response.text();
    const dom = new jsdom.JSDOM(html);

    const produits = dom.window.document.querySelectorAll("div.thumbnail > div.caption > h4:nth-child(2) > a"); // Cherche les noms de produits (on voit le chemin en inspectant un nom de produit, stocké dans un a)
    const prix = dom.window.document.querySelectorAll("div.thumbnail > div.caption > h4.pull-right.price"); // Cherche les prix de produits (on voit le chemin en inspectant un prix de produit, stocké dans un span)
    const etoiles = dom.window.document.querySelectorAll("div.thumbnail > div.ratings > p:nth-child(2)"); // Cherche le nombre d'étoiles d'un produit (on voit le chemin en inspectant les étoiles, nombre stocké dans un p (data-rating))

    const data = []; // Création d'un tableau vide
    for (let i = 0; i < produits.length; i++) { // Création d'une boucle avec le nombre de produits total
        data.push({ // Ajout de données dans le tableau sous forme d'objets avec 1 titre, 1 prix et 1 note (nombre d'étoiles)
            produit: produits[i]["title"], // Récupère la valeur de "title" dans la balise <a ... title="...">
            prix: prix[i].textContent, // Récupère le texte entre la balise <h4 class="pull-right price">
            etoiles: etoiles[i].getAttribute("data-rating") // Récupère la valeur de "data-rating" dans la balise <p data-rating="...">
        });
    }
    return data;
}
webscrap().then(data => console.log(data)); // Affichage du tableau avec node src/index.js
