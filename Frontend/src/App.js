import React, { useState } from 'react';
import LivestreamPlayer from './LivestreamPlayer';
import OverlayOptions from './OverlayOptions';
import './App.css';
const App = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const rtspUrl = 'rtsp://rtspstream.com/parking';

  return (
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <div style={{ marginRight: '30px' }}>
    <h2>Livestream App</h2>
    <LivestreamPlayer
      rtspUrl={rtspUrl}
      setPlaying={setPlaying}
      playing={playing}
      volume={volume}
      setVolume={setVolume}
    />
  </div>
  <div>
    <OverlayOptions />
  </div>
</div>

  );
};

export default App;
