let style = document.documentElement.style;
let bloque = document.querySelectorAll('.bloque');
let h2 = document.querySelectorAll('.h2');

h2.forEach ((cada_h2, i)=>{
    h2[i].addEventListener('click', ()=>{

        bloque.forEach((cada_bloque, i)=>{
            bloque[i].classList.remove('activo');
        });
        bloque[i].classList.add('activo');
        
        switch (i) {
            case 0:
                style.setProperty('--height', '9em');
                break;
            case 1:
                style.setProperty('--height', '7.5em');
                break;
            case 2:
                style.setProperty('--height', '8em');
                break;
            default:
                break;
        }
    });
});

const switch_theme = () =>{
    if(style.getPropertyValue('--body')=='#C3E0E5'){
        style.setProperty('--body', '#90ADC6');
        style.setProperty('--footer_header','#333652');
    }else{
        style.setProperty('--body', '#C3E0E5');
        style.setProperty('--footer_header','#274472');
    }
};