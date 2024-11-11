import { useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="p-1 text-white bg-blue-300 rounded flex items-center justify-center"
      aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      {isFullscreen ? (
        <FullscreenExitIcon fontSize="medium" />
      ) : (
        <FullscreenIcon fontSize="medium" />
      )}
    </button>
  );
};

export default FullscreenToggle;
