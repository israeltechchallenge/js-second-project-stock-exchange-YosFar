const clickBtn = document.getElementById("searchBtn");
const valueInput = document.getElementById("searchbarInput");
document.getElementById("beforeTitle").style.visibility = "visible";
document.getElementById("afterTitle").style.visibility = "hidden";

async function searchFunc() {
    loader.classList.add('spinner-border');
    let searchContent = new FetchUrl(`/search?query=${valueInput.value}&limit=10&exchange=NASDAQ`);
    const data = await searchContent.getData();
    let list = "";
    data.forEach(getValue);
    async function getValue(value) {
        let url = `${baseUrl}/company/profile/${value.symbol}`;
        let extraResponse = await fetch(url);
        let extraData = await extraResponse.json();
        let profile = extraData.profile;
        list +=
            `<a href="/company.html?symbol= ${extraData.symbol}"><img src="${profile.image}" alt='${profile.companyName}'> <div>${profile.companyName} (${extraData.symbol})</div><div>${profile.changes}%</div> `;
        document.getElementById("results").innerHTML = list;
        loader.classList.remove('spinner-border');
    }
    document.getElementById("beforeTitle").style.visibility = "hidden";
    document.getElementById("afterTitle").style.visibility = "visible";

}