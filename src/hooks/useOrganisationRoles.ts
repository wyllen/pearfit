import { api } from '../utils/api';
import useCurrentUserOrganisation from './useCurrentUserOrganisation';

const useOrganisationRoles = () => {
  const { organisation } = useCurrentUserOrganisation();
  if (organisation) {
    const { data: roles } = api.organisation.roles.useQuery({
      organisationId: organisation.id,
    });
    return roles;
  }
  return null;
};

export default useOrganisationRoles;
