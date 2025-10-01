import { useEffect, useState, useRef } from "react";
import ApexCharts from "apexcharts";
import background from "../../assets/wait.png";
import character from "../../assets/avr.png";
import coinImg from "../../assets/coin.png";
import bucketImg from "../../assets/b.png"; 

const GameScreen = () => {
  const [coins, setCoins] = useState([]);
  const timers = useRef([]);

  useEffect(() => {
    const options = {
      series: [100, 100, 100, 100],
      chart: {
        height: 300,
        type: "radialBar",
        animations: {
          enabled: true,
          easing: "linear",
          speed: 20000,
        },
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: { fontSize: "18px" },
            value: { fontSize: "14px" },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
      labels: ["BTC", "ETH", "DOGE", "SOL"],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    startCycle();

    function startCycle() {
      timers.current.push(
        setTimeout(() => {
          dropCoins();
        }, 30000) // 5s test ke liye rakha, aap 30000 (30s) kar sakte ho
      );
    }

    return () => {
      chart.destroy();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const dropCoins = () => {
    const newCoins = [];
    const coinCount = Math.floor(Math.random() * 5) + 5; // 5-10 coins
    for (let i = 0; i < coinCount; i++) {
      const id = Date.now() + i;
      const leftPos = 35 + Math.random() * 30; // random X position
      const delay = i * 0.3; // staggered drop

      newCoins.push({ id, status: "falling", left: leftPos, delay });
      // 3s fall + 2s wait = 5s me bucket move
      setTimeout(() => {
        setCoins((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "collecting" } : c))
        );
      }, 5000 + delay * 1000);
    }
    setCoins((prev) => [...prev, ...newCoins]);
  };

  return (
    <div className="game-container h-[92vh]">
      <img
        src={character}
        alt="character"
        className="character-image w-[320px] -mb-5" />
      <div id="chart" className="chart-center" />
      {coins.map((coin) => (
        <img
          key={coin.id}
          src={coinImg}
          alt="coin"
          className={`absolute w-[35px] h-[35px] ${
            coin.status === "falling"
              ? "falling-coin"
              : coin.status === "collecting"
              ? "to-bucket"
              : ""
          }`}
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
          }}
        />
      ))}

      {/* Bucket fixed at right bottom */}
      <img
        src={bucketImg}
        alt="bucket"
        className="bucket absolute w-[120px] h-[120px] -bottom-0.5 -right-4 z-10"
      />

      <style>{`
        .game-container {
          width: 100vw;
          background-image: url(${background});
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        .chart-center {
          z-index: 2;
          width: 300px;
          height: 300px;
        }

        .falling-coin {
          top: -50px;
          position: absolute;
          animation: fall 3s ease-in forwards;
        }

        @keyframes fall {
          0% {
            top: -50px;
            transform: rotate(0deg);
          }
          100% {
            top: 75vh;
            transform: rotate(720deg);
          }
        }

        .to-bucket {
          top: 77vh;
          position: absolute;
          animation: moveToBucket 1.5s ease-in forwards;
        }

        @keyframes moveToBucket {
          0% {
            top: 75vh;
            transform: scale(1);
          }
          100% {
            top: 85vh;
            left: 85%;
            transform: scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default GameScreen;
