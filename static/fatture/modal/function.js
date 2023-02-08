const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next' };


const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

const findParent = (elem, parentClass) => {

  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;

};

const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

const setActiveStep = activeStepNum => {

  removeClasses(DOMstrings.stepsBtns, 'js-active');

  DOMstrings.stepsBtns.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }

  });
};

const getActivePanel = () => {

  let activePanel;

  DOMstrings.stepFormPanels.forEach(elem => {

    if (elem.classList.contains('js-active')) {

      activePanel = elem;

    }

  });

  return activePanel;

};

const setActivePanel = activePanelNum => {

  removeClasses(DOMstrings.stepFormPanels, 'js-active');

  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {

      elem.classList.add('js-active');

      setFormHeight(elem);

    }
  });

};

const formHeight = activePanel => {

  const activePanelHeight = activePanel.offsetHeight;

  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

DOMstrings.stepsBar.addEventListener('click', e => {

  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  const activeStep = getActiveStep(eventTarget);

  setActiveStep(activeStep);

  setActivePanel(activeStep);

  
});


window.addEventListener('load', setFormHeight, false);

window.addEventListener('resize', setFormHeight, false);

//prevent Enter Key from submtting form
$(document).keypress(
  function(event){
    if (event.which == '13') {
      event.preventDefault();
    }
});


const setAnimationType = newType => {
  DOMstrings.stepFormPanels.forEach(elem => {
    elem.dataset.animation = newType;
  });
};

  //Previous Step1
  var Prev1 = document.getElementById('prevStep1')
  Prev1.addEventListener("click", previousStep1)

  function previousStep1() {
    setActiveStep(0); 
    setActivePanel(0);
  }

  //Previous Step2
  var Prev2 = document.getElementById('prevStep2')
  Prev2.addEventListener("click", previousStep2)

  function previousStep2() {
    setActiveStep(1); 
    setActivePanel(1);
  }

  //Previous Step3
  var Prev3 = document.getElementById('prevStep3')
  Prev3.addEventListener("click", previousStep3)

  function previousStep3() {
    setActiveStep(2); 
    setActivePanel(2);
  }

  //Validation 1st Page
  //Crea Variabile per validation all'ultimo step per chi salta i passaggi
  var genpdf = document.getElementById('genera')

  var Next1 = document.getElementById('step1')
  Next1.addEventListener("click", validateForm1)
  genpdf.addEventListener("click", validateForm1)
  
  function validateForm1() {
  let Cognome = document.forms["yourData"]["Cognome"].value;
  let Nome = document.forms["yourData"]["Nome"].value;
  let Indirizzo = document.forms["yourData"]["Indirizzo"].value;
  let PIVA = document.forms["yourData"]["P.IVA"].value;
  let yourData = [Cognome, Nome, Indirizzo, PIVA];

  if (yourData.includes("")) {
      alert("Controlla che tutti i campi della pagina 1 siano compilati");
      setActiveStep(0); 
      setActivePanel(0);
    } else if (PIVA.length != 11) {
      alert("Controlla la Partita IVA abbia 11 cifre");
      setActiveStep(0); 
      setActivePanel(0);
    } else {
      setActiveStep(1); 
      setActivePanel(1);
    }

    //torna in alto
    var scroll1 = document.getElementById("wizard");
    scroll1.scrollIntoView();
  };

  //Validation 2nd Page
  var Next2 = document.getElementById('step2')
  Next2.addEventListener("click", validateForm2)
  genpdf.addEventListener("click", validateForm2)

  function validateForm2() {
  let Name = document.forms["yourData"]["name"].value;
  let Taxcode = document.forms["yourData"]["taxcode"].value;
  let Address = document.forms["yourData"]["address"].value;
  let patientData = [Name, Taxcode, Address]

  if (patientData.includes("")) {
      alert("Controlla che tutti i campi della pagina 2 siano compilati");
      setActiveStep(1); 
      setActivePanel(1);
    } else {
      setActiveStep(2); 
      setActivePanel(2);
    }

    //torna in alto
    var scroll2 = document.getElementById("wizard");
    scroll2.scrollIntoView();
  };

  //Validation 3rd Page
  var Next3 = document.getElementById('step3')
  Next3.addEventListener("click", validateForm3)
  genpdf.addEventListener("click", validateForm3)

  function validateForm3() {
  let Ore = document.forms["yourData"]["Ore"].value;
  let Descrizione = document.forms["yourData"]["Descrizione"].value;
  let Unitario = document.forms["yourData"]["Unitario"].value;
  let transactionData = [Ore, Descrizione, Unitario]

  if (transactionData.includes("")) {
      alert("Controlla che tutti i campi della pagina 3 siano compilati");
      setActiveStep(2); 
      setActivePanel(2);
    } else {
      setActiveStep(3); 
      setActivePanel(3);
    }

    //torna in alto
    var scroll3 = document.getElementById("wizard");
    scroll3.scrollIntoView();
  };

  //newPrestazione
  var add2 = document.getElementById('add1')
  var add3 = document.getElementById('add2')
  var del2 = document.getElementById('del2')
  var del3 = document.getElementById('del3')
  add2.addEventListener("click", addPrestazione2)
  add3.addEventListener("click", addPrestazione3)
  del2.addEventListener("click", remPrestazione2)
  del3.addEventListener("click", remPrestazione3)

  function addPrestazione2(){
    //elimina button
    var add2 = document.getElementById('add1')
    add2.style.display='none'
    //mostra prestazione2
    var prest2 = document.getElementById('prestazione2')
    prest2.style.display='block'
  }

  function remPrestazione2(){
    //svuota campi
    document.querySelector("#Ore2").value=0
    document.querySelector("#Descrizione2").value=""
    document.querySelector("#Unitario2").value=0
    //nasconde prestazione2
    var remPrest2 = document.getElementById('prestazione2')
    remPrest2.style.display='none'
    //riappare button
    var add2 = document.getElementById('add1')
    add2.style.display='block'
  }

  function addPrestazione3() {
    //cambia colore button
    var add3 = document.getElementById('add2')
    add3.style.display='none'
    //mostra prestazione3
    var prest3 = document.getElementById('prestazione3')
    prest3.style.display='block'
  }

  function remPrestazione3() {
    //svuota campi
    document.querySelector("#Ore3").value='0'
    document.querySelector("#Descrizione3").value=""
    document.querySelector("#Unitario3").value=0
    //nasconde prestazione3
    var remPrest3 = document.getElementById('prestazione3')
    remPrest3.style.display='none'
    //riappare button
    var add2 = document.getElementById('add2')
    add2.style.display='block'
  }

function thankyouPage() {
  //redirect alla thank you page
  var nascondiForm = document.getElementById('wizard')
  var mostraThankyoupage = document.getElementById('thankyou')
  nascondiForm.style.display='none'
  mostraThankyoupage.style.display='block'
}