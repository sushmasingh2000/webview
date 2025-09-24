import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import background from "../../assets/wait.png";
import lock from "../../assets/lock.png";
import coin from "../../assets/coin.png";

const GameScreen = () => {
  const [showCoins, setShowCoins] = useState(false);
  const [coinBatch, setCoinBatch] = useState([]);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const timers = useRef([]);
  const coinsFallenCount = useRef(0);

  useEffect(() => {
    const options = {
      series: [100, 100, 100, 100],
      chart: {
        height: 350,
        type: 'radialBar',
        animations: {
          enabled: true,
          easing: 'linear',
          speed: 20000, // 20sec chart fill animation
        }
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: { fontSize: '22px' },
            value: { fontSize: '16px' },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      },
      labels: ['BTC', 'ETH', 'DOGE', 'SOL'],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Start cycle after chart fills
    startCycle();

    function startCycle() {
      // Wait for chart to fill (30s)
      timers.current.push(setTimeout(() => {
        dropCoins();
      }, 30000));
    }

    return () => {
      chart.destroy();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  // Called when each coin animation ends
  const onCoinAnimationEnd = () => {
    coinsFallenCount.current += 1;
    // When all 12 coins finished falling
    if (coinsFallenCount.current === 12) {
      // Reset coin count for next round if needed
      coinsFallenCount.current = 0;
      // Hide coins and show lock screen
      setShowCoins(false);
      setShowLockScreen(true);
    }
  };

  // Create coin elements falling from sides to center bottom with staggered delay
  const dropCoins = () => {
    const coins = [];
    for (let i = 0; i < 12; i++) {
      const leftPos = 40 + Math.random() * 20; // 40%-60% horizontal start
      coins.push(
        <img
          key={Date.now() + i}
          src={coin}
          alt="coin"
          className="falling-coin"
          style={{
            left: `${leftPos}%`,
            animationDelay: `${i * 0.2}s`,
            width: '35px',
            height: '35px',
          }}
          onAnimationEnd={onCoinAnimationEnd}
        />
      );
    }
    setShowCoins(true);
    setCoinBatch(coins);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {!showLockScreen && (
        <>
          {/* Chart */}
          <div
            id="chart"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          ></div>

          {/* Falling Coins */}
          {showCoins && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right:10,
                zIndex: 5,
                width: '100%',
                height: '100%',
              }}
            >
              {coinBatch}
            </div>
          )}
        </>
      )}

      {/* Lock Screen */}
      {showLockScreen && (
  <div
    style={{
      height: '100%',
      width: '100%',
      backgroundImage: `url(${lock})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Coins on top of lock background */}
    <div
      style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '200px',
        gap: '5px',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Render coinBatch but without animation */}
      {coinBatch.map((coinElement, idx) =>
        React.cloneElement(coinElement, {
          key: `lock-coin-${idx}`,
          style: {
            ...coinElement.props.style,
            animation: 'none',
            position: 'relative',
            left: 'auto',
            top: 'auto',
            width: '30px',
            height: '30px',
          },
          onAnimationEnd: null,
        })
      )}
    </div>
  </div>
)}

      {/* CSS animations */}
      <style>{`
        .falling-coin {
          position: absolute;
          top: -50px;
          opacity: 1;
          animation: fall 2.5s ease forwards;
          pointer-events: none;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(85vh) rotate(720deg);
            opacity: 1;
          }
        }

        .minting-effect {
          animation: mintPulse 0.6s ease-in-out infinite alternate;
        }

        @keyframes mintPulse {
          0% {
            transform: scale(1);
            filter: brightness(1);
          }
          100% {
            transform: scale(1.1);
            filter: brightness(1.4);
          }
        }
      `}</style>
    </div>
  );
};

export default GameScreen;
