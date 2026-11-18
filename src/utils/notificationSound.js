/**
 * Utility to play notification sound
 * Sound file: /sounds/mixkit-correct-answer-tone-2870.wav
 */

let notificationAudio = null;

export const playNotificationSound = () => {
  try {
    if (!notificationAudio) {
      notificationAudio = new Audio("/sounds/mixkit-correct-answer-tone-2870.wav");
      notificationAudio.preload = "auto";
    }
    // Rewind and play
    notificationAudio.currentTime = 0;
    const playPromise = notificationAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay may be blocked until user interacts with the document
        console.warn("Notification sound autoplay blocked or interrupted:", err?.message);
      });
    }
  } catch (error) {
    console.warn("Error playing notification sound:", error);
  }
};

export default playNotificationSound;
