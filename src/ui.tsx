import { Alert, Platform } from 'react-native';

export function onConfirm(title: string, message: string, action: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(message)) {
      action();
    }

    return;
  }

  Alert.alert(title, message, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: action,
    },
  ]);
}
