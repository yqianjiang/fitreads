import { useState, useEffect } from 'react';
import { IconButton, Slider, Stack } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

function AudioPlayer({ content }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceId, setVoiceId] = useState(144);
  const [speed, setSpeed] = useState(0.8);

  useEffect(() => {
    // 当前浏览器不支持 SpeechSynthesis API
    if (!window.speechSynthesis) {
      console.log('SpeechSynthesis API not supported.');
      return;
    }

    // 创建新的 SpeechSynthesisUtterance 实例
    const utterance = new SpeechSynthesisUtterance(content);

    // 设置语速
    utterance.rate = speed;

    // 设置声音
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[voiceId];

    // 当播放结束时停止播放
    utterance.onend = () => setIsPlaying(false);

    // 开始朗读
    if (isPlaying) {
      window.speechSynthesis.speak(utterance);
    }

    // 停止朗读
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isPlaying, speed, voiceId, content]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      window.speechSynthesis.pause();
    }
  };

  const handleSpeedChange = (event, value) => {
    setSpeed(value);
  };

  // const handleSetVoice = (value) => {
  //   setVoiceId(value)
  // }

  return (
    <Stack direction={'row'}>
      <IconButton onClick={handlePlayPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <p>语速：</p>
      <Slider
        value={speed}
        min={0.5}
        max={2}
        step={0.1}
        onChange={handleSpeedChange}
      />
    </Stack>
  );
}

export default AudioPlayer;


//   const speak = (voiceId=145) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(content);

//     synth.speak(utterance);
//   };


//   return (
//     <div>

//       <IconButton onClick={handlePlayPause}>
//         {isPlaying ? <Pause /> : <PlayArrow />}
//       </IconButton>
//     </div>
//   );
// }

// export default AudioPlayer;