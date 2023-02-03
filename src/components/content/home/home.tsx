import { useTranslation } from 'next-i18next';
import { Checklist, Users } from 'tabler-icons-react';
import useOrganisationCandidates from '../../../hooks/useOrganisationCandidates';
import useOrganisationQuizzes from '../../../hooks/useOrganisationQuizzes';
import Avatar from '../../ds/avatar/avatar';
import Card from '../../ds/card/card';
import Container from '../../ds/container/container';
import GridItem from '../../ds/grid-item/grid-item';
import Grid from '../../ds/grid/grid';
import Modal from '../../ds/modal/modal';
import SmallCard from '../../ds/small-card/small-card';
import QuizForm from '../../forms/quiz-form/quiz-form';

const HomeContent = () => {
  const candidats = useOrganisationCandidates();
  const quizzes = useOrganisationQuizzes();
  const { t } = useTranslation('common');
  return (
    <Container>
      <Grid gap="xl">
        <GridItem size="col8">
          <Card
            title={t('candidates')}
            subtitle={` en attente, 40 candidats évalués`}
            icon={<Users />}
          >
            <Grid>
              {candidats?.map((candidat, key) => (
                <GridItem size="col6" key={key}>
                  <Modal
                    trigger={
                      <SmallCard
                        leftSlot={<Avatar name={candidat.name} />}
                        title={candidat.name}
                        subtitle={`${candidat.role?.name}`}
                      />
                    }
                    title={candidat.name}
                  >
                    <p>
                      {candidat.name} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Suscipit, sapiente obcaecati eos,
                      corrupti neque error magni velit, architecto rerum
                      consequatur enim quo. Non magnam, quas esse ratione
                      delectus iure velit!
                    </p>
                  </Modal>
                </GridItem>
              ))}
            </Grid>
          </Card>
        </GridItem>
        <GridItem size="col4">
          <Card
            title={t('quizzes')}
            subtitle="420 questions au total"
            icon={<Checklist />}
          >
            <Grid>
              {quizzes?.map((quiz, key) => (
                <GridItem size="col12" key={key}>
                  <Modal
                    trigger={
                      <SmallCard
                        title={`${quiz.name}`}
                        subtitle={`${quiz.question.length} questions`}
                        meta={`${quiz.updatedAt}`}
                      />
                    }
                    title={quiz.name}
                  >
                    <QuizForm quiz={quiz} />
                  </Modal>
                </GridItem>
              ))}
            </Grid>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default HomeContent;
