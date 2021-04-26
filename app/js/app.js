// header parallax

const header = document.querySelector('.header')
const headerImg = document.querySelector('.header__background')

const headerImgParallaxAmountPercent = 20
const headerImgParallaxAmountProportion = (headerImgParallaxAmountPercent / 100 + 1)

headerImg.style.transform = `scale(${headerImgParallaxAmountProportion})`

document.addEventListener('mousemove', e => {
  if (e.path.includes(header)) {
    const depthX = -e.pageX / (headerImgParallaxAmountPercent * 2) + 'px'
    const depthY = -e.pageY / (headerImgParallaxAmountPercent * 2) + 'px'
  
    headerImg.style.transform = `scale(${headerImgParallaxAmountProportion}) translate(${depthX}, ${depthY})`
  }
})

// input date placeholder

const dateInputs = document.querySelectorAll('input[type=date]')

dateInputs.forEach(input => {
  input.type = 'text'

  input.addEventListener('focus', () => input.type = 'date')
  input.addEventListener('blur', () => input.type = 'text')
})

// select

const selects = document.querySelectorAll('.select')

selects.forEach(select => {
  const $input = select.querySelector('.select__input')
  const $inputText = $input.querySelector('.select__text')
  const $options = select.querySelectorAll('.select__option')

  $input.addEventListener('click', () => {
    select.classList.toggle('active')
  })

  $options.forEach(option => {
    option.addEventListener('click', () => {
      $options.forEach(option => {
        option.classList.remove('active')
      })

      option.classList.add('active')
      $inputText.textContent = option.querySelector('label').textContent
    })
  })
})

// sliders

const sliderOptions = {
  slidesPerView: 1,
  spaceBetween: 18,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet(index, className) {
      return `<span class="${className}"></span>`
    }
  }
}

const sliderOptionsEffect = {
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 5,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
}

const eventsSlider = new Swiper('.events-slider', sliderOptions)
const reviewsSlider = new Swiper('.reviews-slider', {...sliderOptions, ...sliderOptionsEffect})
