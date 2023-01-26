import type { Provider } from 'next-auth/providers';
import { getProviders } from 'next-auth/react';
import type { ReactElement } from 'react';
import SignInContent from '../../components/content/auth/signin/signin';

interface SignInProps {
  providers: Record<string, Provider>;
}

const SignIn = ({ providers }: SignInProps) => {
  return <SignInContent providers={providers} />;
};

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SignIn;
