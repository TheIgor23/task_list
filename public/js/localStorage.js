export function storage(){
    const items = document.querySelector('.list-group');
    items.innerHTML = localStorage.getItem("items");   

};