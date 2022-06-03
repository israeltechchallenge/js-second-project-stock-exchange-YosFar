let getValueInput = () => {
    const inputValue = document.getElementById("searchbarInput").value;
    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ`;
    document.getElementById('loader').classList.add('spinner-border');

    fetch(searchUrl)
        .then(response => { return response.json() })
        .then(data => {
            let txt = "";
            data.forEach(getValue);
            document.getElementById("searchbarList").innerHTML = txt;
            document.getElementById('loader').classList.remove('spinner-border');


            function getValue(value) {
                txt += `<a href="/company.html?symbol=${value.symbol}">${value.name} (${value.symbol})</a>` + "<br>"

                console.log(value.name);
            }


        })

}