import { useState } from 'react';
import { useBetween } from 'use-between';

const useCurrentOrganisationId = () => {
  const [currentOrganisationId, setCurrentOrganisationId] = useState<string>();
  return { currentOrganisationId, setCurrentOrganisationId };
};

const useSharedCurrentOrganisationId = () =>
  useBetween(useCurrentOrganisationId);
export default useSharedCurrentOrganisationId;
