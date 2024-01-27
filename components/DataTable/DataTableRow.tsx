import React from 'react';
import { TableRow, usePriceTable } from '@/src/hooks/priceTable';
import { StyleSheet, TextInput, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function DataTableRow({ item: { amount, name, price }, setValue }: Props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const textInputStyle = [styles.textInput, { borderColor: colors.text, color: colors.text }];
  return (
    <View style={styles.container}>
      <View style={styles.amount}>
        <TextInput
          style={textInputStyle}
          textAlign="center"
          keyboardType={'numeric'}
          value={amount}
          selectTextOnFocus
          onChangeText={setValue.bind(null, 'amount')}
        />
      </View>
      <View style={styles.name}>
        <TextInput
          style={textInputStyle}
          value={name}
          selectTextOnFocus
          onChangeText={setValue.bind(null, 'name')}
        />
      </View>
      <View style={styles.price}>
        <TextInput
          style={textInputStyle}
          keyboardType={'numeric'}
          value={price}
          selectTextOnFocus
          onChangeText={setValue.bind(null, 'price')}
        />
      </View>
    </View>
  );
}

type Props = {
  item: ReturnType<typeof usePriceTable>['tableState'][number];
  setValue: (property: keyof TableRow, value: string) => void;
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
