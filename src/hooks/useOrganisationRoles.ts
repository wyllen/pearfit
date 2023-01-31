import { api } from '../utils/api';
import useCurrentUserOrganisation from './useCurrentUserOrganisation';

const useOrganisationRoles = () => {
  const { organisation } = useCurrentUserOrganisation();
  const { data: roles } = api.organisation.roles.useQuery({
    organisationId: organisation?.id || '',
  });
  return roles;
};

export default useOrganisationRoles;
