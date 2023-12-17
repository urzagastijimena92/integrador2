export function volverArriba(){
    var volver = document.querySelector("#volver");

    window.onscroll = () => {
        if(window.scrollY >700){
            volver.classList.remove("volver-collapse")
        }else{
            volver.classList.add("volver-collapse")
        }
    }

}
