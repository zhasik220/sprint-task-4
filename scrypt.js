let users=[]
upDate()

console.table(users)


function createNewAccount(){

    let email=document.getElementById('emailInput')
    let password=document.getElementById('passwordInput')
    let fullName=document.getElementById('fullNameInput')
    let country=document.getElementById('countryInput')
    let birthdate=document.getElementById('birthdateInput')

    let norm=true;
    console.log(birthdate.value)
    let d=new Date(birthdate.value)

    if (email.value=="" || password.value=="" || fullName.value=="" || birthdate.value==""){
        norm=false
        alert("WRONG DATA\nCHECK YOUR DATA")
    }
    else if (!email.value.includes("@")){
        alert("email must include @")
        norm=false
    }
    else if (!((email.value.includes(".ru"))|| (email.value.includes(".com")))){
        alert("Emial must include .com or.ru ")
        norm=false
    }
    else if (checkEmailIsExist(email.value)){
        alert("This email already use")
        norm=false
    }
    else if (!(password.value.length>4)){
        alert("Password must consist 5 signs or more")
        norm=false
    }
    else if (d.getFullYear()<1955 || d.getFullYear()>2019){
        alert("WRONG BIRTHDATE DATA")
        norm=false
    }
    else if (containsNumbers(fullName.value)){
        alert("FULL NAME DOESN'T CONTAINS NUMBERS")
        norm=false
    }
    else if (fullName.value.trim().length<4){
        alert("VERY SHORT FULL NAME\nPLEASE WRITE YOUR SURNAME AND NAME")
        norm=false
    }




    
    if (norm==true){
        let user={
            "email":email.value,
            "password":password.value,
            "fullName":fullName.value,
            "country":country.value,
            "birthdate":birthdate.value
        }
        addUser(user)
        email.value=""
        password.value=""
        fullName.value=""
        country.selectedIndex = 0;
        birthdate.value=""
    }








}

function containsNumbers(str) {
    return /[0-9]/.test(str);
}

function checkEmailIsExist(email){
    for (let user of users) {
        if (user.email==email){
            return true
        }

    }
    return false
}


function login(){

    let success=false
    let email=document.getElementById('emailInput')
    let password=document.getElementById('passwordInput')
    let temporaryUser;
    for (let user of users) {
        if (user.email == email.value) {
            if (user.password == password.value) {
                temporaryUser=user
                success = true
                break;
            }
        }
    }
        if (success==true){
            toUserPage(temporaryUser)
        }
        else {
            alert("WRONG EMAIL OR PASSWORD")
        }




}


function upDate(){
    if (localStorage.users!=null){
        users=JSON.parse(localStorage.users)
    }
}


function addUser(user){
    users.push(user)
    localStorage.setItem("users",JSON.stringify(users))
}



function toSignIn(){
    let container=document.getElementById('container')
    let infoLists=document.querySelectorAll("div.info")
    infoLists.forEach(element=>element.remove())

    container.innerHTML=" <div class=\"info\">\n" +
        "    <div class=\"label_div first\">\n" +
        "      <label>EMAIL :</label>\n" +
        "    </div>\n" +
        "\n" +
        "    <div class=\"input_div\">\n" +
        "      <input type=\"text\" id='emailInput'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "  <div class=\"info\">\n" +
        "    <div class=\"label_div\">\n" +
        "      <label>PASSWORD :</label>\n" +
        "    </div>\n" +
        "    <div class=\"input_div\">\n" +
        "      <input type=\"text\" id='passwordInput'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "\n" +
        "  <div class=\"info button_div\">\n" +
        "    <button class=\"btn\" onclick=\"login()\">SIGN IN</button>\n" +
        "  </div>"
}

function toUserPage(user){
    let container=document.getElementById('container')
    let infoLists=document.querySelectorAll("div.info")
    infoLists.forEach(element=>element.remove())
    let firstLink=document.getElementById('firstLink')
    let secondLink=document.getElementById('secondLink')
    console.log(firstLink.text)
    console.log("URAA")
    console.log(firstLink)
    console.log(secondLink)
    firstLink.text =user.fullName
    firstLink.href="#"
    firstLink.onclick=null
    secondLink.text="Logout"
    secondLink.href="index.html"

    container.innerHTML="\n" +
        "\n" +
        "  <div class=\"infoTwo\">\n" +
        "    <h2>Welcome "+user.fullName+"</h2>\n" +
        "  </div>\n" +

        "  <div class=\"infoTwo\">\n" +
        "    <div class=\"label_div first\">\n" +
        "      <label>EMAIL :</label>\n" +
        "    </div>\n" +
        "\n" +

        "    <div class=\"input_div\">\n" +
        "      <h3 id=\"user_email\">"+user.email+"</h3>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "  <div class=\"infoTwo\">\n" +
        "    <div class=\"label_div\">\n" +
        "      <label>PASSWORD :</label>\n" +
        "    </div>\n" +
        "    <div class=\"input_div\">\n" +
        "      <h3 id=\"user_password\">"+user.password+"</h3>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "\n" +
        "  <div class=\"infoTwo\">\n" +
        "    <div class=\"label_div\">\n" +
        "      <label>FULL NAME :</label>\n" +
        "    </div>\n" +
        "    <div class=\"input_div\">\n" +
        "      <h3 id=\"user_fullName\">"+user.fullName+"</h3>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "\n" +
        "  <div class=\"infoTwo\">\n" +
        "    <div class=\"label_div\">\n" +
        "      <label>COUNTRY :</label>\n" +
        "    </div>\n" +
        "    <div class=\"input_div\">\n" +
        "      <h3 id=\"user_country\">"+user.country+"</h3>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "  <div class=\"infoTwo\">\n" +
        "    <div class=\"label_div\">\n" +
        "      <label>BIRTHDATE :</label>\n" +
        "    </div>\n" +
        "    <div class=\"input_div\">\n" +
        "      <h3 id=\"user_birthdate\">"+user.birthdate+"</h3>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n"




}

