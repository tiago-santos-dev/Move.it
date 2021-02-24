import { useEffect, useState } from 'react';
import styles from '../../styles/components/Countdown.module.css';

export function Countdown() {

    let countdonwTimeout: NodeJS.Timeout;

    const [time, setTime] = useState(0.1 * 60); // Tempo total do contador
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);


    const minutes = Math.floor(time / 60); // tempoTotal, divide por 60 e arredonda pra baixo, retornando a quantidade de minutos
    const seconds = time % 60; // resto da divisão, retornando os segundos 

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    // converte em string 25 = '25
    //padStart --> Se não tiver duas posições, preenche a primeira com '0'
    // split retorna uim array com os caracteres da string

    function startCountDown() {
        setIsActive(true);
    }

    function resetCountDown() {
        clearTimeout(countdonwTimeout);
        setIsActive(false);
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
        }
    }, [isActive, time])
    return (

        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {
                hasFinished ? (

                    <button
                        disabled
                        className={styles.countdownButton}
                    >
                        Ciclo Encerrado
                    </button>


                ) :
                    (
                        <>
                            {
                                isActive ? (
                                    <button
                                        type='button'
                                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                        onClick={resetCountDown}
                                    >
                                        Abandonar
                                    </button>
                                ) :
                                    (
                                        <button
                                            type='button'
                                            className={styles.countdownButton}
                                            onClick={startCountDown}
                                        >
                                            Iniciar
                                        </button>
                                    )
                            }
                        </>
                    )
            }
        </div >
    );
}