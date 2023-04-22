const folderWrapper = document.getElementById('folder-holder');



function newFolder(){
    const folder = document.createElement('div');
    folder.appendChild(newFolderHeader());
    folder.classList.add('folder');
    folderWrapper.appendChild(folder);
}

function newFolderHeader(){
    const folderHeader = document.createElement('header');
    const para = document.createElement('p');
    para.innerHTML = 'name';
    para.setAttribute('contenteditable', 'true');
    const button = document.createElement('button');
    button.innerHTML = 'delete';
    button.setAttribute('onclick', 'deleteFolder()');

    folderHeader.appendChild(para);
    folderHeader.appendChild(button);   
    return folderHeader;
}
function newFolderContent(){

}

function deleteFolder(ele){
    const thisFolder = ele.parentElement;
    console.log(thisFolder);
    thisFolder.style.backgroundcolor = "red";
    //folderWrapper.remove(thisFolder);
}