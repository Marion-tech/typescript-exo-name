// Import stylesheets
import { firstNames, names } from './data';
import { Person, shortDescription } from './interface';
import './style.css';

function generateRandomUser(size: number): Person[] {
  var users: Person[] = [];
  for (var i = 0; i < size; i++) {
    users.push({
      name: names[getRandomInt(names.length)],
      firstName: firstNames[getRandomInt(firstNames.length)],
      dateOfBirth: new Date(
        `${getRandomInt(122, 1900)}-${getRandomInt(12)}-${getRandomInt(28)}`
      ),
      size: getRandomInt(90, 120),
      weight: getRandomInt(80, 40),
    });
  }
  return users;
}

function getRandomInt(max, start = 0) {
  return start + Math.floor(Math.random() * max);
}

// Ici on génère le nombre d'utilisateur aléatoire
var users = generateRandomUser(100);

console.log('Liste des utilisateurs', users);

// Le code au dessus permet de générer aléatoirement des gens, avec nom prénom, date de naissance, taille et poids. Nous allons donc travailler avec cette petite liste de nom :D
// Le hasard est une chose magnifique, y aura t'il des homonymies ? des gens avec le même nom ? voir le même prénom ? Et bien tout ça, on va le coder :D

// Première étape: les tris

/*
 **
 ** 1°) Trier la liste par la taille
 **
 */
function compareSize(a, b) {
  if (users.map((user) => user.size) > a) {
    return -1;
  }
}
// XXXXXX Première solution érronée renvoie les tailles triées : let SortSize = users.map(user => user.size).sort((a, b)=> a-b);
let SortSize = users.sort((a, b) => (a.size > b.size ? 1 : -1));
console.log('1.1/ trier par la taille : ', SortSize);
/*
 **
 ** 2°) Trier la liste par le nom
 **
 */
let SortName = users.sort((a, b) => (a.name > b.name ? 1 : -1));
console.log('1.2/ trier par le nom : ', SortName);

/*
 **
 ** 3°) Trier la liste par la date de naissance
 **
 */
let SortNaiss = users.sort((a, b) => (a.dateOfBirth > b.dateOfBirth ? 1 : -1));
console.log('1.3/ trier par DoB : ', SortNaiss);

/*
 **
 ** 4°) Trier la liste par le nom et prénom
 **
 */
let SortNP = users.sort((a, b) =>
  a.name + a.firstName > b.name + b.firstName ? 1 : -1
);
console.log(
  'concat Nom & Prénom : ',
  users.map((user) => user.name + user.firstName)
);
console.log('1.4/ trier par Nom & Prénom : ', SortNP);

// deuxième étape, les filtres

/*
 **
 ** 1°) afficher uniquement les gens ayant une taille supérieur à 1m60
 **
 */
let Filt160 = users
  .filter((user) => user.size > 160)
  .sort((a, b) => (a.size > b.size ? 1 : -1));
console.log('2.1/ Taille +160cm (+tri par taille):', Filt160);

/*
 **
 ** 2°) afficher uniquement les gens ayant une taille supérieur à 1m60 et pesant moins de 80kg
 **
 */
let FiltS160W80 = users
  .filter((user) => user.size > 160 && user.weight < 80)
  .sort((a, b) => (a.weight > b.weight ? 1 : -1));
console.log('2.2/ Taille +160cm & Weight -80kg (+tri par poids):', FiltS160W80);

/*
 **
 ** 3°) afficher uniquement les gens nés après le 15 janvier 1984
 **
 */
// let Filt1984 = users.filter(user=> user.dateOfBirth.toDateString() > 'Sun Jan 15 1984')
// .sort((a,b)=> a.dateOfBirth > b.dateOfBirth ? 1 : -1);
console.log(
  'DateString (solution éronée):',
  users.map((user) => user.dateOfBirth.toDateString())
);

let Filt1984 = users
  .filter((user) => user.dateOfBirth > new Date('1984-01-15'))
  .sort((a, b) => (a.dateOfBirth > b.dateOfBirth ? 1 : -1));
console.log('2.3/ Né après 15/01/1984', Filt1984);

/*
 **
 ** 4°) afficher uniquement les 20 dernières personnes de la liste
 **
 */

console.log('liste users:', users);
let FiltLast20 = users.slice(-20);
console.log('2.4/ Last 20 :', FiltLast20);

// troisème étape, la transformation de données

/*
 **
 ** 1°) créer une nouvelle liste ne comprenant que le nom et le prénom
 **
 */
let MapNP = users.map((user) => user.name + ' ' + user.firstName);
console.log('3.1/ Liste des Noms & Prenoms :', MapNP);

/*
**
** 2°) créer une nouvelle liste contenant que les gens de plus d'1m84 et sous le format nom, prenom, age (et non pas date de naissance)
Cela correspondra à l'interface 'shortDescription' écrite dans le fichier interface.ts
**
*/

// function randomShortDesc() : shortDescription[]{
// let shortDescUser = users.map((user) => users.push({
//   name: user.name,
//   firstName: user.firstName,
//   //age: user.dateOfBirth.getFullYear(),
// })
// )

//   return shortDescUser;
// }

function getAge(user : Person){
  
// let age = users.map((user) => new Date().getFullYear() - user.dateOfBirth.getFullYear())
let year = new Date().getFullYear() - user.dateOfBirth.getFullYear();
let month = new Date().getMonth() - user.dateOfBirth.getMonth();
let day = new Date().getDay() - user.dateOfBirth.getDay();

let age = year + month + day;

console.log('age :', age)

  return age;
}

getAge(user);

let Map184cm = users.map((user => user.name +' '+ user.firstName +' '+ user))

/*
 **
 ** 3°) créer une nouvelle liste suivant l'interface 'longDescription' permettant de transformer la 'size' en un string de la forme "1m22" pour un number comme "122"
 **
 */

/*
 **
 ** 4°) créer une nouvelle liste suivant l'interface 'completeDescription'
 **
 */

// Maintenant les petites fonctions amusantes que tu aimes tant :D

// Détecter si des personnes dans la liste ont + de 70 ans et retourner le nombre de personne trouvées

// Détecter si des personnes dans la liste ont une taille comprise entre 1m60 et 1m80 et retourner le poids de ses personnes dans un ordre ascendant

// Détecter si des personnes dans la liste ont le même nom et retourner les noms en doublon

// Détecter si des personnes dans la liste ont le même prénom et retourner les prénoms en doublon

// Détecter si la liste présente une homonymie ou non ( pour rappel, une homonymie est deux personnes différentes mais ayant le même nom et prénom )
