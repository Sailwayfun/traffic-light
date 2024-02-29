import { useEffect, useState } from "react";

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState<number>(0);

  useEffect(() => {
    function getTimeout(): number {
      if (currentLight === 0) {
        return 4000;
      } else if (currentLight === 1) {
        return 500;
      } else {
        return 3000;
      }
    }

    function switchLights() {
      return currentLight < 2
        ? setCurrentLight((prev) => prev + 1)
        : setCurrentLight(0);
    }

    const timeout = setTimeout(switchLights, getTimeout());

    return () => clearTimeout(timeout);
  }, [currentLight]);

  return (
    <div>
      <div>Traffic Light</div>
      <div>{currentLight}</div>
    </div>
  );
};

export default TrafficLight;
