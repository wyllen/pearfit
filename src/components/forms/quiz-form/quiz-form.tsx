import type { Question, Quiz } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { api } from '../../../utils/api';
import Form from '../../common/forms/form/form';
import DndListForm from '../../ds/dnd-list-form/dnd-list-form';
import FieldGroup from '../../ds/field-group/field-group';
import Select from '../../ds/select/select';
import TextField from '../../ds/text-field/text-field';

import useOrganisationRoles from '../../../hooks/useOrganisationRoles';

// interface QuestionWithAnswers extends Question {
//   answers: Answer[];
// }

interface QuizWithQuestions extends Quiz {
  question: Question[];
}

interface QuizFormProps {
  quiz?: QuizWithQuestions;
}

const QuizForm = ({ quiz }: QuizFormProps) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    formState,
    getValues,
    setValue,
  } = useForm<QuizWithQuestions>({
    values: {
      id: quiz?.id || '',
      name: quiz?.name || '',
      roleId: quiz?.roleId || '',
      question: quiz?.question || [],
    } as QuizWithQuestions,
  });

  const utils = api.useContext();
  const roles = useOrganisationRoles();
  console.log('roles', roles);

  const mutation = api.quiz.update.useMutation({
    onSuccess: () => {
      utils.organisation.quizzes.invalidate();
    },
  });

  const onSubmit = (data: QuizWithQuestions) => {
    mutation.mutate(data);
  };

  register('question');

  const { errors, isDirty, isValid, touchedFields } = formState;
  watch();

  const removeQuestionMutation = api.quiz.removeQuestion.useMutation({
    onSuccess: () => {
      utils.organisation.quizzes.invalidate();
    },
  });
  const addQuestionMutation = api.quiz.addQuestion.useMutation({
    onSuccess: () => {
      utils.organisation.quizzes.invalidate();
    },
  });

  const roleIdFieldProps = register('roleId');

  return (
    <Form onSubmit={handleSubmit(onSubmit)} formState={formState}>
      <FieldGroup labelSize="20%" margin="none">
        <TextField
          label="Quiz name"
          error={errors.name?.message}
          {...register('name', { required: 'Role name is required' })}
        />
      </FieldGroup>
      <FieldGroup labelSize="20%" margin="m">
        <Select
          value={getValues('roleId') || ''}
          onChange={(value) => {
            setValue('roleId', value, { shouldDirty: true });
          }}
          options={
            roles?.map((role) => ({
              value: role.id,
              label: `${role.name}`,
            })) || []
          }
        />
      </FieldGroup>
      <FieldGroup labelSize="20%" margin="m">
        <DndListForm<Question>
          label="Questions"
          onChange={(items) => {
            setValue('question', items, { shouldDirty: true });
          }}
          onAdd={(name, index) =>
            addQuestionMutation.mutate({
              title: name,
              quizId: quiz?.id || '',
              order: index,
            })
          }
          onDelete={(id) => removeQuestionMutation.mutate({ id })}
          orderField="level"
          items={
            getValues('question')
              ?.sort((a, b) => (a.order || 0) - (b.order || 0))
              ?.map((item) => ({
                ...item,
                name: item.title,
                editForm: <>EDIT FORM</>,
              })) || []
          }
        />
      </FieldGroup>
    </Form>
  );
};

export default QuizForm;
