const folderWrapper = document.getElementsByClassName('folders');
function newFolder(){
    console.log('clicked')
    const folder = document.createElement('div');
    

    folder.appendChild(newFolderHeader());
    console.log(folder);

    folderWrapper.appendChild(folder);
    
    console.log(folderWrapper);
}
function newFolderHeader(){
    const folderHeader = document.createElement('header');
    const para = document.createElement('p');
    para.innerHTML = 'name';
    const button = document.createElement('button');
    button.innerHTML = 'delete';

    folderHeader.appendChild(para);
    folderHeader.appendChild(button);   
    return folderHeader;
}