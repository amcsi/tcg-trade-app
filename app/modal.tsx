import { Alert, Button, StyleSheet } from 'react-native';
import { Link, Text, View } from '@/components/Themed';
import { usePriceTable } from '@/src/hooks/priceTable';

export default function ModalScreen() {
  const priceTableTop = usePriceTable('top');
  const priceTableBottom = usePriceTable('bottom');

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          Alert.alert('Are you sure?', 'Are you sure you want to clear the data from the tables?', [
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
        title={'Clear Tables'}
      />

      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <View>
          <Text>
            This app was developed by <Link href={githubUrl}>Attila Szeremi</Link>,
          </Text>
          <Text>
            and is <Link href={repositoryUrl}>open source</Link>.
          </Text>
        </View>
      </View>
    </View>
  );
}

const githubUrl = 'https://github.com/amcsi';
const repositoryUrl = `${githubUrl}/tcg-trade-app`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
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
