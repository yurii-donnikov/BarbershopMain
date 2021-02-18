const animItems = document.querySelectorAll('._anim-items');

console.log(animItems.length)

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
