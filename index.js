const searchPhone = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    searchField.value = '';

    if(searchText == ''){
        window.alert("Please write a phone name");
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
          .then(res => res.json())
          .then(res => displayResult(res.data));
    }
    
    
}
const displayResult = res => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    res.forEach(element => {
        // console.log(element);
        const div = document.createElement('div');
        div.classList.add('cal');
        div.innerHTML = `
        <div class="card h-100">
           <img src="${element.image}" class="card-img-top" alt="...">
           <div class="card-body">
              <h5 class="card-title">${element.phone_name}</h5>
              <h6 class="card-title">${element.slug}</h6>
              <p class="card-text">${element.brand}</p>
           </div>
           <button onclick="loadDetail('${element.slug}')" class="btn btn-light rounded-2">detail</button>
         </div>
        `;
        searchResult.appendChild(div);   
    });
}

const loadDetail = slug => {
    // console.log(slug);
    
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
      .then(res => res.json())
      .then(res => displayDetail(res));
    

}

const displayDetail = (res) => {
    // console.log(res.data.mainFeatures)
    const detailField = document.getElementById('product-detail');
    detailField.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card mx-auto p-3 mb-5" style="width: 40rem;">
       <img src="${res.data.image}" class="card-img-top" alt="...">
       <div class="card-body">
       <h3 class="card-title">${res.data.name}</h3>
       <p class="card-text"><b>Brand : </b>${res.data.brand}</p>
       <p class="card-text"><b>First release : </b>${res.data.releaseDate}</p>
       <p class="card-text"><b>Storage : </b>${res.data.mainFeatures.storage}</p>
       <p class="card-text"><b>Display size : </b>${res.data.mainFeatures.displaySize}</p>
       <p class="card-text"><b>Chip set : </b>${res.data.mainFeatures.chipSet}</p>
       <p class="card-text"><b>Memory : </b>${res.data.mainFeatures.memory}</p>
       <p class="card-text"><b>Sensors : </b>${res.data.mainFeatures.sensors}</p>
       </div>
    </div>
    `;
    detailField.appendChild(div);
   
}
