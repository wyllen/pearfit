import { useEffect, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import type { DndListProps, OrderType } from '../dnd-list/dnd-list';
import DndList from '../dnd-list/dnd-list';
import TextField from '../text-field/text-field';

import styles from './dnd-list-form.module.scss';

interface DndListFormProps<T> extends Omit<DndListProps, 'onChange'> {
  onAdd?: (name: string, index: number) => void;
  error?: string;
  items?: T[];
  orderField?: string;
  onChange?: (elements: T[]) => void;
  label?: string;
}

const DndListForm = <ObjectType,>({
  elements,
  onAdd,
  error,
  onDelete,
  onChange,
  items,
  label,
  orderField = 'order',
}: DndListFormProps<ObjectType>) => {
  const [list, setList] = useState<ObjectType[]>(items || []);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    setList(items || []);
  }, [items]);

  const handleAddElement = (e: any) => {
    if (e.code === 'Enter' && input !== '') {
      setList((oldList: any) => {
        const updatedList = [...oldList];
        updatedList.push({
          id: 'TMP' + new Date().getTime(),
          name: input,
        });
        return updatedList;
      });
      setInput('');
      const elementIndex = list.length + 1;
      onAdd?.(input, elementIndex);
    }
  };

  const handleDeleteElement = (id: string) => {
    onDelete?.(id);
    setList((oldList: any) => {
      return oldList.filter((item: OrderType) => item.id !== id);
    });
  };

  const handleOnChange = (els: OrderType[]) => {
    // Update the order of the items
    const updatedItems = [...list];
    const tmpIems = [];
    els.forEach((el, index) => {
      const itemIndex = updatedItems.findIndex(
        (item: any) => item.id === el.id
      );
      if (updatedItems?.[itemIndex]?.[orderField]) {
        updatedItems[itemIndex][orderField] = index + 1;
      }
    });

    setList(updatedItems || []);
    // send updated items without editForm property
    onChange?.(
      updatedItems.map((item: any) => {
        const { editForm, ...rest } = item;

        return rest;
      })
    );
  };

  return (
    <div className={styles.dndListForm}>
      <p className={styles.dndListFormLabel}>{label}</p>
      <DndList
        elements={list.map((item: any) => ({
          id: item.id,
          name: item.name,
          editForm: item.editForm || null,
        }))}
        onDelete={handleDeleteElement}
        onChange={handleOnChange}
      />
      <TextField
        className={styles.dndListFormInput}
        placeholder="Role level name"
        icon={<Plus />}
        value={input}
        onChange={(e) => setInput((e.target as HTMLInputElement).value)}
        onKeyDown={handleAddElement}
        error={error}
      />
    </div>
  );
};

export default DndListForm;
