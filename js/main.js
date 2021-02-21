// - скролл к 1/4 определенного объекта 

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight; // - высота блока
      const animItemOffset = offset(animItem).top; // - высота от начала страницы к началу нашего блока
      const animStart = 4
      let animItemPoint = window.innerHeight - animItemHeight / animStart; // - высота 1/4 нашего блока при скролле вниз
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('active');
      } else {
        animItem.classList.remove('active')
      }
    }
  }

  function offset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }
}

//- отправда данных пользователя на сервер 

const [submit, myPhone, myName, txtAfterInp] = ['submit', 'myPhone', 'myName', 'txtAfterInp']
.map((id) => document.getElementById(id))
submit.onclick = function (event) {
  if (myPhone.value.length > 4) {
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: myName.value,
        numberTel: myPhone.value
      })
    }).then((response) => console.log(response.status))
    myName.value = '';
    myPhone.value = '+380';
    txtAfterInp.innerHTML = 'мы с вами свяжемся в течении 5 минут'
  } else {
    txtAfterInp.innerHTML = 'введите корректый номер'
  }
}

//- модальное окно под гугл-карту

const btnone = document.querySelector('.btnone')
const close = document.querySelector('.close')
const mapContent = document.querySelector('.mapContent')

btnone.onclick = function () {
  mapContent.style.display = 'block';
  document.getElementsByTagName('header')[0].style.opacity = 0.8;
  document.getElementsByTagName('main')[0].style.opacity = 0.8;
  document.getElementsByTagName('footer')[0].style.opacity = 0.8;
}
close.onclick = function () {
  mapContent.style.display = 'none'
  document.getElementsByTagName('header')[0].style.opacity = 1;
  document.getElementsByTagName('main')[0].style.opacity = 1;
  document.getElementsByTagName('footer')[0].style.opacity = 1;
}
window.onclick = function (event) {
  if (event.target == mapContent) {
    mapContent.style.display = 'none'
    document.getElementsByTagName('header')[0].style.opacity = 1;
    document.getElementsByTagName('main')[0].style.opacity = 1;
    document.getElementsByTagName('footer')[0].style.opacity = 1;
  }
}

var map;
// Функция initMap которая отрисует карту на странице
function initMap() {
  // В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
  map = new google.maps.Map(document.getElementById('map'), {
    // При создании объекта карты необходимо указать его свойства
    // center - определяем точку на которой карта будет центрироваться
    center: {
      lat: 49.99271443804456,
      lng: 36.23078124675806
    },
    // zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.
    zoom: 15
  });
  // Создаем маркер на карте
  var marker = new google.maps.Marker({
    // Определяем позицию маркера
    position: {
      lat: 49.99271443804456,
      lng: 36.23078124675806
    },
    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
    map: map,
    // Пишем название маркера - появится если навести на него курсор и немного подождать
    title: 'BORODINSKI'
  });
}
