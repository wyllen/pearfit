import { type NextPage } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import UsersContent from '../../components/content/organisation/users/users';

const Settings: NextPage = (props) => {
  console.log('-----> props:', props);

  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Pearfit - {t('pear')}</title>
      </Head>
      <UsersContent />
    </>
  );
};

export default Settings;

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
