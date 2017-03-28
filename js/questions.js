var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestaSelect1=null;
var respuestasRadio=null;
var respuestasRadio1=null;
var textSecreto2 = null;
var textSecreto1 = null;
var respuestaMulti = [];
var respuestaMulti1 = [];

var respuestasCheckbox = [];
var respuestasCheckbox1 = [];
var nota = 0;
var salir = true;


//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 



 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){  
 

   if(focus()){
    document.getElementsByClassName("wil2")[0].style.display = "block";
   borrarCorreccion();   
   corregirText1();
   corregirText2();
   corregirSelect();
   corregirSelect1();
   corregirCheckbox1();
   corregirCheckbox2();

   

   
   return false;
 }
   return false;



 } 
 


 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/borjadevelop/ExamenXML_JS_HTML/master/xml/preguntas.xml", true);
 xhttp.send();


 // Metodo para quitar la pantalla de inicio y entrar al test
 document.onkeydown = quitarPantalla;





  document.getElementById("info").onclick = function () {
    
    document.getElementsByClassName("divinfodentro")[0].style.display = "block";
    document.getElementsByClassName("hidem")[0].style.display = "block";
    document.getElementsByClassName("divabout")[0].style.display = "none";
    
   
  }


    document.getElementById("about").onclick = function () {
    document.getElementsByClassName("divabout")[0].style.display = "block";
    document.getElementsByClassName("divaboutdentro")[0].style.display = "block";
    document.getElementsByClassName("hidem")[0].style.display = "block";
    document.getElementsByClassName("divinfodentro")[0].style.display = "none";
    
   
  }

  document.getElementById("hidem").onclick = function () {
    document.getElementsByClassName("divinfodentro")[0].style.display = "none";
       document.getElementsByClassName("divaboutdentro")[0].style.display = "none";
    document.getElementsByClassName("divabout")[0].style.display = "none";
    document.getElementsByClassName("hidem")[0].style.display = "none";

    
  }



}







// JAVASCRIPT PARA EL BOTON DE DEL PRINCIPIO.

window.addEventListener('load', function ()
{
  var xm = 0, ym = 0;
  var noclick = function(elem)
  {
    var x0, y0, px, py, nw, nh, dp;
    this.init = function ()
    {
      x0 = elem.offsetLeft;
      y0 = elem.offsetTop;
      px = 0;
      py = 0;
      nw = elem.offsetWidth / 2;
      nh = elem.offsetHeight / 2;
      dp = Math.max(elem.offsetWidth, elem.offsetHeight) * 0.8;
    }
    this.anim = function()
    {
      var xmm = xm - x0 - nw;
      var ymm = ym - y0 - nh;
      var dx = xmm - px;
      var dy = ymm - py;
      var d = Math.sqrt(dx * dx + dy * dy);
      px -= px * 0.2;
      py -= py * 0.2;
      if (d < dp && d > 0 )
      {
        px = xmm - (dp * (xmm - px) / d);
        py = ymm - (dp * (ymm - py) / d);
      }
      elem.style.transform = 'matrix(1,0,0,1,' + px + ',' + py + ')';
    }
  }
  
  var button = {};
  noclick.call(button, document.getElementById("button"));
  
  var run = function ()
  {
    requestAnimationFrame(run);
    button.anim();
  }
  var resize = function()
  {
    button.init();
  }
  window.addEventListener('resize', resize, false);
  window.addEventListener('mousemove', function(e)
  {
    xm = e.clientX;
    ym = e.clientY;
  }, false);
  resize();
  run();
  window.ondragstart = function() { return false; } 
}, false);





//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(textDiv);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);
 
 //TEXT 1 
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloSelect=xmlDoc.getElementById("bodatoda001").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(tituloSelect);
 textSecreto1=xmlDoc.getElementById('bodatoda001').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 
  //TEXT 2 
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloSelect=xmlDoc.getElementById("bodatoda002").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatostextHtml(tituloSelect);
 textSecreto2=xmlDoc.getElementById('bodatoda002').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 
 
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda005").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var xpath="/questions/question[@id='bodatoda005']/option";
 var nodoSelect1= xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
  ponerDatosSelectHtml(tituloSelect,nodoSelect1);
 respuestaSelect= parseInt(xmlDoc.getElementById("bodatoda005").getElementsByTagName("answer")[0].childNodes[0].nodeValue);

//SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda010").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
  var xpath="/questions/question[@id='bodatoda010']/option";
  var nodoSelect2= xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosSelectHtml1(tituloSelect,nodoSelect2);
 respuestaSelect1= parseInt(xmlDoc.getElementById("bodatoda010").getElementsByTagName("answer")[0].childNodes[0].nodeValue);


 
 
 
 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
 var opcionesCheckbox = [];
 var xpath= "/questions/question[@id='bodatoda003']/option"; 
  var nodoCheckbox1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 ponerDatosCheckboxHtml(tituloCheckbox,nodoCheckbox1);

 var nres = xmlDoc.getElementById("bodatoda003").getElementsByTagName('answer').length;
 for (var i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("bodatoda003").getElementsByTagName("answer")[i].innerHTML;
 }

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementById("bodatoda004").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesCheckbox1 = [];
  var xpath= "/questions/question[@id='bodatoda004']/option";

  var nodoCheckbox2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

 ponerDatosCheckboxHtml1(tituloCheckbox1,nodoCheckbox2);
 var nres = xmlDoc.getElementById("bodatoda004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("bodatoda004").getElementsByTagName("answer")[i].innerHTML;
 }


//bodatoda007
	
 //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementById("bodatoda006").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesRadio = [];
 var xpath = "/questions/question[@id='bodatoda006']/option";

  var nodoRadio1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

 ponerDatosradio(tituloRadio,nodoRadio1);
 var nres = xmlDoc.getElementById("bodatoda006").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio=parseInt(xmlDoc.getElementById("bodatoda006").getElementsByTagName("answer")[0].childNodes[0].nodeValue)
 }

  //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementById("bodatoda007").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesRadio = [];
  var xpath = "/questions/question[@id='bodatoda007']/option";
  var nodoRadio2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

 ponerDatosradio1(tituloRadio,nodoRadio2);
 var nres = xmlDoc.getElementById("bodatoda007").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1=parseInt(xmlDoc.getElementById("bodatoda007").getElementsByTagName("answer")[0].childNodes[0].nodeValue)
 }

 
 
 //MULTI
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda008").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
  var xpath = "/questions/question[@id='bodatoda008']/option";
  var nodoMulti1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);


 ponerDatosMultiHtml(tituloSelect,nodoMulti1);
 var nresp = xmlDoc.getElementById("bodatoda009").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
	respuestaMulti[i] = xmlDoc.getElementById("bodatoda009").getElementsByTagName("answer")[i].innerHTML; 
	}
 
 
 
//MULTI
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda009").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
  var xpath = "/questions/question[@id='bodatoda009']/option";
  var nodoMulti2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);


 ponerDatosMultiHtml1(tituloSelect,nodoMulti2);
 
   var nresp = xmlDoc.getElementById("bodatoda009").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestaMulti1[i] = parseInt(xmlDoc.getElementById("bodatoda009").getElementsByTagName("answer")[i].childNodes[0].nodeValue); 
	}
		
 /*
  var respuestas = [];
   var nresp = xmlDoc.getElementById("bodatoda009").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestas[i] = xmlDoc.getElementById("bodatoda009").getElementsByTagName("answer")[i].childNodes[0].nodeValue; 
		
	}

 */
}

//****************************************************************************************************
//implementación de la corrección

function corregirText1(){
  var s =formElement.elements[0].value;   
  
  if (s == "cachichen" ){ darRespuestaHtml("P1: Exacto!! La respuesta es Cachi Chen");
  nota +=1;
  }else {
    if (s!=textSecreto1) darRespuestaHtml("P1: ERROR! Creo que va siendo hora de que aprendas un poco de chino!!");
    else darRespuestaHtml("P1: No has señalado nada.");
  }
}



