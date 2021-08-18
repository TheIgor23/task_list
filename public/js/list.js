export function list(){
const items = document.querySelector('.list-group');

const newTitle = document.querySelector('.add-text');
const AddBtn = document.querySelector('.add-button');

function OnClick({target}){
    const class_names = target.classList;
   
    switch (true) {
        case class_names.contains('rm-btn'):
            OnRemoveBtnClick(target);
            break;
        case class_names.contains('edit-btn'):
            OnEditBtnClick(target);
            break;
        case class_names.contains('item-check'):
            OnCompleteCheckClick(target);
            break;
        default:
            break;
    }
    localStorage.setItem("items", items.innerHTML);
   
}

function CreateElement(tag, prop, ...children){
    const el = document.createElement(tag);

    for(const key in prop){
        el[key] = prop[key];
    }

    children.forEach(child=>{
        el.appendChild(child);
    })
    return el;
}



function OnAddBtnClick(){
    


    if(newTitle.value.isEmpty()){
        alert("Error. Enter task!");
        return;
    }

    var utc = new Date().toJSON().slice(0, 10).split('-').reverse().join('.');

    const checkBox = CreateElement('input', {type: 'checkbox', classList: 'item-check'});
    const Title = CreateElement('label', {innerText: newTitle.value, classList: 'item-text'});

    const date_label = CreateElement('label', {innerText: utc, classList: 'item-date me-auto'});
    const text_edit = CreateElement('input', {type: 'text', classList: 'textfield'});
    
    const date_set = CreateElement('input', {type: 'date', classList: 'item-date-set', value: new Date().toJSON().slice(0, 10)});
    const edit_btn = CreateElement('button', {classList: 'edit-btn', innerHTML: '<ion-icon name="create-outline"></ion-icon>'});
    const remove_btn = CreateElement('button', {classList: 'rm-btn', innerHTML: '<ion-icon name="trash-outline"></ion-icon>'});
    
    const newItem = CreateElement('li', {classList: 'list-group-item d-flex justify-content-evenly flex-wrap'},
    checkBox, Title, date_label ,date_set,text_edit,edit_btn,remove_btn);
    items.appendChild(newItem);
    
    newTitle.value = '';

    localStorage.setItem("items", items.innerHTML);
}


function OnRemoveBtnClick(target){
    target.parentNode.parentNode.removeChild(target.parentNode);
}

function OnCompleteCheckClick(target){
    const item = target.parentNode;

    if(target.checked)
        target.setAttribute('checked','');
    else 
        target.removeAttribute('checked')
    item.classList.toggle('complete');
    
}

function OnEditBtnClick(target){

    const item = target.parentNode;
    
    const edit_btn = item.querySelector('.edit-btn');
    const text_edit = item.querySelector('.textfield');
    const date_set = item.querySelector('.item-date-set');
    
    if(!text_edit.classList.toggle('editing')){
        date_set.classList.toggle('editing');
        if(!text_edit.value.isEmpty()){
            item.querySelector('.item-text').innerHTML = text_edit.value;
           
        }
        if(!date_set.value.isEmpty()){
            item.querySelector('.item-date').innerHTML = date_set.value.split('-').reverse().join('.');
        }
        text_edit.value ='';
        edit_btn.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
    }
    else{
       edit_btn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon>';
       date_set.classList.toggle('editing');
    }   
}

AddBtn.addEventListener('click', OnAddBtnClick);
items.addEventListener('click', OnClick);
newTitle.addEventListener('keyup', event =>{
    if(event.keyCode === 13){
        event.preventDefault();
        OnAddBtnClick();
    }
})
};
