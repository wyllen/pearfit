import { useEffect, useState } from 'react';
import type { DndListProps, OrderType } from '../dnd-list/dnd-list';
import DndList from '../dnd-list/dnd-list';
import TextField from '../text-field/text-field';

import styles from './dnd-list-form.module.scss';

interface DndListFormProps extends DndListProps {
  onAdd?: (name: string, index: number) => void;
  error?: string;
}

const DndListForm = ({
  elements,
  onAdd,
  error,
  onDelete,
  onChange,
}: DndListFormProps) => {
  const [list, setList] = useState<OrderType[]>(elements);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    setList(elements);
  }, [elements]);

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
    setList(els);
    onChange?.(els);
  };

  return (
    <div>
      <DndList
        elements={list}
        onDelete={handleDeleteElement}
        onChange={handleOnChange}
      />
      <TextField
        className={styles.dndListFormInput}
        value={input}
        onChange={(e) => setInput((e.target as HTMLInputElement).value)}
        onKeyDown={handleAddElement}
        error={error}
      />
    </div>
  );
};

export default DndListForm;
