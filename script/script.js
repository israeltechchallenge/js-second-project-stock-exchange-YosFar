let getValueInput = async() => {
    const valueInput = document.getElementById("searchbarInput");
    const searchResultList = document.getElementById("searchResultList");
    const loader = document.getElementById('loader')

    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${valueInput.value}&limit=10&exchange=NASDAQ`;

    loader.classList.add('spinner-border');
    let response = await fetch(searchUrl);
    let data = await response.json();
    data.forEach(async(company) => {
        let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${company.symbol}`;
        let extraResponse = await fetch(url);
        let extraData = await extraResponse.json();
        let profile = extraData.profile;
        let listItem = document.createElement('li');
        let itemImg = document.createElement('img');
        itemImg.src = profile.image;
        itemImg.alt = profile.companyName;
        let itemSpan = document.createElement('span');
        itemSpan.textContent = `${profile.companyName} (${extraData.symbol})  $ ${profile.price}`
        let changeSpan = document.createElement('span');
        changeSpan.textContent = ` ${profile.changesPercentage}`;
        changeSpan.classList.add(extraData.profile.changes > 0 ? 'greenClass' : 'redClass');
        let symbolLink = document.createElement('a');
        symbolLink.href = `/company.html?symbol=${extraData.symbol}`;
        symbolLink.textContent = `Learn more `;

        listItem.append(itemImg, itemSpan, changeSpan, symbolLink);
        searchResultList.append(listItem);

    });

    loader.classList.remove('spinner-border');
}