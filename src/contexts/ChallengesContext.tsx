import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from "../components/levelUpModal";

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    challengesCompleted: number;
    currentExperience: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelup: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, completedChallenge])

    function levelup() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);

    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalexperience = currentExperience + amount;

        if (finalexperience >= experienceToNextLevel) {
            finalexperience = finalexperience - experienceToNextLevel;
            levelup();
        }

        setCurrentExperience(finalexperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                levelup,
                challengesCompleted,
                currentExperience,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completedChallenge,
                closeLevelUpModal
            }}>
            {children}

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    );
}