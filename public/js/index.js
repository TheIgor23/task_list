import {list} from "./list.js";

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

window.addEventListener('DOMContentLoaded',()=> {
    list();
})

