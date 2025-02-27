import { Button } from "@repo/ui/button";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
