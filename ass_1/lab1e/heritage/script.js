const searchParams = new URLSearchParams(window.location.search);

const resp= {};

let bnr = document.getElementById("banner");
let desc = document.getElementById("desc");
let title = document.getElementsByTagName("title")[0];

bnr.style.backgroundImage = `url("${localStorage.getItem("bannerURL")}")`;
title.textContent = `${localStorage.getItem("name")} Tourism`
document.body.innerHTML = document.body.innerHTML.replace(/Paris/g, localStorage.getItem("name"))


const wiki= async(event)=>{
    let n = event.currentTarget.dataset.name;
    window.location.href = `https://en.wikipedia.org/wiki/Special:Search?search=${n.replace(/ /g, "+")}&go=Go`
}

const get_list = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', `${searchParams.get("q")}`);
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '0');

    const options = {
        method: 'POST',
        url: 'https://tourist-attraction.p.rapidapi.com/search',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '269f8480a0mshd044a4a0fc5e9b0p1d4a43jsneb03cedadc85',
            'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
            },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        let arr = Array.from(response.data.results.data);
        // let arr = Array.from(resp.results.data);
        arr.forEach(element => {
if(element.description != "")
{
            let card = document.createElement("div");
            card.className = "card";
            let s = `<img src="${element.photo.images.medium.url}" alt=""> 
            <div class="desc">${element.description}</div>`
            card.innerHTML = s;
            card.dataset.name = element.name;
            card.addEventListener("click", wiki);
            document.getElementsByClassName("gallery")[0].appendChild(card);}
        });
    } catch (error) {
        console.error(error);
    }
}



get_list()


const redirect = (event) => {
    window.location = `/${event.target.dataset.to}?q=${searchParams.get("q")}`
}
Array.from(document.getElementsByTagName("a")).forEach(element => {
    element.addEventListener("click", redirect);
});
