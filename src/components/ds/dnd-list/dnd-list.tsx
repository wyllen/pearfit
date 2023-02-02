import type {
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  DropResult,
} from '@hello-pangea/dnd';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { GripVertical, Trash } from 'tabler-icons-react';
import Button from '../button/button';
import Modal from '../modal/modal';

import styles from './dnd-list.module.scss';

export interface OrderType {
  id: string;
  name: string;
  order: number;
}

export interface DndListProps {
  className?: string;
  elements: OrderType[];
  onChange?: (elements: OrderType[]) => void;
  onDelete?: (id: string) => void;
}

const getRenderItem =
  (items: OrderType[], onDelete?: (id: string) => void) =>
  // eslint-disable-next-line
  (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    rubric: DraggableRubric
  ) =>
    (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={styles.dndListItem}
      >
        <GripVertical className={styles.dndListItemHandle} />
        <p>{items?.[rubric.source.index]?.name}</p>
        <div className={styles.dndListItemRightSlot}>
          {typeof onDelete !== 'undefined' && (
            <Modal
              trigger={
                <Button
                  size="s"
                  color="danger"
                  className={styles.dndListItemDelete}
                >
                  <Trash />
                </Button>
              }
            >
              <p>Etes-vous sur ?</p>
              <Button
                color="danger"
                onClick={() => onDelete(items?.[rubric.source.index]?.id || '')}
              >
                Supprimer
              </Button>
            </Modal>
          )}
        </div>
      </div>
    );

const DndList = (props: DndListProps) => {
  const { elements, className = '', onChange, onDelete } = props;
  const [list, setList] = useState(elements ?? []);

  useEffect(() => {
    setList(elements);
  }, [elements]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let currentList = [...list];
    const elementToMove = currentList[source.index];
    if (elementToMove) {
      currentList.splice(source.index, 1);
      currentList.splice(destination.index, 0, elementToMove);
    }
    currentList = currentList.map((element, index) => ({
      ...element,
      order: index + 1,
    }));

    setList(currentList);
    onChange && onChange(currentList);
  };

  const dndClasses = classNames([className]);

  const renderItem = getRenderItem(list, onDelete);

  return (
    <div className={dndClasses}>
      <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
        <Droppable droppableId="list" renderClone={renderItem}>
          {(providedDroppable) => {
            return (
              <div
                className={styles.dndListList}
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
              >
                <>
                  {list.map((element, index) => (
                    <Draggable
                      draggableId={element.id}
                      index={index}
                      key={element.id}
                    >
                      {renderItem}
                    </Draggable>
                  ))}
                </>
                {providedDroppable.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DndList;
