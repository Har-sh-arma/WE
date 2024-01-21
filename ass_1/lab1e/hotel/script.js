const searchParams = new URLSearchParams(window.location.search);

let bnr = document.getElementById("banner");
let desc = document.getElementById("desc");
let title = document.getElementsByTagName("title")[0];

bnr.style.backgroundImage = `url("${localStorage.getItem("bannerURL")}")`;
title.textContent = `${localStorage.getItem("name")} Tourism`
document.body.innerHTML = document.body.innerHTML.replace(/Paris/g, localStorage.getItem("name"))



const redirect = (event) => {
    window.location = `/${event.target.dataset.to}?q=${searchParams.get("q")}`
}
Array.from(document.getElementsByTagName("a")).forEach(element => {
    element.addEventListener("click", redirect);
});
