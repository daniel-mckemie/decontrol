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
      filterRes: document.getElementById('slider4'),
      amp1Ch1: document.getElementById('slider5'),
      amp2Ch1: document.getElementById('slider6'),
      sAndHGate: document.getElementById('slider7'),
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
    allParams.filterRes.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.filterRes.value, 4)
    });
    allParams.amp1Ch1.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.amp1Ch1.value, 5)
    });
    allParams.amp2Ch1.addEventListener('input', function () {
      changeItDefault(38, 06, allParams.amp2Ch1.value, 6)
    });
    let buttVal = 0;
    allParams.sAndHGate.addEventListener('click', function () {            
      if (buttVal == 0) {
        changeItDefault(38, 06, 1, 7);
        allParams.sAndHGate.value = 'Trigger Sample & Hold - ON'
        buttVal = 1;
      }
      else {
        changeItDefault(38, 06, 0, 7);
        allParams.sAndHGate.value = 'Trigger Sample & Hold - OFF'
        buttVal = 0;
      }      
    });    
    // allParams.TBD.addEventListener('change', function () {
    //   changeItDefault(38, 12, allParams.TBD.value, 8)
    // });    
        
  }


  
  // socket.on('videoTransport', function(data) {
  //   // otherVideoTag.srcObject = data.stream;    
  //   otherVideoTag.src = URL.createObjectURL(data.stream);
  // })
});

