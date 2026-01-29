let base_URL = "https://api.frankfurter.app/latest?";
let flag_URL = "https://flagsapi.com/";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateFlag(fromCurr);
    updateFlag(toCurr);
})

for(let select of dropdowns){
    for(let currCode in currency){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = true;
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];
    
    let newSrc = `${flag_URL}${countryCode}/flat/64.png`;
    
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

async function updateExchangeRate(){
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;

    let from = fromCurr.value;
    let to = toCurr.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${base_URL}from=${from}&to=${to}`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data.rates[to];
    
    let answer = (amtVal * exchangeRate).toFixed(2);
    let message = amtVal + " " + from + " = " + answer + " " + to;
    msg.innerText = message;

}