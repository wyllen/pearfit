import { useTranslation } from 'next-i18next';
import { UserCircle } from 'tabler-icons-react';
import useOrganisationUsers from '../../../../hooks/useOrganisationUsers';
import Avatar from '../../../ds/avatar/avatar';
import Card from '../../../ds/card/card';
import Container from '../../../ds/container/container';
import GridItem from '../../../ds/grid-item/grid-item';
import Grid from '../../../ds/grid/grid';
import Modal from '../../../ds/modal/modal';
import SmallCard from '../../../ds/small-card/small-card';

const UsersContent = () => {
  const { t } = useTranslation();
  const users = useOrganisationUsers();
  return (
    <Container>
      <Grid gap="xl">
        <GridItem>
          <Card title={t('users')} icon={<UserCircle />}>
            <Grid>
              {users?.map((user, key) => (
                <GridItem size="col6" key={key}>
                  <Modal
                    trigger={
                      <SmallCard
                        leftSlot={<Avatar name={`${user?.name}`} />}
                        title={`${user?.name}`}
                      />
                    }
                    title={`${user?.name}`}
                  >
                    <p>
                      {`${user?.name}`} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Suscipit, sapiente obcaecati eos,
                      corrupti neque error magni velit, architecto rerum
                      consequatur enim quo. Non magnam, quas esse ratione
                      delectus iure velit!
                    </p>
                  </Modal>
                </GridItem>
              ))}
            </Grid>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default UsersContent;
