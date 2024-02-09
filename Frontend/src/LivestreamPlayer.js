import React from 'react';
import ReactPlayer from 'react-player';

const LivestreamPlayer = ({ rtspUrl, setPlaying, playing, volume, setVolume }) => {
  return (
    <div style={{ marginLeft: '15px'}}>
      <ReactPlayer
        url={rtspUrl}
        playing={playing}
        controls
        volume={volume}
        width="640px"
        height="360px"
      />
    </div>
  );
};

export default LivestreamPlayer;
