function createPopupModal() {
    const popupOpenLink = document.querySelector('.popup__link');
    const popupCloseIcon = document.querySelector('.close-popup');

    popupOpenLink.addEventListener('click', function (e) {
        popupOpen();
    })

    popupCloseIcon.addEventListener('click', function (e) {
        popupClose();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            popupClose();
        }
    });
}


function popupOpen() {
    const currentPopup = document.querySelector('#popup');

    if (currentPopup) {
        const popupActive = document.querySelector('#popup.open');

        if (popupActive) {
            popupClose();
        } else {
            bodyLock();
        }

        currentPopup.classList.add('open');
    }
}


function popupClose() {
    const popupActive = document.querySelector('#popup.open');
    bodyUnLock()


    popupActive.classList.remove('open');
}

function bodyLock() {
    const body = document.querySelector('body');

    body.classList.add('lock');
}

function bodyUnLock() {
    const body = document.querySelector('body');

    body.classList.remove('lock');
}

createPopupModal()