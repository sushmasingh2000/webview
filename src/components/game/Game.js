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
                height: 300,
                type: 'radialBar',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    speed: 20000, // 20 seconds animation
                }
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: { fontSize: '18px' },
                        value: { fontSize: '14px' },
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

    const dropCoins = () => {
        const coins = [];
        const coinCount = Math.floor(Math.random() * 10) + 25;

        for (let i = 0; i < coinCount; i++) {
            const leftPos = 35 + Math.random() * 30; // 35% - 65%
            const delay = (i * 0.3).toFixed(1);
            const duration = (4 + Math.random() * 2).toFixed(1);

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
        <div className="game-container">
            {/* Chart Container */}
            <div id="chart" className="chart-center" />

            {/* Falling Coins */}
            {showCoins && (
                <div className="coin-container">
                    {coinBatch}
                </div>
            )}

            {/* Styles */}
            <style>{`
                .game-container {
                    height: 100vh;
                    width: 100vw;
                    background-image: url(${background});
                    background-size: cover;
                    background-position: center center;
                    background-repeat: no-repeat;
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chart-center {
                    z-index: 2;
                    width: 300px;
                    height: 300px;
                    margin-top:120px
                }

                .coin-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 5;
                    pointer-events: none;
                }

                .falling-coin {
                    position: absolute;
                    top: -50px;
                    opacity: 1;
                    animation-name: fall;
                    animation-timing-function: ease-in-out;
                    animation-fill-mode: forwards;
                }

                @keyframes fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(90vh) rotate(720deg);
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
