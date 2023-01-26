import { api } from '../utils/api';

const useUserOrganisations = () => {
  const { data: userOrganisations } = api.me.organisations.useQuery();

  return (
    userOrganisations?.map(
      (userOrganisation) => userOrganisation?.organisation
    ) || []
  );
};

export default useUserOrganisations;
