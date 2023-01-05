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
const form = document.getElementById("form");
const sub_btn = document.getElementById("submit-btn");
const newCard = document.getElementById('meals__container');
const recipe_container = document.getElementById("recipie__container");
const breakFast_img ="https://cdn6.projectmealplan.com/wp-content/uploads/2018/11/bacon-egg-breakfast-sandwiches-stacked-edit-257x257.jpg";
const lunch_img ="https://cdn5.projectmealplan.com/wp-content/uploads/2021/09/cashew-chicken-stir-fry-meal-prep-2021-containers-top-sq-217x217.jpg";
const dinner_img = "https://cdn4.projectmealplan.com/wp-content/uploads/2021/12/air-fryer-boneless-bbq-chicken-thighs-hero-top-217x217.jpg";
const link_img = [breakFast_img,lunch_img,dinner_img];

//api key
const apiKey ="2cd2da308f344968b58bb7de9aaa706b";
// https://api.spoonacular.com/mealplanner/generate?apiKey=2cd2da308f344968b58bb7de9aaa706b&timeFrame=day
//form validation
form.addEventListener("submit" ,generateMeal)
// calcutating BMR
async function calBMR(weight,height,age){
    let bmrMale = 66.47 + (13.75 * weight) + (5.003 *height) - (6.755 * age);
    let bmrFemale =  655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    if(gender.value ==="male" && activity.value==="Light"){
        let calories = bmrMale*1.375;
        console.log(calories);
    }
    else if(gender.value ==="male" && activity.value==="Moderate"){
        let calories = bmrMale*1.55;
        console.log(calories);
    }
    else if(gender.value ==="male" && activity.value==="Active"){
        let calories = bmrMale*1.725;
        console.log(calories);
    }
    else if(gender.value ==="Female" && activity.value==="Light"){
        let calories = bmrFemale*1.375;
        console.log(calories);
        
    }
    else if(gender.value ==="Female" && activity.value==="Moderate"){
        let calories = bmrFemale*1.55;
        console.log(calories);
    }
    else{
        let calories = bmrFemale*1.725;
        console.log(calories); 
    }
   
}
//generate the meals
function generateMeal(event){
    event.preventDefault();
    const url =`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day`;

    newCard.innerHTML="";

    fetch(url).then((response)=>response.json()).then((data)=>{
        console.log(data);
        console.log(link_img);
        var mealName = "";
        for(let i=0; i<3; i++){
            if(i==0){
             mealName = "BreakFast";
            }else if(i==1){
                mealName = "Lunch";  
            }else{
                mealName = "Dinner";
            }
        let newSec = document.createElement('section');
        const htmlStr = `<div class="card" style="width: 18rem; margin: 40px;">
        <img class="card-img-top" src="${link_img[i]}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${mealName}</h5>
            <p class="card-text"><span style="font-weight: 600;">${data.meals[i].title}</span><br>calories :<br>
            </p>
            <a href="#" class="btn btn-primary" style="background-color: #f0754f; border: none;" onclick="getRecipe(${data.meals[i].id})">Get Recipes</a>
        </div>
        </div>`;
     
        newSec.innerHTML = htmlStr;
        newCard.appendChild(newSec);
        }
       
    }).catch((error)=>{
        console.log(error);
    })

}


// function for fetch recipie
async function getRecipe(id){
    console.log(id);
    const recipie =`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`;
    fetch(recipie).then((response)=>response.json()).then((getMeal)=>{
        let newSec = document.createElement('section');
         const table_str =` <table class="table table-striped">
         <thead>
           <tr>
             <th scope="col"> Ingredients</th>
             <th scope="col">steps</th>
             <th scope="col">Equipment</th>
           </tr>
         </thead>
       </table>`
       newSec.innerHTML = table_str;
       recipe_container.appendChild(newSec);
        console.log(getMeal);
    }).catch((error)=>{
        console.log(error);
    })
}
