const $formBtn = document.querySelector(".formulario-btn"),
  $form = document.querySelector(".formulario"),
  $closeFormBtn = document.querySelector(".close-form-btn"),
  $stackItems = document.querySelectorAll(".items"),
  $footer = document.querySelector("footer"),
  $cabecera = document.querySelector(".cabecera-container");

const formContact = () => {
  $formBtn.style.display = "none";
  $form.classList.add("formulario-active");
}

const closeForm = () => {
  $form.classList.remove("formulario-active");
  $formBtn.style.display = "block"
}

/* ------animation stack images-------- */

const observersOptions = {
  threshold: [0.2,0.8]
}

const animationStackImg = () => {

  const $stackImgs = document.querySelectorAll(".stack-card-container");
  
  const callbk1 = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.animationName = "fromLeft";
        /* console.log(entry) */
      }
    })
  }
    
  const observer1 = new IntersectionObserver(callbk1,observersOptions);
  
  const callbk2 = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.animationName = "fromRight";
        /* console.log(entry) */
      }
    })
  }
    
  const observer2 = new IntersectionObserver(callbk2,observersOptions);
  
  let cont = 0;
  
  $stackImgs.forEach(img => {
  
    if(innerWidth >= 700 && innerWidth < 1290){
      observer1.observe(img);
    }else{
      if(cont % 2 === 0){
          observer1.observe(img);
      }else{
          observer2.observe(img);
      }
      cont++
    }
  })
}

/* -----------------------Form loader----------------------- */

