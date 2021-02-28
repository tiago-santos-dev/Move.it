import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from './ChallengesContext';

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdonwTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(25 * 60); // Tempo total do contador
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); // tempoTotal, divide por 60 e arredonda pra baixo, retornando a quantidade de minutos
    const seconds = time % 60; // resto da divisão, retornando os segundos 

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdonwTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdonwTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}