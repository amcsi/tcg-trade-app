import { Alert, Button, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { usePriceTable } from '@/src/hooks/priceTable';
import { useNavigation } from 'expo-router';

export default function ModalScreen() {
  const { clearData } = usePriceTable();
  const { goBack } = useNavigation();

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
                clearData();
                goBack();
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