const loader = () => {
  let loaderContainer = document.createElement("div");

  loaderContainer.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader">
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
  <br>
  <span>Enviando...</span>`
  loaderContainer.style.display = "flex";
  loaderContainer.style.flexDirection = "column";
  loaderContainer.classList.add("contact-response-container");
  loaderContainer.id = "loaderContainer";
  document.body.insertAdjacentElement("afterbegin",loaderContainer);

  return loaderContainer;
}

/*----------------ANIMATION LOGO---------------------- */

window.addEventListener("scroll", (e) => {

  if(scrollY > 0){
    $cabecera.style.animationName = "hideLogo"
    if($cabecera.style.animationName === "hideLogo"){
      return ""
    }
  }else{
    $cabecera.style.animationName = "showLogo"
  }

})

/*------------------ Modal slider ---------------------*/

const testingDimensions = () => {
  if(innerWidth < 1000){
    const $sliderContainer = document.querySelector(".slider-img-container");
  
    let $modalText = document.querySelector(".tapLeftRight");
    
    const watchingSlider = (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          $modalText.classList.add("modalText")
          $modalText.style.animationName = "showModalText";
        }
      })
    }
    
    let watchSlider = new IntersectionObserver(watchingSlider,observersOptions)
    watchSlider.observe($sliderContainer)
  }
}

let lines = document.querySelectorAll(".lines div"),
  techsImg = document.querySelector(".techs-imgs"),
  techImages = document.querySelectorAll(".techs-imgs img"),
  linesContainer = document.querySelector(".lines");

const linesAnimation = () => {
  setInterval(() => {
    lines.forEach(line => {
      let random = Math.floor(Math.random()*50),
      bottomPoints = 100 - random;

      line.style.clipPath = `polygon(0% ${random}%, 100% ${random}%, 100% ${bottomPoints}%, 0% ${bottomPoints}%)`;

    })
  }, 500);
}

document.addEventListener("animationend", e => {

  if(e.target.matches(".presentacion")){
    linesAnimation();
  }

})

/* -------------------STACK CARDS AND CERTIFICATES---------- */

const $templateCard = document.getElementById("templateCard").content,
  $templateCertificate = document.getElementById("certificadosCard").content,
  $fragmentCard = document.createDocumentFragment(),
  $stackContainer = document.querySelector(".stack-cards"),
  $certificatesContainer = document.querySelector(".certificados");
  
const stackData = [
  {
    name: "Html",
    imgUrl: "./imagenes/HTML_Logo.svg",
    progressPercent: "80%",
    level: "High"
  },
  {
    name: "Css",
    imgUrl: "./imagenes/CSS_Logo.svg",
    progressPercent: "70%",
    level: "Med"
  },
  {
    name: "JavaScript",
    imgUrl: "./imagenes/JS_Logo.svg",
    progressPercent: "72%",
    level: "Med"
  },
  {
    name: "Git",
    imgUrl: "./imagenes/git_Logo.svg",
    progressPercent: "70%",
    level: "Med"
  },
  {
    name: "React JS",
    imgUrl: "./imagenes/React_Logo.png",
    progressPercent: "15%",
    level: "Basic"
  }
]

const certificatesData = [
  {
    imgUrl: "./imagenes/Certificado_CSS.png",
    name: "Css",
    by: "Educa2"
  },
  {
    imgUrl: "./imagenes/Certificado_js.png",
    name: "JavaScript",
    by: "Educa2"
  }
]

const creatingCards = () => {
  stackData.forEach(tech => {
    let clon = $templateCard.cloneNode(true),
      $container = clon.querySelector(".stack-card-container"),
      $img = $container.querySelector(".stack-card-img > img"),
      $progress = $container.querySelector(".progress-bar"),
      $level = $container.querySelector(".stack-progress-level p");
  
    $img.src = tech.imgUrl;
    $img.alt = tech.name;
    $progress.style.width = tech.progressPercent;
    $level.textContent+= tech.level;
    $fragmentCard.append($container);
  })

  $stackContainer.append($fragmentCard);

  /* -------Certificates */

  certificatesData.forEach(cert => {
    let clon = $templateCertificate.cloneNode(true),
    $img = clon.querySelector(".certificados-card-img img"),
    $techName = clon.querySelector(".certificados-card-info-tech-name"),
    $by = clon.querySelector(".certificados-card-info-tech-by > strong");

    $img.src = cert.imgUrl;
    $img.alt = `${cert.name} certificate`;
    $techName.textContent = cert.name;
    $by.textContent = cert.by;
    $fragmentCard.append(clon);
  })

  $certificatesContainer.append($fragmentCard);
}

/* -----------------EVENTS---------- */

document.addEventListener("DOMContentLoaded",() => {
  creatingCards();
  animationStackImg();
  testingDimensions();
})

document.addEventListener("click", (e) => {
  if(e.target.matches(`.${$formBtn.className}`)) formContact();
  if(e.target.matches(`.${$closeFormBtn.className}`)) closeForm();

  const listaItems = document.querySelectorAll(".slider-item");

  let sliderContainer = e.target.closest(".proyecto-slider-container") || false;

  if(innerWidth < 1000){
    if(sliderContainer.className === "proyecto-slider-container"){
   
      let coorX = e.x;
  
      let left_or_right = (sliderContainer.clientWidth) / 2;
  
      if(coorX < left_or_right){
        /* Para ir a la izquierda */
        for(let item = 0;item < listaItems.length;item++){
          if(!(listaItems[0].classList.contains("slideImg"))){
            /* Si el primer elemento es visible */
            listaItems[(listaItems.length - 1)].classList.remove("slideImg")
            /* Hacemos el ultimo elemento visible */
            listaItems[0].classList.add("slideImg")
            /* Lo contrario para el primero */
            break
          }
          
          if(listaItems[item].classList.contains("slideImg")){
  
          }else{
            listaItems[item].classList.add("slideImg")
            listaItems[(item - 1)].classList.remove("slideImg")
            break
          }
        }
      }
      
      if(coorX >= left_or_right){
        /* Para ir a la derecha */
        for(let item = 0;item < listaItems.length;item++){
          if(item === (listaItems.length - 1)){
            /* Para el ultimo elemento */
            listaItems[0].classList.remove("slideImg")
            /* Se hace visible el primer elemento */
            listaItems[(listaItems.length - 1)].classList.add("slideImg")
            /* Lo contrario para el ultimo */
            break
          }
          
          if(listaItems[item].classList.contains("slideImg")){
  
          }else{
            listaItems[item].classList.add("slideImg")
            listaItems[(item + 1)].classList.remove("slideImg")
            break
          }
        }
      }
    }
  }else{

    if(e.target.classList.contains("btn-left")){
      /* Para ir a la izquierda */
      for(let item = 0;item < listaItems.length;item++){
        if(!(listaItems[0].classList.contains("slideImg"))){
          /* Si el primer elemento es visible */
          listaItems[(listaItems.length - 1)].classList.remove("slideImg")
          /* Hacemos el ultimo elemento visible */
          listaItems[0].classList.add("slideImg")
          /* Lo contrario para el primero */
          break
        }
        
        if(listaItems[item].classList.contains("slideImg")){

        }else{
          listaItems[item].classList.add("slideImg")
          listaItems[(item - 1)].classList.remove("slideImg")
          break
        }
      }
    }

    if(e.target.classList.contains("btn-right")){
      for(let item = 0;item < listaItems.length;item++){
        if(item === (listaItems.length - 1)){
          /* Para el ultimo elemento */
          listaItems[0].classList.remove("slideImg")
          /* Se hace visible el primer elemento */
          listaItems[(listaItems.length - 1)].classList.add("slideImg")
          /* Lo contrario para el ultimo */
          break
        }
        
        if(listaItems[item].classList.contains("slideImg")){

        }else{
          listaItems[item].classList.add("slideImg")
          listaItems[(item + 1)].classList.remove("slideImg")
          break
        }
      }
    }
  } 

  if(e.target.matches(".certificados-card-img > img")){
    /* e.target.classList.add(".img-active"); */
    e.target.classList.toggle("img-active")
  }
  
})

/* -----------------FORMULARIO------------------------ */

const $formContainer = document.querySelector(".formulario-container"),
  $formResponse = document.querySelector(".contact-response-container");

const $msg = document.createElement("div");

$formContainer.addEventListener("submit",(e) => {
  e.preventDefault();
  let container = loader();

  fetch("https://formsubmit.co/ajax/adonismendozacontact@gmail.com",{
    method: "POST",
    body: new FormData(e.target)
  })
  .then(respuesta => {
    if(respuesta.ok){
      respuesta.json()
    }else{
      Promise.reject(respuesta);
    }
  })
  .then(json => {
    console.log(json);
    document.body.removeChild(container)
    /* Hacer otras cosas */
    $msg.textContent = "Me contactaré contigo pronto.";
    $msg.style.display = "flex";
    $msg.classList.add("contact-response-container")
    $formContainer.reset();
    document.body.insertAdjacentElement("afterbegin",$msg)
  })
  .catch(err => {
    document.body.removeChild(container)
    console.log(err);
    /* Imprimir mensaje de error */
    $msg.classList.remove("contact-response-container")
    $msg.textContent = `Error ${err.status}. Vuelve a intentarlo`;
    $msg.style.display = "flex";
    $msg.classList.add("contact-response-container")
    document.body.insertAdjacentElement("afterbegin",$msg)
  })
  .finally(() => {
  /* Se completo el proceso del formulario */
    setTimeout(() => {
      $msg.style.display = "none";
    },3000)
  })
})