import type { ReactElement } from 'react';
import QuizContent from '../components/content/quiz/quiz';
import QuizLayout from '../components/layouts/quiz/quiz';

const Quiz = () => {
  return (
    <>
      <QuizContent />
    </>
  );
};
Quiz.getLayout = function getLayout(page: ReactElement) {
  return <QuizLayout>{page}</QuizLayout>;
};

export default Quiz;
