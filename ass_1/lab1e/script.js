
let selected_id = null;

const sample_res ={}



const complete = async(x)=>{
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', `${x}`);
    encodedParams.set('language', 'en_US');

    const options = {
    method: 'POST',
    url: 'https://tourist-attraction.p.rapidapi.com/typeahead',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '269f8480a0mshd044a4a0fc5e9b0p1d4a43jsneb03cedadc85',
        'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
      },
    data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        let arr = Array(response.data.results.data);
        // arr = Array(sample_res.results.data);
        suggestionsList.innerHTML = '';
        arr[0].forEach(element => 
            
            {
            // console.log(`${element.result_object["name"]}: ${element.result_object["location_id"]}`)
            const li = document.createElement('li');
            li.dataset.locationId = element.result_object["location_id"];
            li.dataset.bannerURL = element.result_object.photo.images.large.url;
            li.dataset.description = element.result_object.description;
            li.textContent =`${element.result_object["name"]}` ;
            li.addEventListener("click",homepage);
            suggestionsList.appendChild(li);
          }
        
        );
    } catch (error) {
        console.error(error);
    }
}

const homepage = (event)=>{
    localStorage.setItem("bannerURL", event.target.dataset.bannerURL);
    localStorage.setItem("description", event.target.dataset.description);
    localStorage.setItem("name", event.target.textContent);
    window.location = `/home?q=${event.target.dataset.locationId}`
}
