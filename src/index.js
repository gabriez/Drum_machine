import './styles/index.css'
import Clap from './assets/Clap.mp3';
import Style from './assets/Style.mp3'
import Humble from './assets/HUMBLE.mp3';
import Heater1 from './assets/Heater-1.mp3'
import Sunflower from './assets/Sunflower.mp3'
import Provenza from './assets/Provenza.mp3'
import Heater2 from './assets/Heater-2.mp3'
import Heater3 from './assets/Heater-3.mp3'
import Heater4 from './assets/Heater-4_1.mp3'
import Moscow from './assets/Moscow-mule.mp3'
import OpenHH from './assets/Open-hh.mp3'
import Quinientos from './assets/512.mp3'
import Fluorescent from './assets/Fluorescent-Adolescent.mp3'
import OjosMarrones from './assets/Ojos-marrones.mp3'
import UntilFound from './assets/Until_I_Found_You.mp3'
import Breezeblocks from './assets/Breezeblocks.mp3'
import Stressed from './assets/Stressed-out.mp3'
import Ojos from './assets/Ojos-color-sol.mp3'
/*------------------------------------------------------------------------
/------------------------------KNOB---------------------------------------
/------------------------------------------------------------------------*/

// Style, HUMBLE, Ojos-color-sol, Ojos-marrones, 512, Fluorescent-Adolescent, Until_I_Found_You, Breezeblocks, Provenza

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
let audioBeat = new Audio(); 
//Celine Dion's "Ashes"
let startingTickAngle = -135;
let tickContainer = document.getElementById("tickContainer");
let volumeKnob = document.getElementById("knob");
let boundingRectangle = volumeKnob.getBoundingClientRect(); //get rectangular geometric data of knob (x, y, width, height)
let globalAudioVolume = 0;
let checkOnOff = document.getElementById('turnOnOff_checkbox');
let changeBeats = document.getElementById('switch_sounds');
let showName = document.getElementsByClassName('showName')[0];

let beatSrc = {
    firstBeat : {
       route: Clap ,
        name: 'Clap'
    },
    secondBeat : {
        route:  Heater1,
        name:  'Heater-1'
    },
    thirdBeat: {
        route: Heater2,
        name:  'Heater-2'
    },
    fourthBeat: {
        route: Heater3,
        name:  'Heater-3'
    },
    fifthBeat: {
        route: Heater4 ,
        name:  'Heater-4' 
    },
    sixthBeat: {
        route: OpenHH,
        name:  'Open-hh'
    },
    seventhBeat: {
        route: Stressed ,
        name:  'Stressed Out Remix' 
    },
    eightBeat: {
        route: Moscow,
        name:  'Moscow-mule'
    },
    ninethBeat: {
        route: Sunflower,
        name:  'Sunflower'
    }
}



// Style, HUMBLE, Ojos-color-sol, Ojos-marrones, 512, Fluorescent-Adolescent, Until_I_Found_You, Breezeblocks, Provenza

/*-----------------------BUTTONS--------------------*/

function defineAudio (e) {    
/* DEFINE BEATS NAMES AND AUDIOS */
    let beatName = "";
    let beatLink = "";
    let soundID = e.target.id;
    switch (soundID) {
     case 'sounds_1':
        beatLink = beatSrc.firstBeat.route;
        beatName = beatSrc.firstBeat.name;
        break;
     case 'sounds_2':
         beatLink = beatSrc.secondBeat.route;
         beatName = beatSrc.secondBeat.name;
         break;
     case 'sounds_3':
         beatLink = beatSrc.thirdBeat.route;
         beatName = beatSrc.thirdBeat.name;
         break
     case 'sounds_4':
         beatLink = beatSrc.fourthBeat.route;
         beatName = beatSrc.fourthBeat.name;
         break
     case 'sounds_5':
         beatLink = beatSrc.fifthBeat.route;
         beatName = beatSrc.fifthBeat.name;
         break
     case 'sounds_6':
         beatLink = beatSrc.sixthBeat.route;
         beatName = beatSrc.sixthBeat.name;
         break
    case 'sounds_7':
        beatLink = beatSrc.seventhBeat.route;
        beatName = beatSrc.seventhBeat.name;
    break
    case 'sounds_8':
        beatLink = beatSrc.eightBeat.route;
        beatName = beatSrc.eightBeat.name;
    break;
    case 'sounds_9':   
        beatLink = beatSrc.ninethBeat.route;
        beatName = beatSrc.ninethBeat.name;
     break;
     default:
        break;
    }
 
   
    audioBeat.pause();
    audioBeat = new Audio(beatLink);
    audioBeat.volume = globalAudioVolume;
    audioBeat.crossOrigin = "anonymous";

    if (checkOnOff.checked) {
    showName.innerHTML = `<p>${beatName}</p>`;
        
    drawAudioMain(audioBeat, soundID);
    
    }   
 }

/* -------------------MAIN----------------- */

