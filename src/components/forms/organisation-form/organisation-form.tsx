import type { Organisation } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { api } from '../../../utils/api';
import Form from '../../common/forms/form/form';
import FieldGroup from '../../ds/field-group/field-group';
import TextField from '../../ds/text-field/text-field';

interface OrganisationFormProps {
  organisation?: Organisation | null;
}

const OrganisationForm = ({ organisation }: OrganisationFormProps) => {
  const { register, reset, control, handleSubmit, watch, formState } =
    useForm<Organisation>({
      values: {
        id: organisation?.id || '',
        name: organisation?.name || '',
        contactEmail: organisation?.contactEmail || '',
        address: organisation?.address || '',
        postalCode: +(organisation?.postalCode || ''),
        city: organisation?.city || '',
        country: organisation?.country || '',
      },
    });
  const { errors, isDirty, isValid } = formState;

  const utils = api.useContext();
  const mutation = api.organisation.update.useMutation({
    onSuccess: () => {
      utils.me.organisations.invalidate();
    },
  });

  const onSubmit = (data: Organisation) => {
    mutation.mutate(data);
  };

  // useEffect(() => {
  //   // check if no errors
  //   if (isValid && isDirty) {
  //     clearTimeout(timeout.current);
  //     timeout.current = setTimeout(async () => {
  //       console.log('fields', fields);
  //       mutation.mutate(fields);
  //     }, 1000);
  //   }
  // }, [fields, errors, isDirty, isValid, mutation]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form onSubmit={handleSubmit(onSubmit)} formState={formState}>
      <FieldGroup labelSize="20%">
        <TextField
          label="Organisation name"
          displayAsText
          error={errors.name?.message}
          {...register('name', { required: 'Organisation name is required' })}
        />

        <TextField
          label="Contact Email"
          displayAsText
          {...register('contactEmail')}
        />

        <TextField
          label="address"
          displayAsText
          error={errors.address?.message}
          {...register('address')}
        />

        <TextField
          label="postalCode"
          displayAsText
          error={errors.postalCode?.message}
          {...register('postalCode')}
        />

        <TextField
          label="city"
          displayAsText
          error={errors.city?.message}
          {...register('city')}
        />

        <TextField
          label="country"
          displayAsText
          error={errors.country?.message}
          {...register('country')}
        />
      </FieldGroup>
    </Form>
  );
};

export default OrganisationForm;
