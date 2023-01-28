document.addEventListener("DOMContentLoaded", function (_) {
    document.getElementById('minuteButton').addEventListener('click', minuteButtonClick)
    document.getElementById('calorieButton').addEventListener('click', mostBurnedButtonClick) //Optional 
    document.getElementById('showAllButton').addEventListener('click', showAllButtonClick) //Optional
});

function Workout(exercise, minutes, calories) {
    this.exercise = exercise
    this.minutes = minutes
    this.calories = calories
}

const workoutArray = [] //Use this for the Array!

//Radio Button Check
function radiocheck() {
    return new Promise((resolve, reject) => {
        document.querySelectorAll('input[name="exerPick"]').forEach(i => { //Iterating all input elements with name 'exerPick'
            if (i.checked) resolve(i.id)
        }) //Returns ID of checked
        reject("Pick an exercise!")       //Returns error if none
    })
}

//Minute Input Check
function minuteInputCheck() {
    return new Promise((resolve, reject) => {
        let input = parseInt(document.getElementById('minuteInput').value)
        input > 0 ? resolve(input) :                                                           //Returns minutes for legit integer
            reject(input === 0 ? "Don't be lazy!" : "Use a real number for minutes!") //Returns error for 0 or other
    })
}

//Minute Button Clicked/ Add Time
async function minuteButtonClick() {
    try {
        const radio = await radiocheck()
        const minute = await minuteInputCheck()

        radio === 'radio1' ? (exercise = 'Sit Ups', minute, caloriesPer = 10) : //First Button?
            radio === 'radio2' ? (exercise = 'Push Ups', minute, caloriesPer = 15) : //Second Button?
                (exercise = 'Jump Rope', minute, caloriesPer = 18)   //Third Button!

        workoutArray.push(new Workout(exercise, minute, caloriesPer * minute))
        console.log(workoutArray)


        //clear text box after submission
        document.getElementById("minuteInput").value = "";
        //clear radio buttons after submission
        document.getElementById("radio1").checked = false
        document.getElementById("radio2").checked = false
        document.getElementById("radio3").checked = false

    } catch (error) { alert(error) } //Custom Error, depending on faliure
}


// Most Burned Button Clicked
function mostBurnedButtonClick() {
    let mostBurned = 0;
    let winningIndex = 0;
    for (i = 0; i < workoutArray.length; i++) {
        if (workoutArray[i].calories > mostBurned) {
            winningIndex = i;
        }
    }
    document.getElementById("calorieOutput").value = workoutArray[winningIndex].exercise
}

//Show All Button Clicked
function showAllButtonClick() {
    let theList = document.getElementById("showAllOutput");
    theList.innerHTML = " ";
    workoutArray.forEach(function (element, i) {
        var list = document.createElement('li');
        list.innerHTML = "You did " + element.exercise + " for " + element.minutes + " minutes and burned " + element.calories + " calories!";
        theList.appendChild(list);
    })
}

