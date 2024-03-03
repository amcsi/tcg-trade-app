import { useMemo } from 'react';
import { produce } from 'immer';
import { create } from 'zustand';
import { parseNumber } from '@/src/format';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePriceTable(instance: StoreInstance) {
  //eslint-disable-next-line react-hooks/rules-of-hooks
  const state = instance === 'top' ? usePriceTableStoreTop() : usePriceTableStoreBot();
  const { tableState, setValue, clearData, deleteEmptyRowsExceptIndex } = state;

  const total = useMemo(() => {
    return tableState.reduce((acc, v) => {
      const amount = parseNumber(v.amount) ?? 1;
      return acc + amount * (parseNumber(v.price) ?? 0);
    }, 0);
  }, [tableState]);

  return { total, tableState, setValue, clearData, deleteEmptyRowsExceptIndex };
}

function createPriceTableStore(asyncItemName: string) {
  return create(
    persist<State>(
      (set) => ({
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
              if (index + 1 >= tableState.length) {
                draft.push(newTableRow());
              }
            }),
          }));
        },
        deleteEmptyRowsExceptIndex(exceptIndex: number) {
          set(({ tableState }) => ({
            tableState: produce(tableState, (draft) => {
              for (let index = tableState.length - 2; index >= 0; index--) {
                if (index === exceptIndex) {
                  continue;
                }
                if (properties.every((property) => draft[index][property] === '')) {
                  draft.splice(index, 1);
                }
              }
            }),
          }));
        },
      }),
      {
        name: asyncItemName,
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  );
}

const properties: Array<keyof TableRow> = ['name', 'amount', 'price'];

const usePriceTableStoreTop = createPriceTableStore('price-table-top');
const usePriceTableStoreBot = createPriceTableStore('price-table-bottom');

type StoreInstance = 'top' | 'bottom';

type State = {
  tableState: ReturnType<typeof newTableState>;
  setValue: (index: number, property: keyof TableRow, value: string) => void;
  clearData: () => void;
  deleteEmptyRowsExceptIndex: (exceptIndex: number) => void;
};

function newTableState() {
  return Array(1).fill(null).map(newTableRow);
}

function newTableRow() {
  return { id: newId(), name: '', amount: '', price: '' };
}

function newId() {
  return String(Math.random());
}

export type TableRow = ReturnType<typeof newTableRow>;
