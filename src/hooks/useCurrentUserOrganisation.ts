import { useEffect } from 'react';
import useSharedCurrentOrganisationId from './useCurrentOrganisationId';
import useUserOrganisations from './useUserOrganisations';

const useCurrentUserOrganisation = () => {
  const userOrganisations = useUserOrganisations();
  const { currentOrganisationId, setCurrentOrganisationId } =
    useSharedCurrentOrganisationId();

  useEffect(() => {
    const savedOrganisationId = localStorage.getItem('currentOrganisationId');
    if (savedOrganisationId) {
      setCurrentOrganisationId(savedOrganisationId);
    }
  }, []);

  const organisation = userOrganisations?.find((userOrganisation, key) => {
    if (!currentOrganisationId && key === 0) {
      return true;
    }
    return userOrganisation?.id === currentOrganisationId;
  });

  const setCurrentOrganisation = (organisationId: string) => {
    localStorage.setItem('currentOrganisationId', organisationId);
    setCurrentOrganisationId(organisationId);
  };

  return {
    organisation,
    setCurrentOrganisation,
  };
};

export default useCurrentUserOrganisation;
