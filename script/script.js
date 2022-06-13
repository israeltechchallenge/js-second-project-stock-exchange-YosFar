const baseUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3'
document.getElementById("beforeTitle").style.visibility = "visible";
document.getElementById("afterTitle").style.visibility = "hidden";
let getValueInput = async() => {
    const valueInput = document.getElementById("searchbarInput");
    const loader = document.getElementById('loader')
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
        list +=
            `<a href="/company.html?symbol= ${extraData.symbol}"><img src="${profile.image}" alt='${profile.companyName}'> <div>${profile.companyName} (${extraData.symbol})</div>${profile.changes}%`;
        document.getElementById("listContainer").innerHTML = list;
    }
    document.getElementById("beforeTitle").style.visibility = "hidden";
    document.getElementById("afterTitle").style.visibility = "visible";
    loader.classList.remove('spinner-border');

}

let marqueeFunc = async() => {
    const marqueeUrl = `${baseUrl}/quotes/nasdaq`;
    let marqueeResponse = await fetch(marqueeUrl);
    let marqueeData = await marqueeResponse.json();
    let marqueeList = "";
    marqueeData.forEach(getValueMarquee);
    async function getValueMarquee(mar) {
        marqueeList += `<div>${mar.symbol}  <span>$${mar.price}</span> </div>`;
    }
    document.getElementById("marquee").innerHTML = marqueeList;

}
marqueeFunc();