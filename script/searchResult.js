/*1. Juntar nombre de empresa y simbolo enh 1 string.
2. Buscar en ese string los matches que hayan con el texto introducido en la búsqueda.
3. En el indice de los caractéres que hagan match debe partirse el string para crear un array,
 y meterse un <span class=hilight> adelante y un </span> atr'as.
Reuven Farchi
12:04 AM
El resultado es, ante la b'usqueda "tes", <span class=-"highlight">tes</span>la TSL */

const clickBtn = document.getElementById("searchBtn");
const valueInput = document.getElementById("searchbarInput");
const resultList = document.getElementById("results");
valueInput.addEventListener('keyup', async function(ev) {
    await searchFunc();
})
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
        let highlightedText = `<span class="highlight">${profile.companyName} (${extraData.symbol})</span>`;
        list +=
            `<a href="/company.html?symbol= ${extraData.symbol}" >
            <img src="${profile.image}" alt='${profile.companyName}'> 
            <div class="companyNameString">${highlightedText}</div>
            <div style="color:${profile.changes >= 0 ? 'greenyellow' : 'red'};">${profile.changes}%</div> `;
        resultList.innerHTML = list;
        loader.classList.remove('spinner-border');
    }
    document.getElementById("beforeTitle").style.visibility = "hidden";
    document.getElementById("afterTitle").style.visibility = "visible";
}