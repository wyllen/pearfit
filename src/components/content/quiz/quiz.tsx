import Image from 'next/image';
import { useEffect } from 'react';
import { ChevronRight } from 'tabler-icons-react';
import Button from '../../ds/button/button';

import style from './quiz.module.scss';

import pearLogo from '../../../assets/logo-pear.png';
import pearArm from '../../../assets/pear-arm.png';

const QuizContent = () => {
  useEffect(() => {
    document.body.className = style.quizBodyBackground;
  }, []);

  return (
    <div>
      <h1 className={style.quizTitle}>
        Comment définissez-vous le type d'une variable en Typescript?
      </h1>
      <div className={style.quizAnswers}>
        <Button color="white" size="l">
          <span className={style.quizPill}>A</span> let variable = type
        </Button>
        <Button color="white" size="l">
          <span className={style.quizPill}>B</span> let variable: type
        </Button>
        <Button color="white" size="l">
          <span className={style.quizPill}>C</span> let variable type
        </Button>
        <Button color="white" size="l">
          <span className={style.quizPill}>D</span> let type variable{' '}
        </Button>

        <Image
          className={style.quizPear}
          src={pearLogo.src}
          alt="PearFit"
          width={pearLogo.width / 2}
          height={pearLogo.height / 2}
        />

        <Image
          className={style.quizPearArm}
          src={pearArm.src}
          alt="PearFit"
          width={pearArm.width / 2}
          height={pearArm.height / 2}
        />
      </div>
      <div className={style.quizActions}>
        <Button size="l">
          Question suivante <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default QuizContent;
