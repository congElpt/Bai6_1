import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [phone, setPhone] = useState('');
  const [rawPhone, setRawPhone] = useState('');
  const [error, setError] = useState('');

  // Hàm format: 0xxx xxx xxx
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10); // chỉ giữ số và tối đa 10 ký tự

    let formatted = cleaned;

    if (cleaned.length > 4 && cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    } else if (cleaned.length > 7) {
      formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }

    return { cleaned, formatted };
  };

  const handleChangeText = (text) => {
    const { cleaned, formatted } = formatPhone(text);

    setRawPhone(cleaned);
    setPhone(formatted);

    // Validation khi nhập
    if (cleaned.length === 0) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }

    if (!cleaned.startsWith('0')) {
      setError('Số điện thoại phải bắt đầu bằng số 0');
      return;
    }

    if (cleaned.length < 10) {
      setError('Số điện thoại phải gồm 10 chữ số');
      return;
    }

    setError('');
  };

  const handleContinue = () => {
    if (rawPhone.trim() === '') {
      setError('Vui lòng nhập số điện thoại');
      return;
    }

    if (!/^[0-9]+$/.test(rawPhone)) {
      setError('Số điện thoại chỉ được chứa chữ số');
      return;
    }

    if (rawPhone.length !== 10) {
      setError('Số điện thoại phải gồm 10 chữ số');
      return;
    }

    if (!rawPhone.startsWith('0')) {
      setError('Số điện thoại phải bắt đầu bằng số 0');
      return;
    }

    setError('');
    Alert.alert('Thành công', 'Số điện thoại hợp lệ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title_text}>Đăng nhập</Text>
      </View>

      <View style={styles.contents}>
        <Text style={styles.contents_title}>Nhập số điện thoại</Text>
        <Text style={{ paddingTop: 20 }}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>
      </View>

      <TextInput
        style={styles.TextInput}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="number-pad"
        value={phone}
        onChangeText={handleChangeText}
        maxLength={12} // do có thêm khoảng trắng
      />

      {error !== '' && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.button_text}>Tiếp tục</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    width: '100%',
    height: '10%',
    marginTop: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
    paddingLeft: 10,
  },

  title_text: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  contents: {
    paddingTop: '15%',
    paddingLeft: 10,
  },

  contents_title: {
    fontSize: 20,
  },

  TextInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    width: '100%',
    height: '7%',
    marginTop: 5,
    paddingLeft: 10,
  },

  errorText: {
    color: 'red',
    marginLeft: 10,
    marginTop: 5,
  },

  button: {
    height: '7%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
    marginTop: 20,
    borderRadius: 5,
    marginLeft: 7,
  },

  button_text: {
    fontSize: 18,
    color: 'white',
  },
});