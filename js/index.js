
// Configurar service_worker
let sw_location = "https://fonsecafuentes.github.io/service_worker.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(sw_location)
        .then(function (registration) {
            console.log('Service Worker registered: ', registration);
        })
        .catch(function (err) {
            console.log('Service Worker registration failed: ', err);
        });
}



let style = document.documentElement.style;
let bloque = document.querySelectorAll('.bloque');
let h2 = document.querySelectorAll('.h2');
let theme = document.querySelector('.theme');
let img_user = document.querySelector('.img');
let name_user = document.querySelector('.name');
let job_user = document.querySelector('.job');
let data_user = document.querySelector('.datos');
let words_user = document.querySelector('.words');
let experiences = document.querySelector('.contenido_1');
let educations = document.querySelector('.contenido_2');
let skills = document.querySelector('.contenido_3');

//creamos un acordeon
h2.forEach ((cada_h2, i)=>{
    h2[i].addEventListener('click', ()=>{

        bloque[i].classList.toggle('activo');
    });
});


//Cambio thema 
theme.onclick = function(){
    theme.classList.toggle('activo');
    if(style.getPropertyValue('--body')=='#90ADC6'){
        style.setProperty('--body', '#C3E0E5');
        style.setProperty('--footer_header','#333652');
    }else{
        style.setProperty('--body', '#90ADC6');
        style.setProperty('--footer_header','#274472');
    }
};

//Consumo api Rest https://randomuser.me
const list_user = async() =>{
    const response = await fetch("https://randomuser.me/api?inc=name,email,location,cell,picture");
    const data = await response.json();
    let user_data = data.results[0];
    
    img_user.innerHTML += 
    `<img src="${user_data.picture.large}" alt="Imagen_Perfil">`;
    
    name_user.innerHTML += 
    `<h1>${user_data.name.first}</h1>
     <h1>${user_data.name.last}</h1>`;
    
    data_user.innerHTML +=
    `<p>País: ${user_data.location.country}</p>
     <p>Ciudad: ${user_data.location.city}</p>
     <p>Direción: ${user_data.location.street.name} ${user_data.location.street.number}</p>
     <p>Teléfono: ${user_data.cell}</p>
     <p>Email: ${user_data.email}</p>`;
}

//Consumo de JSON en local
const load_data_user = async()=>{
    const response = await fetch('./json/data_user.json');
    const data = await response.json();
    let other_data = data[0];
    
    job_user.innerHTML += 
    `<h2>${other_data.job}</h2>`;

    words_user.innerHTML += 
    `<p>${other_data.words}</p>`;

    experiences.innerHTML +=
    `<li>${other_data.company[0]}</li>
     <li>${other_data.company[1]}</li>
     <li>${other_data.company[2]}</li>
     <li>${other_data.company[3]}</li>
     <li>${other_data.company[4]}</li>
     <li>${other_data.company[5]}</li>`;

    educations.innerHTML +=
    `<li>${other_data.university[0]}</li>
     <li>${other_data.university[1]}</li>
     <li>${other_data.university[2]}</li>
     <li>${other_data.university[3]}</li>`;

    skills.innerHTML +=
    `<li>${other_data.skill[0]}</li>
     <li>${other_data.skill[1]}</li>
     <li>${other_data.skill[2]}</li>
     <li>${other_data.skill[3]}</li>
     <li>${other_data.skill[4]}</li>`;
};

window.addEventListener("load", function(){
    list_user();
    load_data_user();
});
