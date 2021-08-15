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

    const checkBox = CreateElement('input', {type: 'checkbox', classList: 'item-check'});
    const Title = CreateElement('label', {innerText: newTitle.value, classList: 'item-text'});
    const text_edit = CreateElement('input', {type: 'text', classList: 'textfield ms-auto'});
    const edit_btn = CreateElement('button', {classList: 'edit-btn', innerHTML: '<ion-icon name="create-outline"></ion-icon>'});
    const remove_btn = CreateElement('button', {classList: 'rm-btn', innerHTML: '<ion-icon name="trash-outline"></ion-icon>'});
    
    const newItem = CreateElement('li', {classList: 'list-group-item d-flex justify-content-between flex-wrap'},
    checkBox, Title, text_edit,edit_btn,remove_btn);
    items.appendChild(newItem);
    
    newTitle.value = '';
}


function OnRemoveBtnClick(target){
    target.parentNode.parentNode.removeChild(target.parentNode);
}

function OnCompleteCheckClick(target){
    const item = target.parentNode;
    if(item.classList.contains('complete')){
        item.classList.remove('complete');
    }else{
        item.classList.add('complete');
    }
}

function OnEditBtnClick(target){
    const item = target.parentNode;
    
    const edit_btn = item.querySelector('.edit-btn');
    const text_edit = item.querySelector('.textfield');
    
    if(!text_edit.classList.toggle('editing')){
        if(!text_edit.value.isEmpty()){
            item.querySelector('.item-text').innerHTML = text_edit.value;
        }
        text_edit.value ='';
        edit_btn.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
    }
    else{
       edit_btn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon>';
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
