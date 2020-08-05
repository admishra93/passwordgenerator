// Check if at least one checkbox is checked
var checkboxes = document.querySelectorAll('input[type="checkbox"]')
var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked)


// Array of characters for the password
var upLet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var lowLet = "abcdefghijklmnopqrstuvwxyz"
var nums = "0123456789"
var symbs = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
var allChars = [upLet, lowLet, nums, symbs]

// Calling the buttons
var generateB = document.getElementById("generate")
var copyB = document.getElementById("copy")

// Checking which boxes are ticked
var upper = document.getElementById("uppercase").checked
var lower = document.getElementById("lowercase").checked
var numb = document.getElementById("numbers").checked
var symb = document.getElementById("symbols").checked
var checked = [upper, lower, numb, symb]

// DEBUG: Checking to see if called my boxes right
// function checkBox(event) {

//     event.preventDefault()
//     upper = document.getElementById("uppercase").checked
//     lower = document.getElementById("lowercase").checked
//     numb = document.getElementById("numbers").checked
//     symb = document.getElementById("symbols").checked
//     checked = [upper, lower, numb, symb]

//     checked.forEach(function(bool, i) {

//         alert(allChars[i] + " " + bool)

//     })

// }
// var checkB = document.getElementById("check")
// checkB.addEventListener("click", checkBox)

// Method for generating a random number between 0 and max
function getRandomInt(max) {

    return Math.floor(Math.random() * Math.floor(max));

}

// Generates the character set to be used for the password based on user selected options
function charSetMake() {

    upper = document.getElementById("uppercase").checked
    lower = document.getElementById("lowercase").checked
    numb = document.getElementById("numbers").checked
    symb = document.getElementById("symbols").checked
    checked = [upper, lower, numb, symb]
    var charSet = [] 

    checked.forEach(function(bool, i){

        if (bool) {

            charSet.push(allChars[i])

            }
        
        }
    )
    
    return charSet

}

// DEBUG: See if my charset is being made correctly
// function charSetMakeCall(event){

//     event.preventDefault()
//     console.log(charSetMake())

// }
// var chars = document.getElementById("chars")
// chars.addEventListener("click", charSetMakeCall)

//Set the current password to the generated password and add it to the list of passwords
function append(pass) {

    var passStore = document.getElementById("passStore")
    store = document.getElementById("passStore")
    var newPass = document.createElement("li")
    newPass.innerHTML = pass
    passStore.append(newPass)
    
    var space = document.createElement("li")
    space.innerHTML = "<br>"
    passStore.append(space)

    document.getElementById("currPass").textContent = pass

}

//Function used to copy the password to the clipboard
function copyPass() {

    var copyText = document.getElementById("currPass");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert("Copied the password to clipboard")

  }

// The function that will generate the passsword
function createPassword() {

    checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked)
    var chars = charSetMake()
    var charAccess = chars.length
    var password = ""
    var length = document.getElementById("length").value

// Iterates through chosen character sets randomly and adds to password
    for (i = 0; i < length; i++) {

        var locat = chars[getRandomInt(charAccess)]
        var character = locat[getRandomInt(locat.length)]
        password = password.concat(character)

    }

    return password

}

//Verifies the password matches the requirements using regular expression
//Regular expression is built based on what options the user has chosen
function verifyPass(pass) {

    upper = document.getElementById("uppercase").checked
    lower = document.getElementById("lowercase").checked
    numb = document.getElementById("numbers").checked
    symb = document.getElementById("symbols").checked
    checked = [upper, lower, numb, symb]

    //What is toBuild?
    //When you make a new RegExp, it initializes with a default value which ended up always failing my password
    //To get around that, the first time the forEach loop hits an option that is checked, that is set as the regex to build off of
    var toBuild = 0
    var regEx = new RegExp
    var regUp = /(?=.*[A-Z])/
    var regLow = /(?=.*[a-z])/
    var regNum = /(?=.*\d)/
    var regSpec = /(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/
    var regCont = [regUp, regLow, regNum, regSpec]

    checked.forEach(function(bool, i){

        if (bool) {

            if (toBuild === 0) {

                toBuild++
                regEx = new RegExp(regCont[i].source)

            }

            else {
                
                regEx = new RegExp(regEx.source + regCont[i].source)

            }

        }
        
        }

    )

    return regEx.test(pass)

}


//Function to actually generate the password on click
function givePass(event) {

    event.preventDefault()

    // Ensures at least one option is chosen
    checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked)
    if (checkedOne !== true) {

        alert("Please select at least one option.")
        return

    }

    var pass = createPassword()
    var verify = verifyPass(pass)
    var length = document.getElementById("length").value

    //Ensures a valid length is used
    if (length < 8 || length > 128) {

        alert("Please enter a valid length.")
        return

    }

    while (!verify) {

        pass = createPassword()
        verify = verifyPass(pass)

    }

    append(pass)

}

copyB.addEventListener("click", copyPass)
generateB.addEventListener("click", givePass)
