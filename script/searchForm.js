class Form {
    createTheForm() {
        let htmlAll = `<div class="container">
        <div id="beforeTitle" class="what">What company stock are you looking for?</div>
         <div class="search-n-btn">
             <input id="searchbarInput" class="searchbarInput" type="text" placeholder="Search Company" />
             <button id="searchBtn" class="btn" onclick="searchFunc()">Search</button>
         </div>
         <div id="afterTitle" class="what">Here is a list of matches, click on a company to learn more!</div>
         <div id="listContainer" class="listContainer"></div>
         <div id="loader"></div>
     </div> `
        document.getElementById("form").innerHTML = htmlAll;
    }
}
let myForm = new Form();
myForm.createTheForm();




















/*
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
*/