function corregirText2(){
 var s = formElement.elements[1].value;     
  if (s== "segundo"){ darRespuestaHtml("P2: Exacto!! Quedar&iacuteas en segunda posici&oacuten.")
    nota +=1;
  }else {
    if (s!=textSecreto2) darRespuestaHtml("P2: Eres un poco corto.");
    else darRespuestaHtml("P2: No has señalado nada");
  }
}




function corregirSelect(){
  var sel = formElement.elements[4].value;  
  if (sel.selectedIndex==respuestaSelect){
	  darRespuestaHtml("P5: Select correcto");
	  nota +=1.0;
  }
  else darRespuestaHtml("P5: Select incorrecto");
}

function corregirSelect1(){
  var sel = formElement.elements[5].value;  
  if (sel.selectedIndex==respuestaSelect1){ 
  darRespuestaHtml("P6: Select correcto") ;
  nota +=1.0;
  }
  else darRespuestaHtml("P6: Select incorrecto");

  }
  
  function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
      darRespuestaHtml("P3: Exacto!"); 
     nota +=1 ;
        
    } else {
     darRespuestaHtml("P3: Incorrecta");
    }   
   } 
  }
}


function corregirCheckbox2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.chex1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.chex1[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1 ;
     darRespuestaHtml("P4: Exacto!");    
    } else {
     darRespuestaHtml("P4: Incorrecta");
    }   
   } 
  }
}

 function corregirRadio1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.radio1[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio.length; j++) {
     if (i==respuestasRadio[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
      darRespuestaHtml("P3: Exacto!"); 
     nota +=1 ;
        
    } else {
     darRespuestaHtml("P3: Incorrecta");
    }   
   } 
  }
}

 function corregirRadio2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.radio2.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.radio2[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio1.length; j++) {
     if (i==respuestasRadio1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
      darRespuestaHtml("P3: Exacto!"); 
     nota +=1 ;
        
    } else {
     darRespuestaHtml("P3: Incorrecta");
    }   
   } 
  }
}
/*
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.123.length; i++) {  //"123" es el nombre asignado a todos los checkbox
   if (f.123[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}
*/





/*

function corregirMultiple(){
  //Para cada opción mira si está seleccionada, si está seleccionada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.selm1.length; i++) {  //"selm1" es el nombre asignado a todos los checkbox
   if (f.selm1[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaMulti.length; j++) {
     if (i==respuestaMulti[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestaMulti.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestaMulti.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}


function corregirMultiple1(){
  //Para cada opción mira si está seleccionada, si está seleccionada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.selm2.length; i++) {  //"selm2" es el nombre asignado a todos los checkbox
   if (f.selm2[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaMulti1.length; j++) {
     if (i==respuestaMulti1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestaMulti1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestaMulti1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}






/**/

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("textDiv").innerHTML = t;
}


// PONER DATOS TEXT
ponerDatostextHtml
function ponerDatostextHtml(t){
 document.getElementById("textDiv1").innerHTML = t;
}

function ponerDatosInputHtml(t){
 document.getElementById("textDiv").innerHTML = t;
}


//PONER DATOS SELECT
function ponerDatosSelectHtml(t,nod){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  var opciones = nod.iterateNext();
  var i = 0;
  while(opciones){
    var option = document.createElement("option");
    option.text = opciones.innerHTML;
    option.value = i+1; i++;
    select.options.add(option);
    opciones = nod.iterateNext();

  } 
}

function ponerDatosSelectHtml1(t,nod){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  var opciones = nod.iterateNext();
  var i = 0;
  while(opciones){
    var option = document.createElement("option");
    option.text = opciones.innerHTML;
    option.value = i+1; i++;
    select.options.add(option);
    opciones = nod.iterateNext();

  }
}


