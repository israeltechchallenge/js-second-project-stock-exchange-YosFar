const parsedUrl = new URL(window.location.href);
const companySymbol = parsedUrl.searchParams.get("symbol");
const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`;
const historyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;
console.log(companySymbol);
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
    <div class="companyPercent"> (${h.changesPercentage})</div>
    </div>
    </div>
    <div class="companyDescription">${h.description}</div>
    
    `
    document.getElementById("info").innerHTML = content;
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
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        reverse: true
                    }
                }]
            }
        },
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