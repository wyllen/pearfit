import { useTranslation } from 'next-i18next';
import { Briefcase, BuildingCommunity, ReportMoney } from 'tabler-icons-react';
import useCurrentUserOrganisation from '../../../../hooks/useCurrentUserOrganisation';
import useOrganisationRoles from '../../../../hooks/useOrganisationRoles';
import Card from '../../../ds/card/card';
import Container from '../../../ds/container/container';
import DragList from '../../../ds/drag-list/drag-list';
import GridItem from '../../../ds/grid-item/grid-item';
import Grid from '../../../ds/grid/grid';
import Modal from '../../../ds/modal/modal';
import SmallCard from '../../../ds/small-card/small-card';
import TextField from '../../../ds/text-field/text-field';
import OrganisationInformations from '../../../forms/organisationInformations/organisationInformations';

const OrganisationSettingsContent = () => {
  const { t } = useTranslation();

  const { organisation } = useCurrentUserOrganisation();

  const organisationRoles = useOrganisationRoles();

  console.log('organisationRoles', organisationRoles);

  const roles = [
    {
      title: 'Front-End Developper',
      subTitle: '4 niveaux',
      levels: [
        {
          title: 'Débutant',
          id: 1,
        },
        {
          title: 'Confirmé',
          id: 2,
        },
        {
          title: 'Expert',
          id: 3,
        },
      ],
    },
    {
      title: 'Devops',
      subTitle: '4 niveaux',
    },
    {
      title: 'Back-End Developper',
      subTitle: '4 niveaux',
    },
  ];
  return (
    <Container>
      <Grid gap="xl">
        <GridItem size="col6">
          <Card
            title={t('organisationInformations')}
            icon={<BuildingCommunity />}
          >
            <OrganisationInformations organisation={organisation} />
          </Card>
        </GridItem>
        <GridItem size="col6">
          <Card title={t('roles')} icon={<Briefcase />}>
            {organisationRoles?.map((role, key) => (
              <Modal
                key={key}
                trigger={
                  <SmallCard
                    title={`${role.name}`}
                    subtitle={`${role.roleLevel.length} niveaux`}
                  />
                }
                title={`${role.name}`}
              >
                <DragList
                  handle={true}
                  onRemove={(id) => console.log(id)}
                  onChange={(items) => console.log(items)}
                  items={role.roleLevel.map((level) => ({
                    id: level.id,
                    title: level.name || '',
                  }))}
                />
              </Modal>
            ))}
          </Card>
        </GridItem>
        <GridItem size="col6">
          <Card title={t('licence')} icon={<ReportMoney />}>
            <TextField
              label={t('organisationLicence')}
              value={'premium'}
              displayAsText={true}
              readOnly={true}
            />
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default OrganisationSettingsContent;