//PONER DATOS CHECKBOX
function ponerDatosCheckboxHtml(t,nod){
 var checkboxContainer=document.getElementById('checkboxDiv');
 var h3 = document.getElementById('check1');
 h3.innerHTML = t;


 var opciones = nod.iterateNext();
 var i = 0;
 while(opciones){
  var input = document.createElement('input');
  var label = document.createElement('label');
  label.innerHTML = opciones.innerHTML;
  label.setAttribute("for","color_"+i);
  input.type="checkbox";
    input.name="color";
    input.id="color_"+i;  i++;  
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(document.createElement("br"));
    opciones = nod.iterateNext();
 }
 
}


function ponerDatosCheckboxHtml1(t,nod){
 var checkboxContainer=document.getElementById('checkboxDiv1');
  var h3 = document.getElementById('check2');
 h3.innerHTML = t;


  var opciones = nod.iterateNext();
 var i = 0;
 while(opciones){
  var input = document.createElement('input');
  var label = document.createElement('label');
  label.innerHTML = opciones.innerHTML;
  label.setAttribute("for","chex1_"+i);
  input.type="checkbox";
    input.name="chex1";
    input.id="chex1_"+i; i++;     
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
    opciones = nod.iterateNext();
 }
 
}

//PONER DATOS RADIO

function ponerDatosradio(t,nod){
 var radioContainer=document.getElementById('radio');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
radioContainer.appendChild(h3); 
 var opciones = nod.iterateNext();
 var i = 0;
 while(opciones){
  var input = document.createElement('input');
  var label = document.createElement('label');
  label.innerHTML = opciones.innerHTML;
  label.setAttribute("for","radio1_"+i);
  input.type="radio";
    input.name="radio1";
    input.id="radio1_"+i; i++;     
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
       radioContainer.appendChild(document.createElement("br"));
    opciones = nod.iterateNext();
 }

}

function ponerDatosradio1(t,nod){
 var radioContainer=document.getElementById('radio1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 

 var opciones = nod.iterateNext();
 var i = 0;
 while(opciones){
  var input = document.createElement('input');
  var label = document.createElement('label');
  label.innerHTML = opciones.innerHTML;
  label.setAttribute("for","radio2_"+i);
  input.type="radio";
    input.name="radio2";
    input.id="radio2_"+i;  i++;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));
    opciones = nod.iterateNext();
 }

}


//PONER DATOS MULTI

function ponerDatosMultiHtml(t,nod){
  document.getElementById("tituloMulti").innerHTML=t;
  var multiop = document.getElementsByTagName("select")[2];
var opciones = nod.iterateNext();
var i = 0;
while(opciones){
  var option = document.createElement("option");
  option.text = opciones.innerHTML;
  option.value = i+1;i++;
  multiop.options.add(option);
  opciones = nod.iterateNext();
}

}

function ponerDatosMultiHtml1(t,nod){
  document.getElementById("tituloMulti1").innerHTML=t;
  var multiop = document.getElementsByTagName("select")[3];
  var opciones = nod.iterateNext();
var i = 0;
while(opciones){
  var option = document.createElement("option");
  option.text = opciones.innerHTML;
  option.value = i+1;i++;
  multiop.options.add(option);
  opciones = nod.iterateNext();
}

}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var resDiv=document.getElementById('resultadosDiv');
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 resDiv.appendChild(p);
}

