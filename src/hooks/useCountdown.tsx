import { useEffect, useState } from "react"

export const useCountdown = (done: () => Promise<void>) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        if (typeof timeLeft === "number") {
            if (timeLeft > 0) {
                const next = timeLeft - 1;
                const timeout = setTimeout(() => setTimeLeft(next), 1000);
                return () => clearTimeout(timeout);
            } else {
                setTimeLeft(null);
                done();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft])

    const start = (time: number) => {
        setTimeLeft(time);
    }

    const cancel = () => {
        setTimeLeft(null);
    }

    return { timeLeft, start, cancel };
}
