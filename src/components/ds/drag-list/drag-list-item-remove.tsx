import { Trash } from 'tabler-icons-react';
import colors from '../../../scss/colors.module.scss';
import type { DragListItemActionProps } from './drag-list-item-action';
import DragListItemAction from './drag-list-item-action';

const DragListItemRemove = (props: DragListItemActionProps) => {
  return (
    <DragListItemAction {...props}>
      <Trash color={colors.danger} />
    </DragListItemAction>
  );
};

export default DragListItemRemove;
