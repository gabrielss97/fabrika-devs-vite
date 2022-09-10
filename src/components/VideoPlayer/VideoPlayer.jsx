/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useRef, useEffect } from 'react';

import { FaPause, FaPlay } from 'react-icons/fa';
import { RiFullscreenLine } from 'react-icons/ri';

function usePlayerState($videoPlayer) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    percentage: 0,
  });

  const toggleVideoPlay = () => {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  };

  const handleTimeUpdate = () => {
    const currentPercentage =
      ($videoPlayer.current.currentTime / $videoPlayer.current.duration) * 100;

    setPlayerState({
      ...playerState,
      percentage: currentPercentage,
    });
  };

  const handleChangeVideoPercentage = (e) => {
    const currentPercentageValue = e.target.value;

    $videoPlayer.current.currentTime =
      ($videoPlayer.current.duration / 100) * currentPercentageValue;

    setPlayerState({
      ...playerState,
      percentage: currentPercentageValue,
    });
  };

  const handleSpeed = (e) => {
    $videoPlayer.current.playbackRate = e.target.value;
  };

  const handleFullScreen = () => {
    $videoPlayer.current.requestFullscreen();
  };

  useEffect(() => {
    if (playerState.playing) {
      $videoPlayer.current.play();
    } else {
      $videoPlayer.current.pause();
    }
  }, [playerState.playing, $videoPlayer]);

  return {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage,
    handleSpeed,
    handleFullScreen,
  };
}

const VideoPlayer = ({ video }) => {
  const $videoPlayer = useRef(null);
  const {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage,
    handleSpeed,
    handleFullScreen,
  } = usePlayerState($videoPlayer);

  return (
    <div className='relative bg-cBlack'>
      {playerState.playing === false && (
        <div className='w-full h-full absolute flex items-center justify-center bg-[#11111150] '>
          <h1 className='absolute top-0 left-0 text-2xl text-cWhite w-full bg-cBlack p-4 font-bold '>
            {video && video.title}
          </h1>
          <div className='flex items-center justify-center p-8 text-xl bg-cBlue rounded-full text-cWhite '>
            <FaPlay />
          </div>
        </div>
      )}
      <video
        ref={$videoPlayer}
        src={video && video.videoUrl}
        onTimeUpdate={handleTimeUpdate}
        className='w-full xl:w-[80%] mx-auto'
        onClick={toggleVideoPlay}
      />
      <div className='flex p-4 bg-cLtGray items-center gap-4'>
        <button type='button' onClick={toggleVideoPlay} className='text-cBlue'>
          {playerState.playing ? <FaPause /> : <FaPlay />}
        </button>
        <input
          className='w-full'
          type='range'
          min='0'
          max='100'
          value={playerState.percentage || 0}
          onChange={handleChangeVideoPercentage}
        />
        <select
          className='bg-cLtGray text-xs font-bold text-cBlue'
          onChange={handleSpeed}>
          <option value='1'>1x</option>
          <option value='1.25'>1.25x</option>
          <option value='1.5'>1.5x</option>
          <option value='1.75'>1.75x</option>
          <option value='2'>2x</option>
        </select>

        <RiFullscreenLine
          className='text-cBlue font-bold text-2xl cursor-pointer'
          onClick={handleFullScreen}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
