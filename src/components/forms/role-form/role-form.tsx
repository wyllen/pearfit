import type { Role, RoleLevel } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { api } from '../../../utils/api';
import Form from '../../common/forms/form/form';
import DndListForm from '../../ds/dnd-list-form/dnd-list-form';
import FieldGroup from '../../ds/field-group/field-group';
import TextField from '../../ds/text-field/text-field';
import EditRoleLevelForm from '../role-level-form/role-level-form';

interface RoleWithRoleLevel extends Role {
  roleLevel: RoleLevel[];
}

interface RoleFormProps {
  roleWithLevels?: RoleWithRoleLevel;
}

const RoleForm = ({ roleWithLevels }: RoleFormProps) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    formState,
    getValues,
    setValue,
  } = useForm<RoleWithRoleLevel>({
    values: {
      id: roleWithLevels?.id || '',
      name: roleWithLevels?.name || '',
      organisationId: roleWithLevels?.organisationId || '',
      roleLevel: roleWithLevels?.roleLevel || [],
    } as RoleWithRoleLevel,
  });

  const utils = api.useContext();
  const mutation = api.role.update.useMutation({
    onSuccess: () => {
      utils.organisation.roles.invalidate();
    },
  });

  const onSubmit = (data: RoleWithRoleLevel) => {
    mutation.mutate(data);
  };

  const registerRoleLevel = register('roleLevel');

  const registerName = register('name', { required: 'Role name is required' });

  console.log('registerName', registerName);
  console.log('roleLevel value ==>', getValues('roleLevel'));

  const { errors, isDirty, isValid, touchedFields } = formState;
  watch();

  const removeRoleLevelMutation = api.organisation.removeRoleLevel.useMutation({
    onSuccess: () => {
      utils.organisation.roles.invalidate();
    },
  });
  const addRoleLevelMutation = api.organisation.addRoleLevel.useMutation({
    onSuccess: () => {
      utils.organisation.roles.invalidate();
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} formState={formState}>
      <FieldGroup labelSize="20%">
        <TextField
          label="Role name"
          error={errors.name?.message}
          {...registerName}
        />
      </FieldGroup>
      <FieldGroup labelSize="20%" margin="m">
        <DndListForm<RoleLevel>
          label="Role levels"
          onChange={(items) => {
            console.log('----->>>>> items', items);
            setValue('roleLevel', items, { shouldDirty: true });
            console.log(
              '----->>>>> getValues(roleLevel)',
              getValues('roleLevel')
            );
          }}
          onAdd={(name, index) =>
            addRoleLevelMutation.mutate({
              name,
              roleId: roleWithLevels?.id || '',
              level: index,
            })
          }
          onDelete={(id) => removeRoleLevelMutation.mutate({ roleLevelId: id })}
          orderField="level"
          items={
            getValues('roleLevel')
              ?.sort((a, b) => (a.level || 0) - (b.level || 0))
              ?.map((item) => ({
                ...item,
                editForm: <EditRoleLevelForm roleLevel={item} />,
              })) || []
          }
        />
      </FieldGroup>
    </Form>
  );
};

export default RoleForm;
