const loadPhones = (searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
   .then( res => res.json())
   .then(data => displayPhones(data.data, datalimit))
}
const displayPhones = (phones, datalimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

  
    // no phone found 
    const noPhone = document.getElementById('no-phone')
    if( phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    // show all button 
    const showAll = document.getElementById('show-all')
    if(datalimit && phones.length > 10){
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    for(const phone of phones){
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-success w-50 mx-auto" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
       
    }
    toggleSpinner(false)
}


const processSearch = (datalimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhones(searchText, datalimit);
    
}

document.getElementById('search-btn').addEventListener('click', function(){
   processSearch(10)
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      processSearch(10)
    }
});

const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner')
    if(isLoading){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}
// loadPhones('apple');


const phoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = detail => {
    console.log(detail)
    const PhoneTitle = document.getElementById('PhoneDetailModal');
    PhoneTitle.innerText = `${detail.name}`;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <img class="mt-4" src = "${detail.image}">
        <p>Release Date: ${detail.releaseDate ? detail.releaseDate: 'No information'}</p>
        <p>Display Size: ${ detail.mainFeatures ? detail.mainFeatures.displaySize : 'No Information' } </p>
        <p>Storage: ${detail.mainFeatures ? detail.mainFeatures.storage : 'No information'}</p>
    
    `
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})

