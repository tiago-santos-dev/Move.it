import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {

    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    // converte em string 25 = '25
    //padStart --> Se não tiver duas posições, preenche a primeira com '0'
    // split retorna uim array com os caracteres da string


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
                                        onClick={resetCountdown}
                                    >
                                        Abandonar
                                    </button>
                                ) :
                                    (
                                        <button
                                            type='button'
                                            className={styles.countdownButton}
                                            onClick={startCountdown}
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