let image = document.getElementById("image");
// let file = document.getElementById("file");

// file.addEventListener('change', function(){
//   image.src = URL.createObjectURL(file.files[0]);
//   image.style.display = "block";
// });

let form = document.getElementById("form");
form.addEventListener('submit', subForm)

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
    })
    reader.readAsDataURL(formDataObj.file);
    

}



function saveToLocStor(data) {
    let newTry = localStorage.getItem('image')
    if (newTry == null){
        let emptyArr = [];
        emptyArr.push(data);
        
        localStorage.setItem('image', JSON.stringify(emptyArr)) //SAVE TO LOCALsTORAGE
    } else {
        let parsedNewTry = JSON.parse(newTry);
        parsedNewTry.push(data);

        localStorage.setItem('image', JSON.stringify(parsedNewTry))  ;
        
    }
}

function addPhoto(obj) {
    
        let wrapper = document.createElement('div');
        wrapper.className = 'wrapBox';
        let imgElem = document.createElement('img');
        imgElem.setAttribute('src', obj.imgUrl);
        let spanT = document.createElement('p');
        let button = document.createElement('button');
        button.addEventListener('click', () => {delItem(obj)})
        let jija = document.createElement('div');
        jija.className = 'jija';
        // button.setAttribute('delBut', )

        
        // imgElem.setAttribute('width', "100px");
        spanT.innerText = obj.title;
        
        imgElem.classList.add('imgBox');

        
        wrapper.appendChild(imgElem);
        wrapper.appendChild(jija);
        jija.appendChild(spanT);
        jija.appendChild(button);


        let x = document.getElementById('main');
        x.appendChild(wrapper);
    

}

function delItem(arr) {
    let json = localStorage.getItem('image');
    let parse = JSON.parse(json)
    let res = parse.filter((item) => {
        if (arr.imgUrl !== item.imgUrl && arr.title !== item.title) {
            return item
        }
    })
    localStorage.setItem('image', JSON.stringify(res))  ;
}

function createGalery () {
    let imgFromLs = localStorage.getItem('image');
    if (imgFromLs == null) {  
        // add functional
    } else {
        // 
        let parsedImgs = JSON.parse(imgFromLs);
        let res = parsedImgs.map((item) => {
            addPhoto(item)
        })
    }
    
}

createGalery();



