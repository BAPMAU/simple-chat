import { useEffect, useRef, useState } from "react";

interface UseTypingTextOptions {
  text: string;
  speed?: number;
  charsPerTick?: number; // Number of characters per iteration
  onComplete?: () => void;
}

/**
 * Hook to create a text effect that writes progressively
 * @param options Hook configuration
 * @returns Displayed text and animation state
 */
export const useTypingText = ({
  text,
  speed = 1,
  charsPerTick = 10,
  onComplete,
}: UseTypingTextOptions) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText("");
    setIsTyping(false);
    setIsDone(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsTyping(true);
    let i = 0;

    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        const nextChars = text.substring(i, i + charsPerTick);
        setDisplayedText((prev) => prev + nextChars);
        i += charsPerTick;

        if (i >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsTyping(false);
          setIsDone(true);

          if (onComplete) onComplete();
        }
      }, speed);
    };

    startTyping();

    return () => {
      // Clean up all timers on unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, charsPerTick, onComplete]);

  return {
    text: displayedText,
    isTyping,
    isDone,
    progress: text.length > 0 ? displayedText.length / text.length : 0,
  };
};
