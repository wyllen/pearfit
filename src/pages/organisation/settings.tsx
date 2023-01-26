import { type NextPage } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import OrganisationSettingsContent from '../../components/content/organisation/settings/settings';

const Settings: NextPage = (props) => {
  console.log('-----> props:', props);

  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Pearfit - {t('pear')}</title>
      </Head>
      <OrganisationSettingsContent />
    </>
  );
};

export default Settings;

export const getServerSideProps = async (props: any) => {
  const { locale } = props;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
