let searchElement = document.getElementById("searchInput");
let searchResultsElement = document.getElementById("searchResults");
let spinnerElement = document.getElementById("spinner");

function search_display_values(values) {
    let {
        description,
        link,
        title
    } = values;
    let listElement = document.createElement("div");
    listElement.classList.add("result-item");
    searchResultsElement.appendChild(listElement);

    let headingElement = document.createElement("a");
    headingElement.classList.add("result-title");
    headingElement.href = link;
    headingElement.textContent = title;
    headingElement.target = "_blank";
    listElement.appendChild(headingElement);

    let breakElement = document.createElement("br");
    listElement.appendChild(breakElement);

    let linkElement = document.createElement("a");
    linkElement.classList.add("result-url");
    linkElement.href = link;
    linkElement.textContent = link;
    linkElement.target = "_blank";
    listElement.appendChild(linkElement);

    breakElement = document.createElement("br");
    listElement.appendChild(breakElement);

    let descriptionElement = document.createElement("a");
    descriptionElement.classList.add("link-description");
    descriptionElement.textContent = description;
    listElement.appendChild(descriptionElement);

}


function display_results(search_results) {
    spinnerElement.classList.add("d-none");
    searchResultsElement.textContent = "";
    for (let each of search_results) {
        search_display_values(each);
    }
}

function searchElementFunc(event) {
    if (event.key === "Enter") {
        spinnerElement.classList.remove("d-none");
        let searchInputText = searchElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputText;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData)
                let {
                    search_results
                } = jsonData;
                display_results(search_results);
            });
    }
}

searchElement.addEventListener("keydown", searchElementFunc);