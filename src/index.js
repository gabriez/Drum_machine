/*------------------------------------------------------------------------
/------------------------------KNOB---------------------------------------
/------------------------------------------------------------------------*/

let buttonOn = false; 
let switchBeat = false; 

let beatSrc = {
    firstBeat : '../assets/Clap.mp3',
    secondBeat : '../assets/Heater-1.mp3',
    thirdBeat: '../assets/Heater-2.mp3',
    fourthBeat: '../assets/Heater-3.mp3',
    fifthBeat: '../assets/Heater-4_1.mp3',
    sixthBeat: '../assets/Open-hh.mp3'
}

let soundsBTN = document.getElementsByClassName('sounds_btn');
let knobPositionX;
let knobPositionY;
let mouseX;
let mouseY;
let knobCenterX;
let knobCenterY;
let adjacentSide;
let oppositeSide;
let currentRadiansAngle;
let getRadiansInDegrees;
let finalAngleInDegrees;
let volumeSetting;
let tickHighlightPosition;
let audioBeat = new Audio(''); 
//Celine Dion's "Ashes"
let startingTickAngle = -135;
let tickContainer = document.getElementById("tickContainer");
let volumeKnob = document.getElementById("knob");
let boundingRectangle = volumeKnob.getBoundingClientRect(); //get rectangular geometric data of knob (x, y, width, height)
let globalAudioVolume = 0;
let checkOnOff = document.getElementById('turnOnOff_checkbox');
/*-----------------------BUTTONS--------------------*/
function defineAudio (e) {
/* DEFINE BEATS NAMES AND AUDIOS */
    let beatName = "";
    let beatLink = "";
    let soundID = e.target.id;
    switch (soundID) {
     case 'sounds_1':
        beatLink = beatSrc.firstBeat;
        beatName = 'Clap';
        break;
     case 'sounds_2':
         beatLink = beatSrc.secondBeat;
         beatName = 'Heater-1';
         break;
     case 'sounds_3':
         beatLink = beatSrc.thirdBeat;
         beatName = 'Heater-2';
         break
     case 'sounds_4':
         beatLink = beatSrc.fourthBeat;
         beatName = 'Heater-3';
         break
     case 'sounds_5':
         beatLink = beatSrc.fifthBeat;
         beatName = 'Heater-4';
         break
     case 'sounds_6':
         beatLink = beatSrc.sixthBeat;
         beatName = 'Open-hh';
         break
     // case 'sounds_7':
     //  return beatSrc.firstBeat;
     // case 'sounds_8':
     //  return beatSrc.firstBeat;
     // case 'sounds_9':   
     //  return beatSrc.firstBeat;
     default:
        break;
    }

    
    
    audioBeat = new Audio(beatLink);
    
    if (checkOnOff.checked) {
        document.getElementsByClassName('showName')[0].innerHTML = `<p>${beatName}</p>`;
        audioBeat.volume = globalAudioVolume;
        drawAudioMain(audioBeat);
    }

   
 }

/* -------------------MAIN----------------- */

function main()
{
    //start at zero volume
    
    for(let button of soundsBTN){
        button.addEventListener('click', defineAudio);
    }
    
    volumeKnob.addEventListener(getMouseDown(), onMouseDown); //listen for mouse button click

    document.addEventListener(getMouseUp(), onMouseUp); //listen for mouse button release
    createTicks(27, 0);
}

//on mouse button down
function onMouseDown()
{
    
        //mobile users must tap anywhere to start audio
        //https://developers.google.com/web/updates/2017/09/autoplay-policy-change



    document.addEventListener(getMouseMove(), onMouseMove); //start drag
}

//on mouse button release
function onMouseUp()
{
    document.removeEventListener(getMouseMove(), onMouseMove); //stop drag
}

