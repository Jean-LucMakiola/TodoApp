const dotMenu = document.querySelector('.category_menu');
const popupMenu = document.getElementById('category_menu_popup');

 popupMenu.classList.toggle('open');
dotMenu.addEventListener('click', ()=>{
    console.log(popupMenu);
    popupMenu.classList.toggle('open');
})

