const $formBtn = document.querySelector(".formulario-btn"),
  $form = document.querySelector(".formulario"),
  $closeFormBtn = document.querySelector(".close-form-btn"),
  $menuBtn = document.querySelector(".menu-btn"),
  $hamburgerBtn = document.querySelector(".hamburger-btn"),
  $menu = document.querySelector(".stack_items"),
  $stackItems = document.querySelectorAll(".items"),
  $footer = document.querySelector("footer");

const formContact = () => {
  $formBtn.style.display = "none";
  $form.classList.add("formulario-active");
}

const closeForm = () => {
  $form.classList.remove("formulario-active");
  $formBtn.style.display = "block"
}

const menuStack = () => {
  $menu.classList.toggle("stack_items-active");
}

document.addEventListener("click", (e) => {
  if(e.target.matches(`.${$formBtn.className}`)) formContact();
  if(e.target.matches(`.${$closeFormBtn.className}`)) closeForm();
  if(e.target.matches(`.${$menuBtn.className}`)) menuStack();
  if(e.target.matches(`.${$hamburgerBtn.className}`)) menuStack();
})


/* ------animation stack images-------- */

const $stackImgs = document.querySelectorAll(".articulos_contenedor > article > figure")

  const callbk1 = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.animationName = "fromLeft"
      }
    })
  }
  
  const observer1 = new IntersectionObserver(callbk1,{
    threshold: [0.2,0.8]
  })

  const callbk2 = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.animationName = "fromRight"
      }
    })
  }
  
  const observer2 = new IntersectionObserver(callbk2,{
    threshold: [0.2,0.8]
  })

  let cont = 0;

  $stackImgs.forEach(img => {

    if(innerWidth >= 700 && innerWidth < 1290){
      observer1.observe(img)
    }else{
      if(cont % 2 === 0){
          observer1.observe(img)
      }else{
          observer2.observe(img)
      }
      cont++
    }
  })

/* ----------Out menu------------ */

document.addEventListener("DOMContentLoaded",() => {
  $stackItems.forEach(item => {
    item.addEventListener("click",e => {
      if(e.target.className === item.className){
        $menu.classList.remove("stack_items-active");
      }
    })
  })

})

/* FORMULARIO */

const $formContainer = document.querySelector(".formulario-container"),
  $formResponse = document.querySelector(".contact-response-container");

const $msg = document.createElement("div");

$formContainer.addEventListener("submit",(e) => {
  e.preventDefault();

  fetch("https://formsubmit.co/ajax/donimen@gmail.com",{
    method: "POST",
    body: new FormData(e.target)
  })
  .then(respuesta => {
    return respuesta.ok 
    ? respuesta.json()
    : Promise.reject(respuesta);
  })
  .then(json => {
    console.log(json);
    /* Hacer otras cosas */
    $msg.textContent = "Me contactaré contigo pronto.";
    $msg.style.display = "flex";
    $msg.classList.add(contact-response-container)
    $formContainer.reset();
    document.body.insertAdjacentElement("afterbegin",$msg)
  })
  .catch(err => {
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

/* OUT HAMBURGER BTN */

window.addEventListener("scroll", () => {
  if($hamburgerBtn.getBoundingClientRect().top >= ($footer.getBoundingClientRect().top - $hamburgerBtn.clientHeight)){
    $hamburgerBtn.classList.add("fade-out");
    $hamburgerBtn.style.pointerEvents = "none";
  }else{
    $hamburgerBtn.classList.remove("fade-out"); 
    $hamburgerBtn.style.pointerEvents = "all";
  }
})