import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { usePriceTable } from '@/src/hooks/priceTable';
import DataTableWithHeader from '@/components/DataTableWithHeader';
import TotalCompare from '@/components/TotalCompare';

export default function TabOneScreen() {
  const priceTable1 = usePriceTable('top');
  const priceTable2 = usePriceTable('bottom');
  const bothNotZero = priceTable1.total !== 0 && priceTable2.total !== 0;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <DataTableWithHeader
          priceTable={priceTable1}
          isLarger={bothNotZero && priceTable1.total > priceTable2.total}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DataTableWithHeader
          priceTable={priceTable2}
          isLarger={bothNotZero && priceTable1.total < priceTable2.total}
        />
      </View>
      {bothNotZero && <TotalCompare priceTable1={priceTable1} priceTable2={priceTable2} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
