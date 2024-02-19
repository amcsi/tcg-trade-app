import { TableRow, usePriceTable } from '@/src/hooks/priceTable';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function DataTableRow({
  item: { amount, name, price },
  rowCount,
  index,
  setValue,
  deleteEmptyRows,
}: Props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const textInputStyle = [styles.textInput, { borderColor: colors.text, color: colors.text }];
  const isLastRow = index === rowCount - 1;
  const placeholderTextColor = colors.placeholderTextColor;

  return (
    <View style={styles.container}>
      <View style={styles.amount}>
        <Text style={{ color: colors.text }}>{index + 1}</Text>
      </View>
      <View style={styles.amount}>
        <TextInput
          style={textInputStyle}
          textAlign="center"
          keyboardType={'numeric'}
          value={amount}
          selectTextOnFocus
          onFocus={deleteEmptyRows}
          onChangeText={setValue.bind(null, 'amount')}
          placeholder={'1x'}
          placeholderTextColor={placeholderTextColor}
        />
      </View>
      <View style={styles.name}>
        <TextInput
          style={textInputStyle}
          value={name}
          selectTextOnFocus
          onFocus={deleteEmptyRows}
          onChangeText={setValue.bind(null, 'name')}
          placeholder={isLastRow ? 'Card Name' : ''}
          placeholderTextColor={placeholderTextColor}
        />
      </View>
      <View style={styles.price}>
        <TextInput
          style={textInputStyle}
          keyboardType={'numeric'}
          value={price}
          selectTextOnFocus
          onFocus={deleteEmptyRows}
          onChangeText={setValue.bind(null, 'price')}
          placeholder={isLastRow ? 'Price' : ''}
          placeholderTextColor={placeholderTextColor}
        />
      </View>
    </View>
  );
}

type Props = {
  index: number;
  rowCount: number;
  item: ReturnType<typeof usePriceTable>['tableState'][number];
  setValue: (property: keyof TableRow, value: string) => void;
  deleteEmptyRows: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    flex: 1,
  },
  amount: {
    width: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    width: 60,
  },
  textInput: {
    width: '100%',
    padding: 3,
    borderWidth: 1,
  },
});
