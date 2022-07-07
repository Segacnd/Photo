
let image = document.getElementById("image");


let form = document.getElementById("form");
form.addEventListener('submit', subForm)


let inFile = document.getElementById("file");
inFile.addEventListener('change', previewImage)

function previewImage(e) {

    const url = URL.createObjectURL(e.target.files[0])
    document.getElementById("img-preview").setAttribute("src", url)
}

function resetPreview() {
    const a = '../icons/download-svgrepo-com.svg';
    document.getElementById("img-preview").setAttribute("src", a)
}

function subForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData)

    const imgFull = {
        title: formDataObj.title,
    }


    let reader = new FileReader();
    reader.addEventListener('load', () => {
        imgFull.imgUrl = reader.result
        saveToLocStor(imgFull);
        addPhoto(imgFull);
        event.target.reset();
        popupClose()
        resetPreview()
    })
    reader.readAsDataURL(formDataObj.file);


}



function saveToLocStor(data) {
    let newTry = localStorage.getItem('image')
    if (newTry == null) {
        let emptyArr = [];
        emptyArr.push(data);

        localStorage.setItem('image', JSON.stringify(emptyArr)) //SAVE TO LOCALsTORAGE
    } else {
        let parsedNewTry = JSON.parse(newTry);
        parsedNewTry.push(data);

        localStorage.setItem('image', JSON.stringify(parsedNewTry));

    }
}

function addPhoto(obj) {

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapBox';

    const imgCounteiner = document.createElement('div');
    const imgElem = document.createElement('img');
    imgElem.setAttribute('src', obj.imgUrl);

    const spanT = document.createElement('p');
    const button = document.createElement('button');
    button.addEventListener('click', () => { delItem(obj) });

    const wrapText = document.createElement('div');
    wrapText.className = 'wrapText';

    spanT.innerText = obj.title;
    button.textContent = ('Delete');

    imgElem.classList.add('imgBox');
    imgCounteiner.classList.add('imgCounteiner')

    wrapper.appendChild(imgCounteiner);
    imgCounteiner.appendChild(imgElem);
    wrapper.appendChild(wrapText);
    wrapText.appendChild(spanT);
    wrapText.appendChild(button);


    let x = document.querySelector('.main');
    x.appendChild(wrapper);


}

function delItem(arr) {
    let json = localStorage.getItem('image');
    let parse = JSON.parse(json)
    let res = parse.filter((item) => {
        if (arr.imgUrl === item.imgUrl && arr.title === item.title) {
            return null
        }

        return item
    })
    localStorage.setItem('image', JSON.stringify(res));
    createGalery()
}

function createGalery() {
    let imgFromLs = localStorage.getItem('image');
    if (imgFromLs == null) {
    } else {
        let x = document.querySelector('.main');
        x.innerHTML = '';

        let parsedImgs = JSON.parse(imgFromLs);
        let res = parsedImgs.map((item) => {
            addPhoto(item)
        })
    }

}

createGalery();