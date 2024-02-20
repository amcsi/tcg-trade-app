import { usePriceTable } from '@/src/hooks/priceTable';
import { StyleSheet } from 'react-native';
import { numberFormatter } from '@/src/format';
import { Text, View } from '@/components/Themed';

export default function TotalCompare({ priceTable1, priceTable2 }: Props) {
  const total1 = priceTable1.total;
  const total2 = priceTable2.total;

  const absoluteDifference = Math.abs(total2 - total1);

  if (total1 === total2) {
    return (
      <View style={styles.container}>
        <Text>
          Both prices are <Text style={{ fontWeight: 'bold' }}>equal</Text>.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        <Text style={{ fontWeight: 'bold' }}>{total1 > total2 ? 'TOP' : 'BOTTOM'}</Text> list is
        worth more by{' '}
        <Text style={{ fontWeight: 'bold' }}>$ {numberFormatter.format(absoluteDifference)}</Text>.
      </Text>
    </View>
  );
}

interface Props {
  priceTable1: ReturnType<typeof usePriceTable>;
  priceTable2: ReturnType<typeof usePriceTable>;
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});
