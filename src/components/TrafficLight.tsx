import { useEffect, useState } from "react";

function getLightStyles(id: string, currentLight: number) {
  if (currentLight.toString() !== id) return "";
  switch (currentLight) {
    case 1: {
      return "yellow";
    }
    case 2: {
      return "green";
    }
    default: {
      return "red";
    }
  }
}

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState<number>(0);

  useEffect(() => {
    function getTimeout(): number {
        switch(currentLight) {
            case(1): {
                return 500;
            }
            case(2): {
                return 3000;
            }
            default: {
                return 4000;
            }
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
    <div className="lights">
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <div
            key={index}
            id={index.toString()}
            className={`light ${getLightStyles(
              index.toString(),
              currentLight
            )}`}></div>
        );
      })}
    </div>
  );
};

export default TrafficLight;