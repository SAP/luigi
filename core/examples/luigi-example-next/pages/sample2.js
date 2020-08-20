import { useEffect } from 'react';
import styles from '../styles/Main.module.css';

export default function Sample2() {
  useEffect(() => {
    require('@luigi-project/client/luigi-client.js');
  }, []);

  return (
    <div className={styles.layout}>
      <h2>Hello from Sample2 micro frontend</h2>
    </div>
  );
}
