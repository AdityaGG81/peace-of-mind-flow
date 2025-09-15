import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
  category: string;
}

interface AudioPlayerProps {
  tracks: AudioTrack[];
  currentTrackIndex: number;
  onTrackChange: (index: number) => void;
  onClose: () => void;
}

export const AudioPlayer = ({ tracks, currentTrackIndex, onTrackChange, onClose }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks[currentTrackIndex];

  // 🎯 When track changes, load & auto-play
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrackIndex]);

  // 🎯 Keep isPlaying in sync with the actual audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleNext = () => {
    const nextIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
    onTrackChange(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
    onTrackChange(prevIndex);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
    setVolume(value[0]);
    setIsMuted(false);
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardContent className="p-6 space-y-6">
          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={handleNext}
          />

          {/* Track Info */}
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="h-10 w-10 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground">{currentTrack.description}</p>
            <div className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {currentTrack.category}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={handlePrevious}
              size="sm"
              variant="outline"
              className="rounded-full w-10 h-10 p-0"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              onClick={handlePlayPause}
              size="lg"
              className="rounded-full w-14 h-14 p-0"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>

            <Button
              onClick={handleNext}
              size="sm"
              variant="outline"
              className="rounded-full w-10 h-10 p-0"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleMuteToggle}
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>

          {/* Track List */}
          <div className="max-h-40 overflow-y-auto space-y-2">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  index === currentTrackIndex 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => onTrackChange(index)}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.duration}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="text-center pt-4">
            <Button onClick={onClose} variant="ghost">
              Close Player
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
