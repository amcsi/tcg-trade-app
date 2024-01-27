import React from 'react';
import { usePriceTable } from '@/src/hooks/priceTable';
import { View } from 'react-native';
import DataTableRow from '@/components/DataTable/DataTableRow';

export default function DataTable({ setValue, tableState }: Props) {
  return (
    <View>
      {tableState.map((item, index) => (
        <DataTableRow key={item.id} item={item} setValue={setValue.bind(null, index)} />
      ))}
    </View>
  );
}

type Props = {
  tableState: ReturnType<typeof usePriceTable>['tableState'];
  setValue: ReturnType<typeof usePriceTable>['setValue'];
};
