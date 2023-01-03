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
    let bmrMale = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    let bmrFemale = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    if (gender.value === "Male" && activity.value === "light") {
        var calories = bmrMale * 1.375;
    }
    else if (gender.value === "Male" && activity.value === "moderate") {
        var calories = bmrMale * 1.55;
    }
    else if (gender.value === "Male" && activity.value === "active") {
        var calories = bmrMale * 1.725;
    }
    else if (gender.value === "Female" && activity.value === "light") {
        var calories = bmrFemale * 1.375;
    }
    else if (gender.value === "Female" && activity.value === "moderate") {
        var calories = bmrFemale * 1.55;
    }
    else if (gender.value === "Female" && activity.value === "active") {
        var calories = bmrFemale * 1.725;
    }
        console.log(data);
    
        var mealName = "";
        for(let i=0; i<3; i++){
            if(i==0){
             mealName = "BreakFast";
            }else if(i==1){
                mealName = "Lunch";  
            }else{
                mealName = "Dinner";
            }
        const newDiv = document.createElement('div');
        const htmlStr = `<div class="card" style="width: 18rem; margin: 40px;">
        <img class="card-img-top" src="./image/img10.${data.meals[i].imageType}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${mealName}</h5>
            <p class="card-text"><span style="font-weight: 600;">${data.meals[i].title}</span><br>calories : ${data.nutrients.calories}<br>
            </p>
            <a href="#" class="btn btn-primary" style="background-color: #f0754f; border: none;">Get Recipes</a>
        </div>
        </div>`;
        const newCart = document.getElementById('cart');
        newDiv.innerHTML = htmlStr;
        newCart.appendChild(newDiv);
        }
       
    }).catch((error)=>{
        console.log(error);
    })

}