function borrarCorreccion(){
   var resDiv=document.getElementById('resultadosDiv');
   resDiv.innerHTML = "";
}




  function focus(){
  var f=formElement;
  var checkeado=false;
  var checkeado2=false;
  var checkeado3=false;
  var checkeado4=false;
  var a = 0;
  var b= 0; 
  var c = 0;
  var d= 0;

  for (var i = 0 ; i < f.color.length ; i++) {
    
      if(f.color[i].checked){
        a++;

      } 
  } if (a == 0) {
     document.getElementById("checkboxDiv").scrollIntoView();
     alert("Paquete, contesta el Checkbox. Pregunta 3.");
    return false;
  }
  

  for (var i = 0 ; i < f.chex1.length ; i++) {
    
      if(f.chex1[i].checked){
        b++;

      } 
  } if (b == 0) {
     document.getElementById("checkboxDiv1").scrollIntoView();
     alert("Eres el mas malo de la clase. Checkbox! Pregunta 4");
    return false;
  }
  

  for (var i = 0 ; i < f.radio1.length ; i++) {
    
      if(f.radio1[i].checked){
        c++;

      } 
  } if (c == 0) {
     document.getElementById("radio1").scrollIntoView();
     alert("Guapeton, contesta el radio. Pregunta 7.");
    return false;
  }
  

  for (var i = 0 ; i < f.radio2.length ; i++) {
    
      if(f.radio2[i].checked){
        d++;

      } 
  } if (d == 0) {
     document.getElementById("radio2").scrollIntoView();
     alert("Ya basta ¿No? ¡Contesta la pregunta RADIO!. Pregunta 8.");
    return false;
  }
  
  
  
  if(f.elements[0].value==""){

      f.elements[0].focus();
      alert("Eres un poco parguela o que! CONTESTA LA PRIMERA PREGUNTA");
      return false;
  }else
  
  if(f.elements[1].value==""){

    f.elements[1].focus();
    alert("La segunda respuesta no esta escrita, no me la lies.");
    return false;
  }else
  
  if(f.elements[13].selectedIndex==0){

    f.elements[13].focus();
    alert("Paquete, te has dejado la quinta pregunta.");
    return false;
  }else
    
  if(f.elements[14].selectedIndex==0){
    f.elements[14].scrollIntoView();
    f.elements[14].focus();
    alert("¿Piensas responderlo todo? 6....");
    return false;
  }else
    
  if(f.elements[23].selectedIndex!=0&&f.elements[23].selectedIndex!=1&&f.elements[23].selectedIndex!=2&&f.elements[23].selectedIndex!=3){
    f.elements[23].scrollIntoView();
    f.elements[23].focus();
    alert("Eres un poco malo, te tengo vigilado. Contesta la 9 pregunta.");
    return false;
  }else
    
  if(f.elements[24].selectedIndex!=0&&f.elements[24].selectedIndex!=1&&f.elements[24].selectedIndex!=2&&f.elements[24].selectedIndex!=3&&f.elements[24].selectedIndex!=4&&
  f.elements[24].selectedIndex!=5&&f.elements[24].selectedIndex!=6&&f.elements[24].selectedIndex!=7&&f.elements[24].selectedIndex!=8&&f.elements[24].selectedIndex!=9&&
  f.elements[24].selectedIndex!=10&&f.elements[24].selectedIndex!=11&&f.elements[24].selectedIndex!=12&&f.elements[24].selectedIndex!=13&&f.elements[24].selectedIndex!=14&&
  f.elements[24].selectedIndex!=15&&f.elements[24].selectedIndex!=16&&f.elements[24].selectedIndex!=17&&f.elements[24].selectedIndex!=18&&f.elements[24].selectedIndex!=19&&
  f.elements[24].selectedIndex!=20&&f.elements[24].selectedIndex!=21&&f.elements[24].selectedIndex!=22&&f.elements[24].selectedIndex!=23&&f.elements[24].selectedIndex!=24&&
  f.elements[24].selectedIndex!=25&&f.elements[24].selectedIndex!=26&&f.elements[24].selectedIndex!=27&&f.elements[24].selectedIndex!=28){
    f.elements[24].scrollIntoView();
    alert("Caca, culo, pis, pito, pene... Por favor, rellena todo el cuestionario. Pregunta 10.");
    return false;
    
  
  }else{return true;}
  
}






//**************************************************************
//GESTIONAR LA PANTALLA DE INICIO. 

function quitarPantalla(){

    document.getElementsByClassName("divdeForm")[0].style.display = "block";
    document.getElementsByClassName("wil1")[0].style.display = "block";
    document.getElementsByClassName("h2")[0].style.display = "none";
    document.getElementsByClassName("panico")[0].style.display = "none";
    document.getElementsByClassName("inset")[0].style.display = "none";
 


    
}

//f = document.getElementById('form');