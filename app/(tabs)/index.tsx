import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { usePriceTable } from '@/src/hooks/priceTable';
import DataTableWithHeader from '@/components/DataTableWithHeader';

export default function TabOneScreen() {
  const priceTable1 = usePriceTable('top');
  const priceTable2 = usePriceTable('bottom');

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <DataTableWithHeader priceTable={priceTable1} />
      </View>
      <View style={{ flex: 1 }}>
        <DataTableWithHeader priceTable={priceTable2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
