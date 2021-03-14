const socket = io.connect('/');

let infoDiv = document.getElementById('info');

const midiOutputSelect = document.getElementById('midi-transports');

WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
  } else {
    console.log('WedMidi enabled!');
    const transportOptions = ['midiTransport-1'];

    for (index in transportOptions) {      
      midiOutputSelect[midiOutputSelect.length] = new Option(transportOptions[index], index);
    }

    outputSocket = null;

    function setWebSocket() {
      console.log(midiOutputSelect.options[midiOutputSelect.selectedIndex].text)
      return outputSocket = midiOutputSelect.options[midiOutputSelect.selectedIndex].text;
    }
    midiOutputSelect.addEventListener('change', setWebSocket);

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
      // filterRes: document.getElementById('osc2-pan'),
      // amp1Ch1: document.getElementById('osc2-filter'),
      // amp2Ch1: document.getElementById('osc3-vol'),
      // sAndHGate: document.getElementById('osc3-pan'),
      // TBD: document.getElementById('TBD'),
      
    }


    allParams.osc1Freq.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.osc1Freq.value, 1)
    });
    allParams.osc2Freq.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.osc2Freq.value, 2)
    });
    allParams.filterFreq.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.filterFreq.value, 3)
    });
    // allParams.filterRes.addEventListener('change', function () {
    //   changeItDefault(64, 09, allParams.filterRes.value, 4)
    // });
    // allParams.amp1Ch1.addEventListener('change', function () {
    //   changeItDefault(64, 10, allParams.amp1Ch1.value, 5)
    // });
    // allParams.amp2Ch1.addEventListener('change', function () {
    //   changeItDefault(64, 50, allParams.amp2Ch1.value, 6)
    // });
    // allParams.sAndHGate.addEventListener('change', function () {
    //   changeItDefault(64, 11, allParams.sAndHGate.value, 7)
    // });
    // allParams.TBD.addEventListener('change', function () {
    //   changeItDefault(64, 12, allParams.TBD.value, 8)
    // });
        
  }
});



// // Slider objects

// let sliderDivs = document.querySelectorAll('.slider-div');
// let slider1 = document.querySelector('#slider1');
// let slider2 = document.querySelector('#slider2');
// let slider3 = document.querySelector('#slider3');



// midiChannel = 1;

// ccSlider1 = 31;
// ccSlider2 = 32;
// ccSlider3 = 33;


// function setSliderAttributes() {
//   console.log('dudem');
//   return midiChannel = document.getElementById('channel').value
//   // ccGuy = document.getElementById('cc').value

// }

// const sliderGuy1 = document.getElementById('slider1');
// sliderGuy1.addEventListener('input', function (e) {
//   console.log(midiChannel, ccSlider1)
//   e.preventDefault();
//   socket.emit(outputSocket, {
//     channel: midiChannel,
//     cc: ccSlider1,
//     value: parseInt(sliderGuy1.value)
//   });
//   socket.on(outputSocket, function (data) {
//     infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
//   })
// })

// const sliderGuy2 = document.getElementById('slider2');
// sliderGuy2.addEventListener('input', function (e) {
//   console.log(midiChannel, ccSlider2)
//   e.preventDefault();
//   socket.emit(outputSocket, {
//     channel: midiChannel,
//     cc: ccSlider2,
//     value: parseInt(sliderGuy2.value)
//   });
//   socket.on(outputSocket, function (data) {
//     infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
//   })
// })

// const sliderGuy3 = document.getElementById('slider3');
// sliderGuy3.addEventListener('input', function (e) {
//   console.log(midiChannel, ccSlider3)
//   e.preventDefault();
//   socket.emit(outputSocket, {
//     channel: midiChannel,
//     cc: ccSlider3,
//     value: parseInt(sliderGuy3.value)
//   });
//   socket.on(outputSocket, function (data) {
//     infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
//   })
// })


