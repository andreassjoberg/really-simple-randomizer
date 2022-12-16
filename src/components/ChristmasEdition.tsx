import { useMemo } from "react";
import Snowfall from "react-snowfall";

export const ChristmasEdition = () => {
    const isChristmas = useMemo(() => {
        return new Date().getMonth() === 11;
    }, []);

    return isChristmas ? (
        <Snowfall />
    ) : (
        <></>
    );
}