import { ChallengeProvider } from '../contexts/ChallengesContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengeProvider>
      <Component {...pageProps} />
    </ChallengeProvider>
  );
}

export default MyApp
