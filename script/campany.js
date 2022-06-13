const parsedUrl = new URL(window.location.href);
const companySymbol = parsedUrl.searchParams.get("symbol");
const baseUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3`;
const companyUrl = `${baseUrl}/company/profile/${companySymbol}`;
const historyUrl = `${baseUrl}/historical-price-full/${companySymbol}?serietype=line`;
//HIDE LOADER
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
//HIDE LOADER
function hideloader1() {
    document.getElementById('loading1').style.display = 'none';
}
//GET API
async function getapi(url) {
    const response = await fetch(url);
    let data = await response.json();
    if (response) {
        hideloader();
    }
    show(data);
}
getapi(companyUrl);

// DISPLAY DATA
function show(data) {
    let h = data.profile;
    let perc = h.changesPercentage;
    let content = `
    <div class="contentContainer">
    <div class="name-img">
    <img src='${h.image}'>
    <div class="nameIndustry">
    <div class="companyName">${h.companyName}</div>
    <div class="companyIndustry">(${h.industry})</div>
    </div>
    </div>
    <div class="symbol-price"> 
    <div class="companyPrice">Stock price: $ ${h.price}</div>
    <div id="x" class="companyPercent"> (${perc}%)</div>
    </div>
    </div>
    <div class="companyDescription">${h.description}</div>
`
    document.getElementById("info").innerHTML = content;
    if (perc <= 0) {
        document.getElementById("x").style.color = "red";
    } else {
        document.getElementById("x").style.color = "yellowgreen";
    }

}

//Chart
const xdates = [];
const xclose = [];
chartIt();
async function chartIt() {
    await getHistory();
    const data = {
        labels: xdates,
        datasets: [{
            label: 'Stock price',
            backgroundColor: 'rgb(0, 0, 255)',
            borderColor: 'rgb(128, 128, 255)',
            data: xclose,
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {},
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}
// GET HISTORY
async function getHistory() {
    const response = await fetch(historyUrl);
    const data = await response.json();
    if (response) {
        hideloader1();
    }
    const x = data.historical;
    x.forEach((el) => {
        const day = el.date;
        xdates.push(day);
        const close = el.close;
        xclose.push(close)
    });
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