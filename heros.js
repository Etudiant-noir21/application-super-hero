const tokenAcce= '28cb2a36a12863ba696cf072ec26972f'
const apiUrl= 'https://superheroapi.com/api/'

const donnesJson = [
    {
        "response": "success",
        "id": "70",
        "name": "Batman",
        "powerstats": {
            "intelligence": "100",
            "strength": "26",
            "speed": "27",
            "durability": "50",
            "power": "47",
            "combat": "100"
        },
        "biography": {
            "full-name": "Bruce Wayne",
            "alter-egos": "No alter egos found.",
            "aliases": [
            "Insider",
            "Matches Malone"
            ],
            "place-of-birth": "Crest Hill, Bristol Township; Gotham County",
            "first-appearance": "Detective Comics #27",
            "publisher": "DC Comics",
            "alignment": "good"
        },
        "appearance": {
            "gender": "Male",
            "race": "Human",
            "height": [
            "6'2",
            "188 cm"
            ],
            "weight": [
            "210 lb",
            "95 kg"
            ],
            "eye-color": "blue",
            "hair-color": "black"
        },
        "work": {
            "occupation": "Businessman",
            "base": "Batcave, Stately Wayne Manor, Gotham City; Hall of Justice, Justice League Watchtower"
        },
        "connections": {
            "group-affiliation": "Batman Family, Batman Incorporated, Justice League, Outsiders, Wayne Enterprises, Club of Heroes, formerly White Lantern Corps, Sinestro Corps",
            "relatives": "Damian Wayne (son), Dick Grayson (adopted son), Tim Drake (adopted son), Jason Todd (adopted son), Cassandra Cain (adopted ward)\nMartha Wayne (mother, deceased), Thomas Wayne (father, deceased), Alfred Pennyworth (former guardian), Roderick Kane (grandfather, deceased), Elizabeth Kane (grandmother, deceased), Nathan Kane (uncle, deceased), Simon Hurt (ancestor), Wayne Family"
        },
        "image": {
            "url": "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"
        }
        }
        
]

const inputHero = document.getElementById('inputHero')
console.log(inputHero);

const btnSearch = document.getElementById('btnSearch')
console.log(btnSearch);
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const img = document.querySelector('.img-fluid')
console.log(img);



const caractere = document.querySelectorAll('.caractere')
console.log(caractere);



btnSearch.addEventListener('click',(e)=>{
    e.preventDefault()
    superHero(inputHero.value.trim())
    inputHero.value = ''
})


 function superHero(hero) {
    try{
        fetch(`${proxyUrl}${apiUrl}${tokenAcce}/search/${hero}`,{
            method: "GET",
            redirect: "follow"
        })
        .then(response=> {
            if(!response.ok){
                alert("Vous avez un probleme de connexion")
                throw new Error("Erreur probleme de connexion ", response)
            }
            return response.json()
        }).then(data=>{
            if(!data.results || data.results.length ===0){
                alert('aucun super hero trouver ,Entrer un nom de super Hero valide')
            }else if(hero.trim().toLowerCase() !== data.results[0].name.toLowerCase()){
                alert('Entrer un nom valide');
                
            }else{
                img.src = data.results[0].image.url
                caractere[0].innerHTML= data.results[0].name
                caractere[1].innerHTML= data.results[0].powerstats.intelligence + '%'
                caractere[2].innerHTML= data.results[0].powerstats.strength
                caractere[3].innerHTML= data.results[0].powerstats.speed + ' km/h'
                caractere[4].innerHTML= data.results[0].powerstats.power + ' %'
                caractere[5].innerHTML= data.results[0].powerstats.combat
                caractere[6].innerHTML= data.results[0].appearance.gender
                caractere[7].innerHTML= data.results[0].appearance.height[1] 
                caractere[8].innerHTML= data.results[0].appearance.weight[1] 
                caractere[9].innerHTML= data.results[0].biography.aliases[1]
                caractere[10].innerHTML= data.results[0].biography["full-name"]
            }
            
        })
    }catch(err){
        console.error("Erreur :" + err.message);
        
    }
}
const heroNames = [
    "Batman", "Spider-Man", "Iron Man", 
 "Hulk", "Wonder Woman", "Black Widow", "Wolverine", 
    "Deadpool","Cyborg","Nightwing","Captain Marvel",
    "Black Panther","Doctor Strange","Ant-Man"
  ];
const listeSugg = document.getElementById('listeSugg')
inputHero.addEventListener('input',(e)=>{
    console.log(e.target.value);
    const suggestion = e.target.value.toLowerCase().trim()
    if(!suggestion){
     listeSugg.innerHTML = ''
     return
    }

    const fitterHeroes = heroNames.filter(name=>{
      name.toLocaleLowerCase().includes(suggestion)
    })
    
    showSuggestions(fitterHeroes)
    
})

    function showSuggestions(heroes) {
        listeSugg.innerHTML=''
      
        heroNames.forEach(hero => {
          const li = document.createElement('li');
          li.textContent = hero;

          li.addEventListener('click', () => {
            inputHero.value = hero; 
            listeSugg.innerHTML=''
          });
      
          listeSugg.appendChild(li);
        });
      }
