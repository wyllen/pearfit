import type { Role, RoleLevel } from '@prisma/client';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Briefcase, BuildingCommunity, ReportMoney } from 'tabler-icons-react';
import useCurrentUserOrganisation from '../../../../hooks/useCurrentUserOrganisation';
import useOrganisationRoles from '../../../../hooks/useOrganisationRoles';
import { api } from '../../../../utils/api';
import Card from '../../../ds/card/card';
import Container from '../../../ds/container/container';
import type { OrderType } from '../../../ds/dnd-list/dnd-list';
import GridItem from '../../../ds/grid-item/grid-item';
import Grid from '../../../ds/grid/grid';
import Modal from '../../../ds/modal/modal';
import SmallCard from '../../../ds/small-card/small-card';
import TextField from '../../../ds/text-field/text-field';
import OrganisationInformations from '../../../forms/organisation-form/organisation-form';
import OrganisationRolesForm from '../../../forms/role-form/role-form';

const OrganisationSettingsContent = () => {
  const { t } = useTranslation();

  type RoleWithRoleLevel = Role & {
    roleLevel: RoleLevel[];
  };

  const [roles, setRoles] = useState<RoleWithRoleLevel[]>([]);

  const { organisation } = useCurrentUserOrganisation();

  const organisationRoles = useOrganisationRoles();

  useEffect(() => {
    if (organisationRoles) {
      setRoles(organisationRoles);
    }
  }, [organisationRoles]);

  const utils = api.useContext();
  const removeRoleLevelMutation = api.organisation.removeRoleLevel.useMutation({
    onSuccess: () => {
      utils.organisation.roles.invalidate();
    },
  });
  const addRoleLevelMutation = api.organisation.addRoleLevel.useMutation({
    onSuccess: () => {
      utils.organisation.roles.invalidate();
    },
  });
  const updateRoleLevelsMutation =
    api.organisation.updateRoleLevelsLevel.useMutation({
      onSuccess: () => {
        utils.organisation.roles.invalidate();
      },
    });

  const hanleChangeRoleLevels = (
    role: RoleWithRoleLevel,
    items: OrderType[]
  ) => {
    updateRoleLevelsMutation.mutate({
      roleLevels: items.map((item, index) => ({
        level: index + 1,
        id: item.id,
      })),
    });
    setRoles((oldRoles: RoleWithRoleLevel[]) => {
      const updatedRoles = [...oldRoles];
      const roleIndex = updatedRoles.findIndex((r) => r.id === role.id);
      updatedRoles[roleIndex] = {
        ...role,
        roleLevel:
          updatedRoles[roleIndex]?.roleLevel?.map((item) => {
            const newItemIndex = items.findIndex((i) => i.id === item.id);
            return {
              ...item,
              level: newItemIndex + 1,
            } as RoleLevel;
          }) || [],
      };
      return updatedRoles;
    });
  };
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
            {roles?.map((role, key) => {
              return (
                <Modal
                  key={role.id}
                  trigger={
                    <SmallCard
                      title={`${role.name}`}
                      subtitle={`${role.roleLevel.length} niveaux`}
                    />
                  }
                >
                  {/* <DndListForm
                    onChange={(items) => {
                      hanleChangeRoleLevels(role, items);
                    }}
                    onAdd={(name, index) =>
                      addRoleLevelMutation.mutate({
                        name,
                        roleId: role.id,
                        level: index,
                      })
                    }
                    onDelete={(id) =>
                      removeRoleLevelMutation.mutate({ roleLevelId: id })
                    }
                    elements={role.roleLevel
                      .sort((a, b) => (a.level || 0) - (b.level || 0))
                      .map((level, index) => ({
                        id: level.id,
                        name: level.name || '',
                      }))}
                  /> */}
                  <OrganisationRolesForm roleWithLevels={role} />
                </Modal>
              );
            })}
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
