
// Configurar service_worker
let sw_location = "https://fonsecafuentes.github.io/fonseca.github.oi/service_worker.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(sw_location)
        .then(function (registration) {
            console.log('Service Worker registered: ', registration);
        })
        .catch(function (err) {
            console.log('Service Worker registration failed: ', err);
        });
}


//DOM elements
let style = document.documentElement.style;
let bloque = document.querySelectorAll('.bloque');
let h2 = document.querySelectorAll('.h2');
let theme = document.querySelector('.theme');

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
        style.setProperty('--footer_header','#274472');
    }else{
        style.setProperty('--body', '#90ADC6');
        style.setProperty('--footer_header','#333652');
    }
};

//Consumo api Rest https://randomuser.me
const list_user = async() =>{
    const response = await fetch("https://randomuser.me/api?inc=name,email,location,cell,picture");
    const data = await response.json();
    
    const user_data = data.results[0];
    
    let img_user = document.querySelector('.img');
    let name_user = document.querySelector('.name');
    let data_user = document.querySelector('.datos');

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
    
    const other_data = data[0];
    
    let job_user = document.querySelector('.job');
    let words_user = document.querySelector('.words');
    let experiences = document.querySelector('.contenido_1');
    let educations = document.querySelector('.contenido_2');

    job_user.innerHTML += 
    `<h2>${other_data.job}</h2>`;

    words_user.innerHTML += 
    `<p>${other_data.words}</p>`;
    
    for (var i = 0; i < other_data.company.length; i++){
        experiences.innerHTML += `<div>${other_data.company[i]}</div>`;
    }

    for (var i = 0; i < other_data.university.length; i++){
        educations.innerHTML += `<div>${other_data.university[i]}</div>`;
    }
};

// animación al scrollear con Intersection Observer
let bars = document.querySelector('.bloque_2');
let contact = document.querySelector('.contacto');

const load_skills = (tickets) => {
    tickets.forEach((ticket) => {
        console.log(ticket);
        if(ticket.isIntersecting){
            ticket.target.classList.add('visible');
        }
    });
}

const observers = new IntersectionObserver(load_skills, {
    root: null,
    rootMargin: "50px",
    threshold: 1.0
});

observers.observe(bars);
observers.observe(contact);

window.addEventListener("load", function(){
    list_user();
    load_data_user();
});

