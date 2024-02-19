import React from 'react';
import { Text, View } from '@/components/Themed';
import { ScrollView, StyleSheet } from 'react-native';
import DataTable from '@/components/DataTable';
import { usePriceTable } from '@/src/hooks/priceTable';
import { numberFormatter } from '@/src/format';

export default function DataTableWithHeader({ priceTable, isLarger }: Props) {
  const { tableState, total, setValue, deleteEmptyRowsExceptIndex } = priceTable;
  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <Text style={{ textDecorationLine: isLarger ? 'underline' : undefined }}>
          <Text>Total: $</Text>
          <Text style={styles.title}> {numberFormatter.format(total)}</Text>
          {isLarger ? <Text> (&gt;)</Text> : null}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <DataTable
          tableState={tableState}
          setValue={setValue}
          deleteEmptyRowsExceptIndex={deleteEmptyRowsExceptIndex}
        />
      </ScrollView>
    </View>
  );
}

interface Props {
  priceTable: ReturnType<typeof usePriceTable>;
  isLarger: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
