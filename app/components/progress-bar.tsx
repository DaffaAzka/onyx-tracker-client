import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { Progress } from "@/components/ui/progress";

export function NavigationProgress() {
  const navigation = useNavigation();
  const isActive = navigation.state !== "idle";

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    if (isActive) {
      setVisible(true);
      setProgress(0);
      t1 = setTimeout(() => setProgress(40), 100);
      t2 = setTimeout(() => setProgress(75), 600);
    } else {
      setProgress(100);
      t1 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isActive]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress
        value={progress}
        className="h-1 w-full rounded-none transition-all duration-300"
      />
    </div>
  );
}
