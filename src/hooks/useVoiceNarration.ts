import { useCallback, useEffect, useRef, useState } from 'react';
import { NARRATION_TRACKS } from '../data/homeContent';
import { NarrationTrackId } from '../types';

interface UseVoiceNarrationReturn {
  activeTrackId: NarrationTrackId;
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
  progress: number;
  selectTrack: (trackId: NarrationTrackId) => void;
  playTrack: (trackId?: NarrationTrackId) => Promise<void>;
  stop: () => void;
  replay: () => Promise<void>;
}

export function useVoiceNarration(): UseVoiceNarrationReturn {
  const [activeTrackId, setActiveTrackId] = useState<NarrationTrackId>(NarrationTrackId.WELCOME);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlCacheRef = useRef<Map<NarrationTrackId, string>>(new Map());
  const requestCounterRef = useRef(0);

  const cleanupAudioElement = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onerror = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupAudioElement();
      urlCacheRef.current.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl);
      });
      urlCacheRef.current.clear();
    };
  }, [cleanupAudioElement]);

  const fetchTrackAudioUrl = useCallback(async (trackId: NarrationTrackId): Promise<string> => {
    const cachedUrl = urlCacheRef.current.get(trackId);
    if (cachedUrl) {
      return cachedUrl;
    }

    const track = NARRATION_TRACKS.find((item) => item.id === trackId);
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trackId,
        text: track?.script ?? '',
      }),
    });

    const data = (await response.json()) as {
      audioBase64?: string;
      mimeType?: string;
      error?: string;
    };

    if (!response.ok || !data.audioBase64) {
      throw new Error(data.error || 'Suara AI tidak dapat dimainkan buat masa ini.');
    }

    const binaryString = atob(data.audioBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
    const objectUrl = URL.createObjectURL(blob);
    urlCacheRef.current.set(trackId, objectUrl);
    return objectUrl;
  }, []);

  const playFromUrl = useCallback(
    async (objectUrl: string) => {
      cleanupAudioElement();

      const audio = new Audio(objectUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (audio.duration && Number.isFinite(audio.duration)) {
          setProgress(Math.min(100, Math.round((audio.currentTime / audio.duration) * 100)));
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setProgress(100);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setError('Fail audio gagal dimainkan. Sila cuba semula.');
      };

      await audio.play();
      setIsPlaying(true);
      setProgress(0);
    },
    [cleanupAudioElement]
  );

  const playTrack = useCallback(
    async (targetTrackId?: NarrationTrackId) => {
      const trackToPlay = targetTrackId ?? activeTrackId;
      setActiveTrackId(trackToPlay);
      setError(null);
      setIsLoading(true);
      const currentRequestId = ++requestCounterRef.current;

      try {
        const audioUrl = await fetchTrackAudioUrl(trackToPlay);
        if (currentRequestId !== requestCounterRef.current) {
          return;
        }
        await playFromUrl(audioUrl);
      } catch (err) {
        if (currentRequestId !== requestCounterRef.current) {
          return;
        }
        setIsPlaying(false);
        setError(err instanceof Error ? err.message : 'Gagal memainkan suara AI.');
      } finally {
        if (currentRequestId === requestCounterRef.current) {
          setIsLoading(false);
        }
      }
    },
    [activeTrackId, fetchTrackAudioUrl, playFromUrl]
  );

  const stop = useCallback(() => {
    requestCounterRef.current++;
    cleanupAudioElement();
    setIsLoading(false);
    setIsPlaying(false);
    setProgress(0);
  }, [cleanupAudioElement]);

  const replay = useCallback(async () => {
    await playTrack(activeTrackId);
  }, [activeTrackId, playTrack]);

  const selectTrack = useCallback(
    (trackId: NarrationTrackId) => {
      if (trackId !== activeTrackId) {
        stop();
        setActiveTrackId(trackId);
        setError(null);
      }
    },
    [activeTrackId, stop]
  );

  return {
    activeTrackId,
    isLoading,
    isPlaying,
    error,
    progress,
    selectTrack,
    playTrack,
    stop,
    replay,
  };
}
