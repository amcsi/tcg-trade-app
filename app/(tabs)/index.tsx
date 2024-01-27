import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { usePriceTable } from '@/src/hooks/priceTable';
import DataTable from '@/components/DataTable';

export default function TabOneScreen() {
  const { total, tableState, setValue } = usePriceTable();

  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <Text>Total: $</Text>
        <Text style={styles.title}> {formatter.format(total)}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <DataTable tableState={tableState} setValue={setValue} />
      </ScrollView>
    </View>
  );
}

const formatter = new Intl.NumberFormat();

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
