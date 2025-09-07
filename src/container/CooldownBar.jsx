import { useEffect, useRef, useState } from "react";

const COOLDOWNTIME = 5;// 10 seconds

const CooldownBar = ({ startGame = false, resetCooldown = false, handleTower = () => { } }) => {
    const [percent, setPercent] = useState(0);
    const intervalRef = useRef(null);

    const cooldownMs = Math.max(0, Number(COOLDOWNTIME)) * 1000;


    useEffect(() => {
        if (!resetCooldown) return;
        setPercent(0);
    }, [resetCooldown]);

    useEffect(() => {
        if (!startGame) return;

        if (cooldownMs === 0) {            
            setPercent(100);
            return;
        }

        if (percent >= 100) {
            handleTower()
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        if (intervalRef.current) return;

        const stepMs = Math.max(10, Math.round(cooldownMs / 100));

        intervalRef.current = setInterval(() => {
            setPercent((p) => {
                const next = p + 1;
                if (next >= 100) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    return 100;
                }
                return next;
            });
        }, stepMs);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [percent, cooldownMs, startGame]);

    return (
        <div
            onClick={() => {
                if (percent < 100) return;
                setPercent(0);
            }}
            className="w-full h-full py-2 flex flex-col items-center justify-center gap-1 text-white font-semibold text-[12px]"
        >
            <p>Cooldown Tower</p>
            <div className="w-full">
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mt-2">
                    <div
                        className="h-full rounded-full transition-all duration-100 ease-linear"
                        style={{
                            width: `${Math.min(100, Math.max(0, percent))}%`,
                            background:
                                "linear-gradient(90deg, #fff 0%, #ccc 100%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CooldownBar;
