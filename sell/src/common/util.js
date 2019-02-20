export function urlParse(){
    let url = window.localStorage.search;
    let obj ={};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if(arr){
        arr.forEach(item => {
            let tempArr = item.substring(1).split("=");
            let key = tempArr[0];
            let val = tempArr[1];
        });
    }
}