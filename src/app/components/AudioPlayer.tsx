'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

interface AudioPlayerProps {
  audioUrl: string
  onPlay: () => void
  isActive: boolean
}

export default function AudioPlayer({ audioUrl, onPlay, isActive }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress)
      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        setProgress(0)
      })
      return () => {
        audio.removeEventListener('timeupdate', updateProgress)
        audio.removeEventListener('ended', () => {
          setIsPlaying(false)
          setProgress(0)
        })
      }
    }
  }, [])

  useEffect(() => {
    if (!isActive && isPlaying) {
      pauseAndReset()
    }
  }, [isActive])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        pauseAndReset()
      } else {
        onPlay()
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const pauseAndReset = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setProgress(0)
    }
  }

  const updateProgress = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current
      setProgress((currentTime / duration) * 100)
    }
  }

  const setAudioProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left
    const progressPercentage = (clickPosition / progressBar.offsetWidth) * 100
    setProgress(progressPercentage)
    if (audioRef.current) {
      audioRef.current.currentTime = (progressPercentage / 100) * audioRef.current.duration
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <div 
        className="flex-grow h-2 bg-gray-200 rounded cursor-pointer"
        onClick={setAudioProgress}
      >
        <div 
          className="h-full bg-green-600 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  )
}

