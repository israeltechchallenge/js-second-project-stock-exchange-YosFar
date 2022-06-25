const baseUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3';
class FetchUrl {
    constructor(sign) {
        this.sign = sign;
    }
    async getData() {
        const response = await fetch(baseUrl + this.sign)
        const data = await response.json();
        return data;
    }
}
async function marqueeFunc() {
    let marqueeContent = new FetchUrl('/quotes/nasdaq');
    const data = await marqueeContent.getData();
    let marqueeList = "";
    data.forEach(getValueMarquee);
    async function getValueMarquee(e) {
        marqueeList += `<div>${e.symbol} <span>$${e.price}</span> </div>`;
    }
    document.getElementById("marquee").innerHTML = marqueeList;
}
marqueeFunc();