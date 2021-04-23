const socket = io.connect('/');

let infoDiv = document.getElementById('info');

const midiOutputSelect = document.getElementById('midi-transports');

WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
  } else {
    console.log('WedMidi enabled!');
    
    // const transportOptions = ['midiTransport-1'];

    // for (index in transportOptions) {      
    //   midiOutputSelect[midiOutputSelect.length] = new Option(transportOptions[index], index);
    // }

    outputSocket = null;

    function setWebSocket() {
      // console.log(midiOutputSelect.options[midiOutputSelect.selectedIndex].text)
      // return outputSocket = midiOutputSelect.options[midiOutputSelect.selectedIndex].text;
      return outputSocket = 'midiTransport-1';
    }
    // midiOutputSelect.addEventListener('change', setWebSocket);
    setWebSocket();

    function changeItDefault(x, y, a, chan) {
      let val1 = a & 127;
      let val2 = a >> 7;
      // output.setNonRegisteredParameter([x, y], [val2, val1], 1);
      // let a = Math.floor(Math.random() * 64);      
      // let b = Math.floor(Math.random() * 127);
      socket.emit(outputSocket, {                
        msbx: x,  
        msby: y,
        lsbx: val2,
        lsby: val1,
        channel: chan

      });
      // socket.on(outputSocket, function (data) {
      //   infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
      // })
    }

    // MIX
    let allParams = {
      osc1Freq: document.getElementById('slider1'),      
      osc2Freq: document.getElementById('slider2'),      
      filterFreq: document.getElementById('slider3'),
      filterRes: document.getElementById('slider4'),
      amp1Ch1: document.getElementById('slider5'),      
      sAndHGate: document.getElementById('slider6'),
      envGate: document.getElementById('slider7'),
      // switchTrig: document.getElementById('slider8'),
      // TBD: document.getElementById('TBD'),
      
    }
    
    // UNCOMMENT TO HIDE
    // for (const property in allParams) {
    //   allParams[property].style.visibility = 'hidden';
    //   // console.log(allParams[property].style.visibility);      
    // }


    allParams.osc1Freq.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.osc1Freq.value, 1)
    });
    allParams.osc2Freq.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.osc2Freq.value, 2)
    });
    allParams.filterFreq.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.filterFreq.value, 3)
    });
    allParams.filterRes.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.filterRes.value, 4)
    });
    allParams.amp1Ch1.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.amp1Ch1.value, 5)
    });

    let buttVal1 = 0;
    allParams.sAndHGate.addEventListener('click', function () {            
      if (buttVal1 == 0) {
        changeItDefault(38, 06, 1, 6);
        allParams.sAndHGate.value = 'Trigger Sample & Hold - ON'
        buttVal1 = 1;
      }
      else {
        changeItDefault(38, 06, 0, 6);
        allParams.sAndHGate.value = 'Trigger Sample & Hold - OFF'
        buttVal1 = 0;
      }      
    });

    let buttVal2 = 0;
    allParams.envGate.addEventListener('click', function () {
      if (buttVal2 == 0) {
        changeItDefault(38, 06, 1, 7);
        allParams.envGate.value = 'Envelope Gate Random - ON'
        buttVal2 = 1;
      } else {
        changeItDefault(38, 06, 0, 7);
        allParams.envGate.value = 'Envelope Gate Random - OFF'
        buttVal2 = 0;
      }
    });
    
    // let buttVal3 = 0;
    // allParams.switchTrig.addEventListener('click', function () {
    //   if (buttVal3 == 0) {
    //     changeItDefault(38, 06, 1, 8);
    //     allParams.switchTrig.value = 'Switch - A'
    //     buttVal3 = 1;
    //   } else {
    //     changeItDefault(38, 06, 0, 8);
    //     allParams.switchTrig.value = 'Switch - B'
    //     buttVal3 = 0;
    //   }
    // });

    // allParams.TBD.addEventListener('change', function () {
    //   changeItDefault(38, 12, allParams.TBD.value, 8)
    // });
    // function fadeIn(element) {
    //   var op = 0.1; // initial opacity      
    //   var timer = setInterval(function () {
    //     if (op >= 1) {
    //       clearInterval(timer);
    //       element.style.visibility = 'visible';
    //     }
    //     element.style.opacity = op;
    //     element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    //     op += op * 0.05;
    //   }, 10);
    // }

    // function fadeOut(element) {      
    //   var op = 1; // initial opacity
    //   var timer = setInterval(function () {
    //     if (op <= 0.1) {
    //       clearInterval(timer);
    //       element.style.visibility = 'hidden';
    //     }
    //     element.style.opacity = op;
    //     element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    //     op -= op * 0.05;
    //   }, 10);
    // }

    // randomIntervalFadeIn = 5000;
    // setInterval(() => {
    //   randomIntervalFadeIn = Math.floor(Math.random() * 30000) + 3000;
    // }, 5000);

    // randomIntervalFadeOut = 1000;
    // setInterval(() => {
    //   randomIntervalFadeOut = Math.floor(Math.random() * 1000);
    // }, 100);

    
    // setInterval(() => {      
    //   let randomElement = Math.floor(Math.random() * Object.keys(allParams).length);      
    //   if (allParams[Object.keys(allParams)[randomElement]].style.visibility == 'hidden') {
    //     fadeIn(allParams[Object.keys(allParams)[randomElement]]);
    //   }      
    // }, randomIntervalFadeIn);
    
    // setInterval(() => {         
    //   let randomElement = Math.floor(Math.random() * Object.keys(allParams).length);
    //   if (allParams[Object.keys(allParams)[randomElement]].style.visibility == 'visible') {
    //     fadeOut(allParams[Object.keys(allParams)[randomElement]]);
    //   }
    // }, randomIntervalFadeOut);    
  }

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

});

