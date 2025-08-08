import { useCollapsibleSections } from './api-reference-collapsible';
import styles from './api-reference.module.css';

export function ApiReferenceWrapper({ children }) {
  useCollapsibleSections();
  
  return (
    <div className={styles.apiReference}>
      {children}
    </div>
  );
}