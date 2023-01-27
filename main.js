document.addEventListener("DOMContentLoaded", function(_) {
    document.getElementById('minuteButton').addEventListener('click', addButtonClick)
    //document.getElementById('calorieButton').addEventListener('click', calorieButtonClick) //Optional 
    //document.getElementById('showAllButton').addEventListener('click', showAllButtonClick) //Optional
});

function Workout(exercise, minutes, calories) {
    this.exercise = exercise
    this.minutes = minutes
    this.calories = calories
}

const workoutArray = [] //Use this for the Array!

function addButtonClick() {          //I know this is might be overkill but I thought it was neat
    console.log('Add button clicked')

    //Radio Button Check! (Returns radioId on Success)
    const radioCheck = new Promise((resolve, reject) => { 

        document.querySelectorAll('input[name="exerPick"]').forEach(i => { //Iterating all input elements with name 'exerPick'
            if(i.checked) resolve(i.id)}) //Returns ID of checked
        reject("pick an exercise")

    }).catch()

    //Minute Input Check! (Returns minuteInput on Success)
    const minuteInputCheck = new Promise((resolve, reject) => {

        let input = parseInt(document.getElementById('minuteInput').value) 
        input >= 0 ? resolve(input) : reject("use a real number for minutes") /*Maybe add funny alert for 0?*/

    }).catch()

    //Promise Excecution & Object Creation/Push 
    Promise.all([ radioCheck, minuteInputCheck ]).then((values) => { //values = [ RadioId, Minutes ]

        let exercise = '', minutes = '', calories = ''

        values[0] === 'radio1' ?    (exercise = 'Sit Ups', minutes = values[1], calories = (minutes * 10)) : //First Button?
            values[0] === 'radio2' ?    (exercise = 'Push Ups', minutes = values[1], calories = (minutes * 15)) : //Second Button?
                                            (exercise = 'Jump Rope', minutes = values[1], calories = (minutes * 18)) //Third Button!

        workoutArray.push(new Workout(exercise, minutes, calories))
        console.log(workoutArray)
                
    }).catch((error) => {alert(`Please be sure to ${error}!`)}) //Custom Error, depending on faliure
    
}