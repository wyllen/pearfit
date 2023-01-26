import { type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import HomeContent from '../components/content/home/home';

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Pearfit - {t('pear')}</title>
      </Head>
      <HomeContent />
    </>
  );
};

export default Home;

export const getServerSideProps = async (props: any) => {
  const { locale } = props;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