function main()
{

    changeBeats.addEventListener('change', (e) => {
        beatSrc = {
            firstBeat : {
                route: !changeBeats.checked ? Clap : Style,
                 name: !changeBeats.checked ? 'Clap' : 'Style'
             },
             secondBeat : {
                route: !changeBeats.checked ? Heater1 : Humble,
                name: !changeBeats.checked ? 'Heater-1' : 'Humble'
            },
            thirdBeat: {
                route:!changeBeats.checked ? Heater2: Fluorescent,
                name: !changeBeats.checked ? 'Heater-2' : 'Fluorescent Adolescent'
            },
            fourthBeat: {
                route:!changeBeats.checked ? Heater3 : UntilFound,
                name: !changeBeats.checked ? 'Heater-3' : 'Until I Found You'
            },
            fifthBeat: {
                route:!changeBeats.checked ? Heater4 : Breezeblocks,
                name: !changeBeats.checked ? 'Heater-4' : 'Breezeblocks'
            },
            sixthBeat: {
                route:!changeBeats.checked ? OpenHH: Ojos,
                name: !changeBeats.checked ? 'Open-hh' : 'Ojos color sol'
            },
            seventhBeat: {
                route:!changeBeats.checked ? Stressed : OjosMarrones,
                name: !changeBeats.checked ? 'Stressed Out Remix' : 'Ojos marrones'
            },
            eightBeat: {
                route:!changeBeats.checked ? Moscow : Quinientos,
                name: !changeBeats.checked ? 'Moscow-mule' : '512'
            },
            ninethBeat: {
                route:!changeBeats.checked ? Sunflower : Provenza,
                name: !changeBeats.checked ? 'Sunflower' : 'Provenza'
            }
        };
    })
    //start at zero volume
   
    

    for(let button of soundsBTN){
        button.addEventListener('click', defineAudio);
    }
 
        document.onkeydown = (e) => {
      e = e || window.event;

      switch (e.which || e.keyCode) {
        case 81 :
            soundsBTN[0].click();
            break;
        case 87 :
            soundsBTN[1].click();
            break;
        case 69 :
            soundsBTN[2].click();
            break;            
        case 65 :
            soundsBTN[3].click();
            break;
        case 83 :
            soundsBTN[4].click();
            break;
        case 68 :
            soundsBTN[5].click();
            break;            
        case 90 :
            soundsBTN[6].click();
            break;
        case 88 :
            soundsBTN[7].click();
            break;
        case 67 :
            soundsBTN[8].click();
            break;            
        }
    }

    checkOnOff.addEventListener('change', (event) => {
        if (!event.currentTarget.checked) {
            audioBeat.pause();
            showName.innerHTML = ``;
        }
    })
    
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
        console.log(finalAngleInDegrees / (270 / 100))

        tickHighlightPosition = Math.round((volumeSetting * 2.7) / 10); //interpolate how many ticks need to be highlighted

        createTicks(27, tickHighlightPosition); //highlight ticks
         //set audio volume
        globalAudioVolume = volumeSetting / 100;
        audioBeat.volume = globalAudioVolume;
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
const canvas = document.getElementsByClassName("sound_wave")[0];
const ctx = canvas.getContext("2d");
canvas.width = "300";
canvas.height = "250";
// 3. Crear la animación con canvas
const drawAudio = (analyser) => {
  
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  requestAnimationFrame(() => drawAudio(analyser));
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = (WIDTH / bufferLength)*1.2;
  let x = 0;
  analyser.getByteFrequencyData(dataArray);
  ctx.fillStyle = "#111111";
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // all the magic
  dataArray.forEach((decibel, index) => {
    const c = index / bufferLength;
    const r = decibel + 100 * c;
    const g = 250 * c;
    const b = 200;
    
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, HEIGHT - decibel/1.05, barWidth, decibel/1.05);
    x += barWidth + 0.75;
  });

};


const drawColors = (analyser, red, green, elementoButton) => {
    
   
    requestAnimationFrame(() => drawColors(analyser, red, green, elementoButton));
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    let  r = red, g = green, b = 200; 

    let sum = 0;
    for(let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }

    //Change CSS according to threshold
    let avg = (sum / bufferLength) / 5;
   if(avg < 0.2){
    elementoButton.style.backgroundColor = "rgb(34, 34, 34)";
    elementoButton.style.filter = "drop-shadow(5px 2px 5px rgba(0, 0, 0, 0.28))";
   } else {
    elementoButton.style.backgroundColor = `rgba(${r * avg}, ${g * avg * 0.1}, ${b}, 1)`;
    elementoButton.style.filter = `drop-shadow(0 0 ${avg * 0.8}px rgba(${r * avg}, ${g * avg *0.1}, ${b}, 0.8))`;    
   }    
    
}

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

const drawAudioMain = async (audio, buttonID) => {
  const analyser = await initAnalyser(audio);
  drawAudio(analyser);
  let redVar = Math.random() * 100, greenVar =  Math.random() * 100;

  const elemento = document.getElementById(buttonID);
  drawColors(analyser, redVar, greenVar, elemento);
  audio.play();
  // dibujar
  

ctx.fillRect(0, 0, canvas.width, canvas.height);

};

// listener


 
// Credits for Hector Bliss https://www.youtube.com/watch?v=B_nytc1jJE0&t=614s


