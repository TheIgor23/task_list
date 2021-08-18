import {list} from "./list.js";
import {storage} from "./localStorage.js"

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};


window.addEventListener('DOMContentLoaded',()=> {
    storage();
    list();
    
   

})

