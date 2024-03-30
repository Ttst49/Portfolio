const divInfo = document.querySelector(".info")
const baseUrl = "https://matomo.thibautstachnick.com/?module=API"
let token = "&token_auth=e1d3e79c1331806c75c6d5340fc4d2b6"
let idSite = "&idSite=1"
let format = "&format=json"
let periodAndDate = "&period=year&date=lastYear"
let array = []

// fetch les donnees avec une methode donnée, une url et des donnees
async function getFetch(method ,url) {
        const response = await fetch(url, {
            method: method,
            redirect: "follow",
        });
        return response.json();
}


function getFetchWithOptionAndMethod(option,method){
    let url = baseUrl+"&method="+option+idSite+format+periodAndDate+token
    getFetch(method,url)
        .then(response=> response.forEach((data)=>{
            console.log(data)
            array.push(data)
        }))
    return array
}

getFetchWithOptionAndMethod("UserCountry.getCountry","GET")

function run(){
    array.forEach((element)=>{
        divInfo.innerHTML += element.label +" "+element.nb_visits + "<br>"
    })
}



setTimeout(()=>{run()},100)
