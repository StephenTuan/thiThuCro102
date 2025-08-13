import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodoToApi, updateTodoInApi } from '../redux/actions/todoAction';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomButton from '../components/ui/CustomButton';
import CustomInput from '../components/ui/CustomInput';

const AddEditScreen = ({ editItem, onClose }) => {
  const dispatch = useDispatch();
  const isEditMode = !!editItem;

  // Form state
  const [ten_xe, setTenXe] = useState('');
  const [mau_sac_PH33001, setMauSac] = useState('');
  const [gia_ban_PH33001, setGiaBan] = useState('');
  const [mo_ta_PH33001, setMoTa] = useState('');
  const [hinh_anh_PH33001, setHinhAnh] = useState(null);

  useEffect(() => {
    if (isEditMode && editItem) {
      setTenXe(editItem.ten_xe_PH33001);
      setMauSac(editItem.mau_sac_PH33001);
      setGiaBan(editItem.gia_ban_PH33001.toString());
      setMoTa(editItem.mo_ta_PH33001 || '');
      setHinhAnh(editItem.hinh_anh_PH33001);
    }
  }, [isEditMode, editItem]);

  // Handle submit
  const handleSubmit = async () => {
    if (!ten_xe || !mau_sac_PH33001 || !gia_ban_PH33001) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const todoData = {
      ten_xe_PH33001: ten_xe,
      mau_sac_PH33001: mau_sac_PH33001,
      gia_ban_PH33001: parseFloat(gia_ban_PH33001),
      mo_ta_PH33001: mo_ta_PH33001,
      hinh_anh_PH33001: hinh_anh_PH33001 ? hinh_anh_PH33001 : 'https://images2.thanhnien.vn/528068263637045248/2024/11/11/edit-exciter-3-17312928665861227184593.jpeg',
    };

    try {
      if (isEditMode) {
        await dispatch(updateTodoInApi(editItem.id, todoData));
        Alert.alert('Thành công', 'Cập nhật xe thành công');
      } else {
        await dispatch(addTodoToApi({
          id: Date.now().toString(),
          ...todoData,
        }));
        Alert.alert('Thành công', 'Thêm xe thành công');
      }
      onClose();
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra');
    }
  };

  // Handle image picker
  const handleImagePicker = () => {
    Alert.alert(
      'Chọn ảnh',
      'Chọn nguồn ảnh',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Chụp ảnh', onPress: () => handleCamera() },
        { text: 'Thư viện ảnh', onPress: () => handleGallery() }
      ]
    );
  };

  const handleCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        setHinhAnh(response.assets[0].uri);
      }
    });
  };

  const handleGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setHinhAnh(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isEditMode ? 'Cập nhật' : 'Thêm'}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <CustomInput
            label="Tên xe"
            value={ten_xe}
            onChangeText={setTenXe}
            placeholder="Nhập tên xe"
          />
          <CustomInput
            label="Màu sắc"
            value={mau_sac_PH33001}
            onChangeText={setMauSac}
            placeholder="Nhập màu sắc"
          />
          <CustomInput
            label="Giá bán"
            value={gia_ban_PH33001}
            onChangeText={setGiaBan}
            placeholder="Nhập giá bán"
            keyboardType="numeric"
          />
          <CustomInput
            label="Mô tả"
            value={mo_ta_PH33001}
            onChangeText={setMoTa}
            placeholder="Nhập mô tả (tùy chọn)"
          />
          <View style={styles.imagePickerContainer}>
            <Text style={styles.inputLabel}>Hình ảnh</Text>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={handleImagePicker}
            >
              <Text style={styles.imagePickerButtonText}>
                {hinh_anh_PH33001 ? 'Thay đổi ảnh' : 'Chọn ảnh'}
              </Text>
            </TouchableOpacity>

            {hinh_anh_PH33001 && (
              <Image
                source={{ uri: hinh_anh_PH33001 }}
                style={styles.previewImage}
              />
            )}
          </View>

          <View style={styles.formButtons}>
            <CustomButton
              title={isEditMode ? 'Cập nhật' : 'Thêm xe'}
              onPress={handleSubmit}
            />
            <CustomButton
              title="Hủy"
              onPress={onClose}
              color="#757575"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2196F3',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  imagePickerContainer: {
    marginBottom: 16,
  },
  imagePickerButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 4,
  },
  imagePickerButtonText: {
    color: '#333',
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginTop: 8,
    borderRadius: 4,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default AddEditScreen;