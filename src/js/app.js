document.addEventListener('DOMContentLoaded',()=>{
    app();
});
function app(){
    btnMenu();
}

function btnMenu(){
    const btn = document.querySelector("#btn-menu");
    const body = document.querySelector('body');
    let contador = 0;
    btn.addEventListener('click',fijarBody,true);
    function fijarBody(){
        if(contador == 0){
            body.classList.add('fijar-body')
            contador=1;
        }else{
            body.classList.remove('fijar-body');
            contador = 0;
        }
    }

}