//compute mouse angle relative to center of volume knob
//For clarification, see my basic trig explanation at:
//https://www.quora.com/What-is-the-significance-of-the-number-pi-to-the-universe/answer/Kevin-Lam-15
function onMouseMove(event)
{
    knobPositionX = boundingRectangle.left; //get knob's global x position
    knobPositionY = boundingRectangle.top; //get knob's global y position
    
    if(detectMobile() == "desktop")
    {
        mouseX = event.pageX; //get mouse's x global position
        mouseY = event.pageY; //get mouse's y global position
    } else {
        mouseX = event.touches[0].pageX; //get finger's x global position
        mouseY = event.touches[0].pageY; //get finger's y global position
    }

    knobCenterX = boundingRectangle.width / 2 + knobPositionX; //get global horizontal center position of knob relative to mouse position
    knobCenterY = boundingRectangle.height / 2 + knobPositionY; //get global vertical center position of knob relative to mouse position

    adjacentSide = knobCenterX - mouseX; //compute adjacent value of imaginary right angle triangle
    oppositeSide = knobCenterY - mouseY; //compute opposite value of imaginary right angle triangle
    //arc-tangent function returns circular angle in radians
    //use atan2() instead of atan() because atan() returns only 180 degree max (PI radians) but atan2() returns four quadrant's 360 degree max (2PI radians)
    currentRadiansAngle = Math.atan2(adjacentSide, oppositeSide);

    getRadiansInDegrees = currentRadiansAngle * 180 / Math.PI; //convert radians into degrees

    finalAngleInDegrees = -(getRadiansInDegrees - 135); //knob is already starting at -135 degrees due to visual design so 135 degrees needs to be subtracted to compensate for the angle offset, negative value represents clockwise direction

    //only allow rotate if greater than zero degrees or lesser than 270 degrees
    if(finalAngleInDegrees >= 0 && finalAngleInDegrees <= 270)
    {
        volumeKnob.style.transform = "rotate(" + finalAngleInDegrees + "deg)"; //use dynamic CSS transform to rotate volume knob

        //270 degrees maximum freedom of rotation / 100% volume = 1% of volume difference per 2.7 degrees of rotation
        volumeSetting = Math.floor(finalAngleInDegrees / (270 / 100));

        tickHighlightPosition = Math.round((volumeSetting * 2.7) / 10); //interpolate how many ticks need to be highlighted

        createTicks(27, tickHighlightPosition); //highlight ticks
         //set audio volume
        globalAudioVolume = volumeSetting / 100;
       
    }
}

//dynamically create volume knob "ticks"
function createTicks(numTicks, highlightNumTicks)
{
    //reset first by deleting all existing ticks
    while(tickContainer.firstChild)
    {
        tickContainer.removeChild(tickContainer.firstChild);
    }

    //create ticks
    for(var i=0;i<numTicks;i++)
    {
        var tick = document.createElement("div");

        //highlight only the appropriate ticks using dynamic CSS
        if(i < highlightNumTicks)
        {
            tick.className = "tick activetick";
        } else {
            tick.className = "tick";
        }

        tickContainer.appendChild(tick);
        tick.style.transform = "rotate(" + startingTickAngle + "deg)";
        startingTickAngle += 10;
    }

    startingTickAngle = -135; //reset
}

//detect for mobile devices from https://www.sitepoint.com/navigator-useragent-mobiles-including-ipad/
function detectMobile()
{
    var result = (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i));

    if(result !== null)
    {
        return "mobile";
    } else {
        return "desktop";
    }
}

function getMouseDown()
{
    if(detectMobile() == "desktop")
    {
        return "mousedown";
    } else {
        return "touchstart";
    }
}

function getMouseUp()
{
    if(detectMobile() == "desktop")
    {
        return "mouseup";
    } else {
        return "touchend";
    }
}

function getMouseMove()
{
    if(detectMobile() == "desktop")
    {
        return "mousemove";
    } else {
        return "touchmove";
    }
}



main();


/* KNOB CREDIT FOR KEVIN LAM https://codepen.io/kevin-lam-the-scripter/pen/QWNeNvo */



/*--------------------------------------------------------------------------------------------------
-----------------------FUNCTIONS TO DISPLAY THE SOUNDWAVE-------------------------------------------
----------------------------------------------------------------------------------------------------*/


// 1. Definir los elementos y los eventos
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = "253";
canvas.height = "193";


// 3. Crear la animación con canvas
const drawAudio = (analyser) => {
  
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  requestAnimationFrame(() => drawAudio(analyser));
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = (WIDTH / bufferLength)*1.75;
  let x = 0;
  analyser.getByteFrequencyData(dataArray);
  ctx.fillStyle = "#111111";
  ctx.clearRect(0,0,canvas.width,canvas.height);
  console.log(dataArray);
  // all the magic
  dataArray.forEach((decibel, index) => {
    console.log("drawing");
    const c = index / bufferLength;
    const r = decibel + 25 * c;
    const g = 250 * c;
    const b = 250;
    
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, HEIGHT - decibel, barWidth, decibel - 1);
    x += barWidth + 1;
  });
  
};

// 2. Crear el analyser y la data necesaria
const initAnalyser = async (audio) => {
  // all the setup
  const context = new AudioContext();
  const src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 256;
  return analyser;
};

const drawAudioMain = async (audio) => {
  const analyser = await initAnalyser(audio);
  drawAudio(analyser);
  audio.play();
  // dibujar
  

ctx.fillRect(0, 0, canvas.width, canvas.height);

};

// listener


 
// Credits for Hector Bliss https://www.youtube.com/watch?v=B_nytc1jJE0&t=614s