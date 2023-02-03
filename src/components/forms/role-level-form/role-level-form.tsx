import type { RoleLevel } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { api } from '../../../utils/api';
import Form from '../../common/forms/form/form';
import FieldGroup from '../../ds/field-group/field-group';
import TextField from '../../ds/text-field/text-field';

interface RoleLevelFormProps {
  roleLevel: RoleLevel;
}

const RoleLevelForm = ({ roleLevel }: RoleLevelFormProps) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    formState,
    getValues,
    setValue,
  } = useForm<Omit<RoleLevel, 'roleId'>>({
    values: {
      id: roleLevel?.id || '',
      name: roleLevel?.name || '',
      level: roleLevel?.level || 0,
    },
  });
  const { errors, isDirty, isValid, touchedFields } = formState;

  const utils = api.useContext();
  const mutation = api.role.updateRoleLevel.useMutation({
    onSuccess: () => {
      utils.organisation.roles.invalidate();
    },
  });

  const onSubmit = (data: Omit<RoleLevel, 'roleId'>) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} formState={formState}>
        <FieldGroup labelSize="20%">
          <TextField
            label="Role name"
            error={errors.name?.message}
            {...register('name')}
          />
        </FieldGroup>
      </Form>
    </>
  );
};

export default RoleLevelForm;
