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
    midiOutputSelect.addEventListener('change', setWebSocket)

    
  }
});



// Slider objects

let sliderDivs = document.querySelectorAll('.slider-div');
let slider1 = document.querySelector('#slider1');
let slider2 = document.querySelector('#slider2');
let slider3 = document.querySelector('#slider3');



midiChannel = 1;

ccSlider1 = 31;
ccSlider2 = 32;
ccSlider3 = 33;


function setSliderAttributes() {
  console.log('dudem');
  return midiChannel = document.getElementById('channel').value
  // ccGuy = document.getElementById('cc').value

}

const sliderGuy1 = document.getElementById('slider1');
sliderGuy1.addEventListener('input', function (e) {
  console.log(midiChannel, ccSlider1)
  e.preventDefault();
  socket.emit(outputSocket, {
    channel: midiChannel,
    cc: ccSlider1,
    value: parseInt(sliderGuy1.value)
  });
  socket.on(outputSocket, function (data) {
    infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
  })
})

const sliderGuy2 = document.getElementById('slider2');
sliderGuy2.addEventListener('input', function (e) {
  console.log(midiChannel, ccSlider2)
  e.preventDefault();
  socket.emit(outputSocket, {
    channel: midiChannel,
    cc: ccSlider2,
    value: parseInt(sliderGuy2.value)
  });
  socket.on(outputSocket, function (data) {
    infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
  })
})

const sliderGuy3 = document.getElementById('slider3');
sliderGuy3.addEventListener('input', function (e) {
  console.log(midiChannel, ccSlider3)
  e.preventDefault();
  socket.emit(outputSocket, {
    channel: midiChannel,
    cc: ccSlider3,
    value: parseInt(sliderGuy3.value)
  });
  socket.on(outputSocket, function (data) {
    infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
  })
})


