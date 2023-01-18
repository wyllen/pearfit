import type { Provider } from 'next-auth/providers';
import { getProviders } from 'next-auth/react';
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

export default SignIn;
