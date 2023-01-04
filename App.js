const bar = document.getElementById("bar");
const nav = document.getElementById("nav-bar");
const close = document.getElementById("close");

if (bar) {
    bar.addEventListener('click', ()=> {
       nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}
// create variable  
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const activity = document.getElementById("activity");
// const generateMealBtn = document.getElementById("btn");
// const box_1 = document.getElementsByClassName("box1");

// api key
const apiKey ="2cd2da308f344968b58bb7de9aaa706b";
//https://api.spoonacular.com/mealplanner/generate?apiKey=2cd2da308f344968b58bb7de9aaa706b&timeFrame=day
function generateMeal(event){

    const url =`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day`;

    fetch(url).then((response)=>response.json()).then((data)=>{
        console.log(data);
        console.log("hiii");
        var mealName = "";
        for(let i=0; i<3; i++){
            if(i==0){
             mealName = "BreakFast";
            }else if(i==1){
                mealName = "Lunch";  
            }else{
                mealName = "Dinner";
            }
        const newSec = document.createElement('section');
        const htmlStr = `<div class="card" style="width: 18rem; margin: 40px;">
        <img class="card-img-top" src="./image/img10.${data.meals[i].imageType}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${mealName}</h5>
            <p class="card-text"><span style="font-weight: 600;">${data.meals[i].title}</span><br>calories : ${data.nutrients.calories}<br>
            </p>
            <a href="#" class="btn btn-primary" style="background-color: #f0754f; border: none;">Get Recipes</a>
        </div>
        </div>`;
        const newCard = document.getElementById('meals__container');
        newSec.innerHTML = htmlStr;
        newCard.appendChild(newSec);
        }
       
    }).catch((error)=>{
        console.log(error);
    })

}