import style from './signin.module.scss';

import type { Provider } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { BrandDiscord, BrandGoogle, BrandLinkedin } from 'tabler-icons-react';
import logo from '../../../../assets/logo.png';
import type { Colors } from '../../../../types/colors';
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

const SignInContent = ({ providers, callbackUrl }: SignInContentProps) => {
  useEffect(() => {
    document.body.className = style.signin;
  }, []);
  //const { data: sessionData } = useSession();

  const icons: Record<string, ReactNode> = {
    google: <BrandGoogle />,
    linkedin: <BrandLinkedin />,
    discord: <BrandDiscord />,
  };

  return (
    <>
      <Container className={style.signinContainer} maxWidth="xs">
        <Card className={style.signinCard}>
          <Grid>
            <GridItem>
              <Stack vertical gap="xl" className={style.stack}>
                {Object.values(providers).map((provider) => {
                  // type provider.I
                  const providerId: Colors = provider.id as Colors;
                  const icon: ReactNode = icons[providerId];
                  return (
                    <Button
                      color={providerId}
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id, {
                          callbackUrl: callbackUrl || 'http://localhost:3000/',
                        }).catch((err) => console.error(err));
                      }}
                    >
                      {icon} Sign in with {provider.name}
                    </Button>
                  );
                })}
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
