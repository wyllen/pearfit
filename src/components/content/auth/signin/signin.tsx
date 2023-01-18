import style from './signin.module.scss';

import type { Provider } from 'next-auth/providers';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import logo from '../../../../assets/logo.png';
import Button from '../../../ds/button/button';
import Card from '../../../ds/card/card';
import Container from '../../../ds/container/container';
import GridItem from '../../../ds/grid-item/grid-item';
import Grid from '../../../ds/grid/grid';
import Stack from '../../../ds/stack/stack';

interface SignInContentProps {
  providers: Record<string, Provider>;
  callbackUrl?: string;
}

const mockedProviders = {
  google: {
    id: 'google',
    name: 'Google',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter',
  },
};

const SignInContent = ({ providers, callbackUrl }: SignInContentProps) => {
  useEffect(() => {
    document.body.className = style.signin;
  }, []);
  const { data: sessionData } = useSession();

  console.log('callbackUrl', callbackUrl);

  return (
    <>
      <Container className={style.signinContainer} maxWidth="xs">
        <h1> {sessionData ? 'LOGGED' : 'NOT LOGGED'}</h1>
        <Card className={style.signinCard}>
          <Grid>
            <GridItem>
              <Stack vertical gap="xl" className={style.stack}>
                {Object.values(providers).map((provider) => (
                  <Button
                    color={provider.id}
                    key={provider.name}
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: callbackUrl || 'http://localhost:3000/',
                      })
                    }
                  >
                    Sign in with {provider.name}
                  </Button>
                ))}
              </Stack>
            </GridItem>
            <GridItem>
              <Image
                src={logo.src}
                alt="PearFit"
                width={logo.width}
                height={logo.height}
              />
            </GridItem>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default SignInContent;
