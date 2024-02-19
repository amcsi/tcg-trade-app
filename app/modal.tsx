import { Alert, Button, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { usePriceTable } from '@/src/hooks/priceTable';

export default function ModalScreen() {
  const priceTableTop = usePriceTable('top');
  const priceTableBottom = usePriceTable('bottom');

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          Alert.alert('Are you sure?', 'Are you sure you want to clear the data?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress() {
                priceTableTop.clearData();
                priceTableBottom.clearData();
              },
            },
          ]);
        }}
        title={'Clear Data'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
