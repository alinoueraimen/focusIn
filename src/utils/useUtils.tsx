type PlaySoundOptions = {
  volume?: number;          // Default: 1.0 (maksimal)
  onEnded?: () => void;     // Callback saat suara selesai dimainkan
};
const useUtils = () =>{
    const playSound = (src: string, options?: PlaySoundOptions): void => {
  
  const audio = new Audio(src);

  if (options?.volume !== undefined) {
    audio.volume = options.volume;
  }

  if (options?.onEnded) {
    audio.onended = options.onEnded;
  }

  audio.play().catch((err) => {
    console.error( err);
  });
};

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      };
    const showNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: '/icon.png', // opsional: ganti dengan ikon kamu
    });
  }
};

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  return {
    formatTime,
    showNotification,
    generateId,
    playSound
  }
}

export default useUtils