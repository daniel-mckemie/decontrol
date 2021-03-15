const socket = io.connect('/');

const infoDiv = document.getElementById('info');

const midiOutputSelect = document.getElementById('midi-outputs');


WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
    infoDiv.innerHTML = ('WebMidi could not be enabled', err);
  } else {
    console.log('WedMidi enabled!');
    for (index in WebMidi.outputs) {
      midiOutputSelect.options[midiOutputSelect.options.length] = new Option(WebMidi.outputs[index].name, index);
    }
    
    output = null;
    function getMidiOutput() {      
      return output = WebMidi.getOutputByName(midiOutputSelect.options[midiOutputSelect.selectedIndex].text);            
    }
    midiOutputSelect.addEventListener('change', getMidiOutput)
    
    socket.on('midiTransport-1', function (data) {
      // console.log(`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value} / ${data.time}`)
      infoDiv.innerHTML = (`MSB: ${data.msbx}, ${data.msby} / LSB: ${data.lsbx}, ${data.lsby} / Channel: ${data.channel}`);
      // output.sendControlChange(data.cc, data.value, data.channel);      
      output.setNonRegisteredParameter([data.msbx, data.msby], [data.lsbx, data.lsby], data.channel);
    })
    
  }
});







// VIDEO STREAM WORK

// // Grab Devices
// inputDeviceArray = [];
// inputDeviceId = null;

// const videoStream = document.getElementById('mainVideoTag')
// const otherVideoStream = document.getElementById('otherVideoTag')

// const deviceSelect = document.getElementById('device-inputs');


// function handleVideo(vid) {
//   otherVideoStream.srcObject = vid;
//   streamStarted = true;
//   setInterval(() => {
//     socket.emit('videoTransport', {
//       stream: vid
//     })
//   }, 33);
// }

// function getDevices() {
//   navigator.mediaDevices.enumerateDevices().then(function (devices) {
//     devices.forEach(function (device) {
//       deviceSelect.options[deviceSelect.options.length] = new Option(device.label);
//       inputDeviceArray.push(device.deviceId);

//       // console.log(device.kind + ": " + device.label +
//       //   " id = " + device.deviceId);
//     });

//     function chooseDevice() {
//       return inputDeviceId = inputDeviceArray[deviceSelect.selectedIndex];
//     }

//     deviceSelect.addEventListener('change', chooseDevice)
//   })
// }
// window.onload = getDevices();


// function startVideo() {
//   // if (dc.readyState == 'connecting') {
//   //   startButton.disabled = false;
//   //   console.log(dc.readyState)
//   // } else {
//   startVideoButton.disabled = true;
//   // setAudioButton.disabled = true;
//   navigator.mediaDevices.getUserMedia({
//     audio: {
//       sampleRate: 44100,       
//       latency: 0,
//       deviceId: inputDeviceId,
//       channelCount: 1,
//       echoCancellation: false,
//       noiseSuppression: false,
//       autoGainControl: false
//     },
//     // video: {
//     //   height: 320,
//     //   width: 240
//     // }
//     video: true
//   }).then(handleVideo);
// }





