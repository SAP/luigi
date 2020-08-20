import { useEffect } from 'react';
import styles from '../styles/Main.module.css';

export default function Home() {
  useEffect(() => {
    require('@luigi-project/client/luigi-client.js');
  }, []);

  return (
    <div className={styles.layout}>
      <h2>Welcome to Luigi with Next.js</h2>
    </div>
  );
}
