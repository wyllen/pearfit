import { api } from '../utils/api';
import useCurrentUserOrganisation from './useCurrentUserOrganisation';

const useOrganisationUsers = () => {
  const { organisation } = useCurrentUserOrganisation();
  const { data: users } = api.organisation.users.useQuery({
    organisationId: organisation?.id || '',
  });
  return users;
};

export default useOrganisationUsers;
