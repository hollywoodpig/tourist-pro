// header parallax

if (document.querySelector('.header__background') instanceof  Element) {
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
}

// input date placeholder

const dateInputs = document.querySelectorAll('input[type=date]')

dateInputs.forEach(input => {
  const placeholder = input.getAttribute('data-placeholder')

  const toText = () => {
    input.type = 'text'
    input.placeholder = placeholder || ''
  }

  const toDate = () => {
    input.type = 'date'

    input.removeAttribute('placeholder')
    input.setAttribute('data-placeholder', placeholder)
  }

  toText()

  input.addEventListener('blur', toText)
  input.addEventListener('focus', toDate)
})

// select

const selects = document.querySelectorAll('.select')

selects.forEach(select => {
  const $input = select.querySelector('.select__input')
  const $inputText = $input.querySelector('.select__text')
  const $options = select.querySelectorAll('.select__option')

  const inputTextFirstValue = $inputText.textContent

  $input.addEventListener('click', () => {
    select.classList.toggle('active')
  })

  $options.forEach(option => {
    option.addEventListener('click', () => {
      const optionInput = option.querySelector('input')
      const optionInputType = optionInput.getAttribute('type')

      if (optionInputType === 'radio') {
        $options.forEach(option => {
          option.classList.remove('active')
        })
  
        option.classList.add('active')
        $inputText.textContent = option.querySelector('label').textContent
      }

      if (optionInputType === 'checkbox') {
        if (optionInput.checked) {
          option.classList.add('active')
        } else {
          option.classList.remove('active')
        }

        const arr = []

        select.querySelectorAll('input[type="checkbox"]:checked ~ label').forEach(item => {
          arr.push(item.textContent)
        })

        if (arr.length === 0) {
          $inputText.textContent = inputTextFirstValue
        } else {
          $inputText.textContent = arr.join(' ')
        }
      }

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
const zonesSlider = new Swiper('.zones-slider', sliderOptions)

// select card in slider

const zonesSliderLinks = document.querySelectorAll('.zones-slider .card__link')

zonesSliderLinks.forEach(link => {
  link.addEventListener('click', () => {
    zonesSliderLinks.forEach(link => {
      const checkbox = link.querySelector('input[type="checkbox"]')

      if (checkbox.checked) {
        link.parentNode.parentNode.classList.add('active')
        link.querySelector('label').textContent = 'Выбрано'
      } else {
        link.parentNode.parentNode.classList.remove('active')
        link.querySelector('label').textContent = 'Выбрать'
      }
    })
  })
})
