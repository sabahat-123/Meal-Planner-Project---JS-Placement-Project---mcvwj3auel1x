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
let bmrMale =0;
let bmrFemale=0;
let calories =0;
async function calBMR(){
const height = document.getElementById("height").value;
const weight = document.getElementById("weight").value;
const age = document.getElementById("age").value;
     bmrMale = 66.47 + (13.75 * weight) + (5.003 *height) - (6.755 * age);
     bmrFemale =  655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    if(gender.value =="male" && activity.value=="light"){
         calories = bmrMale*1.375;
        console.log(calories);
    }
    else if(gender.value =="male" && activity.value=="moderate"){
         calories = bmrMale*1.55;
        console.log(calories);
    }
    else if(gender.value =="male" && activity.value=="active"){
        calories = bmrMale*1.725;
        console.log(calories);
    }
    else if(gender.value =="female" && activity.value=="light"){
         calories = bmrFemale*1.375;
        console.log(calories);
        
    }
    else if(gender.value =="female" && activity.value=="moderate"){
        calories = bmrFemale*1.55;
        console.log(calories);
    }
    else{
        calories = bmrFemale*1.725;
        console.log(calories); 
    }
   
}

//generate the meals
function generateMeal(event){
    event.preventDefault();
    calBMR();
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
            <p class="card-text"><span style="font-weight: 600;">${data.meals[i].title}</span><br>calories :${calories.toFixed(0)}<br>
            </p>
            <a class="btn btn-primary" style="background-color: #f0754f; border: none;" onclick="getRecipe(${data.meals[i].id})">Get Recipes</a>
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
    recipe_container.innerHTML = "";
    const recipie =`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`;
    fetch(recipie).then((response)=>response.json()).then((getMeal)=>{
        const table= document.createElement("table");
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        const table_str =` 
            <th scope="col"> Ingredients</th>
            <th scope="col">steps</th>
            <th scope="col">Equipment</th>`;
            tr.innerHTML = table_str;
            thead.appendChild(tr);
            table.appendChild(thead);
            const recipe = getMeal.extendedIngredients;
            console.log(recipe);
            const tbody = document.createElement("tbody");
            recipe.forEach((e)=>{
              const tr = document.createElement("tr");
              const td1 = document.createElement("td");
              td1.classList.add("table_td");
              td1.innerHTML=e.name;
              tr.appendChild(td1);
              const td2 = document.createElement("td");
              tr.appendChild(td2);
              const td3 = document.createElement("td");
              td3.innerHTML=e.measures.metric.amount + e.measures.metric.unitShort;
              tr.appendChild(td3);
              tbody.appendChild(tr);
            })
            table.appendChild(tbody);
            recipe_container.appendChild(table);
            recipe_container.scrollIntoView({
                behavior :"smooth"
            })

    }).catch((error)=>{
        console.log(error);
    })
}


