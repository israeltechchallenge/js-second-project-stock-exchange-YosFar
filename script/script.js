//declaration of global variables ans atriniutes
const baseUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3';
document.getElementById("beforeTitle").style.visibility = "visible";
document.getElementById("afterTitle").style.visibility = "hidden";
//get input value + search in data and display result
let getValueInput = async() => {
        const valueInput = document.getElementById("searchbarInput");
        const loader = document.getElementById('loader');
        const searchUrl = `${baseUrl}/search?query=${valueInput.value}&limit=10&exchange=NASDAQ`;

        loader.classList.add('spinner-border');

        let response = await fetch(searchUrl);
        let data = await response.json();
        let list = "";
        data.forEach(getValue);
        async function getValue(value) {
            let url = `${baseUrl}/company/profile/${value.symbol}`;
            let extraResponse = await fetch(url);
            let extraData = await extraResponse.json();
            let profile = extraData.profile;
            let greenRed = (num) => {
                if (num <= 0) {
                    document.getElementById("x").style.color = 'red';
                } else {
                    document.getElementById("x").style.color = 'greenYellow';
                }
                return num
            }
            list +=
                `<a href="/company.html?symbol= ${extraData.symbol}"><img src="${profile.image}" alt='${profile.companyName}'> <div>${profile.companyName} (${extraData.symbol})</div><div id="x">${profile.changes}%</div> `;
            document.getElementById("listContainer").innerHTML = list;
            greenRed(profile.changes);
        }
        document.getElementById("beforeTitle").style.visibility = "hidden";
        document.getElementById("afterTitle").style.visibility = "visible";
        loader.classList.remove('spinner-border');
    }
    //create marquee class
class Marquee {
    constructor(sign) {
        this.sign = sign;
    }
    async getData() {
        const response = await fetch(baseUrl + this.sign)
        const data = await response.json();
        return data;
    }
}
//call marquee class and display data
async function marqueeFunc() {
    let marqueeContent = new Marquee('/quotes/nasdaq');
    const data = await marqueeContent.getData();
    let marqueeList = "";
    data.forEach(getValueMarquee);
    async function getValueMarquee(e) {
        marqueeList += `<div>${e.symbol} <span>$${e.price}</span> </div>`;
    }
    document.getElementById("marquee").innerHTML = marqueeList;
}
marqueeFunc();