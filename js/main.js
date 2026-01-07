const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery');

window.disableScroll = function() {
    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    `;
}

window.enableScroll = function() {
    document.body.style.cssText = '';
    window.scroll({ top: document.body.dbScrollY });
}

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');

    if (modalAuth.classList.contains('is-open')) {
        disableScroll();
    } else {
        enableScroll();
        loginInput.style.borderColor = '';
        passwordInput.style.borderColor = '';
    }
}

function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';

    buttonOut.removeEventListener('click', logOut);

    checkAuth();
}

function logIn(event) {
    event.preventDefault();

    if (loginInput.value.trim() && passwordInput.value.trim()) {
        loginInput.style.borderColor = '';
        passwordInput.style.borderColor = '';

        login = loginInput.value;
        localStorage.setItem('gloDelivery', login);

        toggleModalAuth();

        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);

        logInForm.reset();
        checkAuth();
    } else {
        if (!loginInput.value.trim()) {
            loginInput.style.borderColor = '#ff0000';
        }
        if (!passwordInput.value.trim()) {
            passwordInput.style.borderColor = '#ff0000';
        }
        alert('Будь ласка, заповніть всі поля');
    }
}

function authorized() {
    console.log('Авторизовано');

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';

    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    console.log('Не авторизовано');

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);

    modalAuth.addEventListener('click', function(event) {
        if (event.target.classList.contains('is-open')) {
            toggleModalAuth();
        }
    });
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

function toggleModal() {
    modal.classList.toggle("is-open");

    if (modal.classList.contains('is-open')) {
        disableScroll();
    } else {
        enableScroll();
    }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

modal.addEventListener('click', function(event) {
    if (event.target.classList.contains('is-open')) {
        toggleModal();
    }
});

checkAuth();

const restaurants = [
    {
        image: 'img/pizza-plus/preview.jpg',
        name: 'Піца плюс',
        time: '50 хвилин',
        stars: 4.5,
        price: 200,
        kitchen: 'Піца',
        products: 'restaurant.html'
    },
    {
        image: 'img/tanuki/preview.jpg',
        name: 'Танукі',
        time: '60 хвилин',
        stars: 4.5,
        price: 1200,
        kitchen: 'Суші, роли',
        products: 'restaurant.html'
    },
    {
        image: 'img/food-band/preview.jpg',
        name: 'FoodBand',
        time: '40 хвилин',
        stars: 4.5,
        price: 150,
        kitchen: 'Піца',
        products: 'restaurant.html'
    },
    {
        image: 'img/palki-skalki/preview.jpg',
        name: 'Ikigai',
        time: '55 хвилин',
        stars: 4.5,
        price: 250,
        kitchen: 'Піца',
        products: 'restaurant.html'
    },
    {
        image: 'img/gusi-lebedi/preview.jpg',
        name: 'Пузата хата',
        time: '75 хвилин',
        stars: 4.5,
        price: 300,
        kitchen: 'Українські страви',
        products: 'restaurant.html'
    },
    {
        image: 'img/pizza-burger/preview.jpg',
        name: 'PizzaBurger',
        time: '45 хвилин',
        stars: 4.5,
        price: 700,
        kitchen: 'Піца',
        products: 'restaurant.html'
    }
];

const cardsRestaurants = document.querySelector('.cards-restaurants');

function createCardRestaurant(restaurant) {
    const { image, name, time, stars, price, kitchen, products } = restaurant;

    const card = `
        <a href="${products}" class="card card-restaurant">
            <img src="${image}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${time}</span>
                </div>
                <div class="card-info">
                    <div class="rating">${stars}</div>
                    <div class="price">від ${price} ₴</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

if (cardsRestaurants) {
    cardsRestaurants.textContent = '';
    restaurants.forEach(createCardRestaurant);

    cardsRestaurants.addEventListener('click', function(event) {
        const target = event.target;
        const restaurantCard = target.closest('.card-restaurant');

        if (restaurantCard) {
            if (!login) {
                event.preventDefault();
                toggleModalAuth();
            } else {
            }
        }
    });
}
