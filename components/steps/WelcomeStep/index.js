import { Button } from '../../Button';
import { WhiteBlock } from '../../WhiteBlock';
import styles from './WelcomeStep.module.scss';

export const WelcomeStep = () => {
  return (
    <WhiteBlock className={styles.block}>
      <h3 className={styles.title}>
        <img></img>
        Welcome to Clubhouse!
      </h3>
      <p>lorem</p>
      <div>
        <Button>
          <img></img>
        </Button>
      </div>
      <div className="link mt-15 cup d-ip">Have an invite text? Sign in</div>
    </WhiteBlock>
  );
};
