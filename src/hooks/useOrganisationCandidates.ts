import { api } from '../utils/api';
import useCurrentUserOrganisation from './useCurrentUserOrganisation';

const useOrganisationCandidates = () => {
  const { organisation } = useCurrentUserOrganisation();
  const { data: candidates } = api.organisation.candidates.useQuery(
    {
      organisationId: organisation?.id || '',
    },
    {
      queryKey: [
        'organisation.candidates',
        { organisationId: organisation?.id || '' },
      ],
    }
  );
  return candidates;
};

export default useOrganisationCandidates;
