import { api } from '../utils/api';
import useCurrentUserOrganisation from './useCurrentUserOrganisation';

const useOrganisationQuizzes = () => {
  const { organisation } = useCurrentUserOrganisation();
  const { data: candidates } = api.organisation.quizzes.useQuery({
    organisationId: organisation?.id || '',
  });
  return candidates;
};

export default useOrganisationQuizzes;
