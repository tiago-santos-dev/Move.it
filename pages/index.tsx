import { CompletedChallenges } from '../src/components/CompletedChallenges'
import { ExperienceBar } from '../src/components/ExperienceBar'
import { Profile } from '../src/components/Profile'

import styles from '../styles/pages/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
