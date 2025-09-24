import { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import background from "../../assets/wait.png";
import coin from "../../assets/coin.png";

const GameScreen = () => {
    const [showCoins, setShowCoins] = useState(false);
    const [coinBatch, setCoinBatch] = useState([]);
    const timers = useRef([]);

    useEffect(() => {
        const options = {
            series: [100, 100, 100, 100],
            chart: {
                height: 350,
                type: 'radialBar',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    speed: 20000, // 20sec  chart fill animation
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
        startCycle();

        function startCycle() {
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

    // Create coin elements falling from sides to center bottom with staggered delay
    const dropCoins = () => {
        const coins = [];
        const coinCount = Math.floor(Math.random() * 10) + 25; // 6 to 15 coins

        for (let i = 0; i < coinCount; i++) {
            const leftPos = 35 + Math.random() * 20; // 20%-50%
            const delay = (i * 0.3).toFixed(1); // staggered delay
            const duration = (4 + Math.random() * 2).toFixed(1); // 4s to 6s

            coins.push(
                <img
                    key={Date.now() + i}
                    src={coin}
                    alt="coin"
                    className="falling-coin"
                    style={{
                        left: `${leftPos}%`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                        width: '35px',
                        height: '35px',
                    }}
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
                        zIndex: 5,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {coinBatch}
                </div>
            )}


            {/* CSS animations */}
            <style>{`
  .falling-coin {
    position: absolute;
    top: -50px;
    opacity: 1;
    animation-name: fall;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
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
