import { useMemo } from 'react';
import { produce } from 'immer';
import { create } from 'zustand';

export function usePriceTable(instance: StoreInstance) {
  //eslint-disable-next-line react-hooks/rules-of-hooks
  const state = instance === 'top' ? usePriceTableStoreTop() : usePriceTableStoreBot();
  const { tableState, setValue, clearData } = state;

  const total = useMemo(() => {
    return tableState.reduce((acc, v) => {
      const amount = v.amount !== '' ? Number(v.amount) || 0 : 1;
      return acc + amount * (Number(v.price.replace(',', '.')) || 0);
    }, 0);
  }, [tableState]);

  return { total, tableState, setValue, clearData };
}

function createPriceTableStore() {
  return create<State>((set) => ({
    tableState: newTableState(),
    clearData() {
      set({
        tableState: newTableState(),
      });
    },
    setValue(index: number, property: keyof TableRow, value: string) {
      set(({ tableState }) => ({
        tableState: produce(tableState, (draft) => {
          draft[index][property] = value;
        }),
      }));
    },
  }));
}

const usePriceTableStoreTop = createPriceTableStore();
const usePriceTableStoreBot = createPriceTableStore();

type StoreInstance = 'top' | 'bottom';

type State = {
  tableState: ReturnType<typeof newTableState>;
  setValue: (index: number, property: keyof TableRow, value: string) => void;
  clearData: () => void;
};

function newTableState() {
  return Array(100)
    .fill(null)
    .map(() => ({ id: newId(), name: '', amount: '', price: '' }));
}

function newId() {
  return String(Math.random());
}

export type TableRow = ReturnType<typeof newTableState>[number];
