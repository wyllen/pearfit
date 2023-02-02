import type { ReactNode } from 'react';
import Quizbar from '../../common/quizbar/quizbar';
import styles from './quiz.module.scss';

interface QuizLayoutProps {
  children: ReactNode;
}
const QuizLayout = ({ children }: QuizLayoutProps) => {
  return (
    <div className={styles.quizLayout}>
      <Quizbar />
      <div className={styles.quizLayoutContent}>{children}</div>
    </div>
  );
};

export default QuizLayout;
