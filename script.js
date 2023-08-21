const apiKey = "MLvY-1lZiNIY90n23C5DK-ZUyV4eol1IK-ksUpfoESg";

const formE = document.querySelector("form");
const Input = document.getElementById("input-part");
const searchResults = document.querySelector(".search-images");
const showmore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = Input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-image");
        
        const image = document.createElement("img");
        image.src = result.urls.small; // Fixed property name
        image.alt = result.alt_description;
        
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description; // Fixed property name

        imageLink.appendChild(image); // Fixed order of appending
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}

formE.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showmore.addEventListener("click", () => {
    searchImages();
});
