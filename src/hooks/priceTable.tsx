import { useId, useMemo, useState } from 'react';
import { produce } from 'immer';

export function usePriceTable() {
  const [tableState, setTableState] = useState(newTableState);

  const total = useMemo(() => {
    return tableState.reduce((acc, v) => {
      const amount = v.amount !== '' ? Number(v.amount) || 0 : 1;
      return acc + amount * (Number(v.price.replace(',', '.')) || 0);
    }, 0);
  }, [tableState]);

  return { total, tableState, setValue };

  function setValue(index: number, property: keyof TableRow, value: string) {
    setTableState((tableState) =>
      produce(tableState, (draft) => {
        draft[index][property] = value;
      }),
    );
  }
}

function newTableState() {
  return [
    {
      id: newId(),
      name: '',
      amount: '0',
      price: '',
    },
    ...Array(100)
      .fill(null)
      .map(() => ({ id: newId(), name: '', amount: '', price: '' })),
  ];
}

function newId() {
  return String(Math.random());
}

export type TableRow = ReturnType<typeof newTableState>[number];
