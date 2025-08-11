import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTodoToApi, 
  updateTodoInApi, 
  deleteTodoFromApi, 
  setFilter,
  fetchTodosFromApi 
} from '../redux/actions/todoAction';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Banner Component
const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      {/* <Text style={styles.bannerText}>Danh sách xe máy</Text> */}
      <Image 
        source={require('../../assets/banner.jpg')} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );
};

// Custom Input Component
const CustomInput = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

// Custom Button Component
const CustomButton = ({ title, onPress, color = '#2196F3' }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const TodoScreen = () => {
  const dispatch = useDispatch();
  const { todos, filter, loading, error } = useSelector(state => state.todos);
  
  // Form state
  const [isAddMode, setIsAddMode] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [ten_xe, setTenXe] = useState('');
  const [mau_sac, setMauSac] = useState('');
  const [gia_ban, setGiaBan] = useState('');
  const [mo_ta, setMoTa] = useState('');
  const [hinh_anh, setHinhAnh] = useState(null);
  const [maSV, setMaSV] = useState('PH1234'); // Mã sinh viên mẫu
  
  // Fetch todos when component mounts
  useEffect(() => {
    dispatch(fetchTodosFromApi());
  }, [dispatch]);

  // Filtered todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') return true;
    if (filter === 'PRICE_HIGH') return todo.gia_ban > 50000000;
    if (filter === 'PRICE_LOW') return todo.gia_ban <= 50000000;
    return true;
  });

  // Reset form
  const resetForm = () => {
    setTenXe('');
    setMauSac('');
    setGiaBan('');
    setMoTa('');
    setHinhAnh(null);
    setCurrentId(null);
    setIsAddMode(true);
  };

  // Handle add/update todo
  const handleSubmit = async () => {
    if (!ten_xe || !mau_sac || !gia_ban) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const todoData = {
      ten_xe_PH1234: ten_xe,
      mau_sac,
      gia_ban: parseFloat(gia_ban),
      mo_ta,
      hinh_anh: hinh_anh ? hinh_anh : 'https://via.placeholder.com/150',
    };

    try {
      if (isAddMode) {
        // Add new todo
        await dispatch(addTodoToApi({
          id: Date.now().toString(),
          ...todoData,
          createdAt: new Date().toISOString()
        }));
        Alert.alert('Thành công', 'Thêm xe thành công');
      } else {
        // Update todo
        await dispatch(updateTodoInApi(currentId, todoData));
        Alert.alert('Thành công', 'Cập nhật xe thành công');
      }
      resetForm();
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra');
    }
  };

  // Handle edit todo
  const handleEdit = (todo) => {
    setCurrentId(todo.id);
    setTenXe(todo.ten_xe_PH1234);
    setMauSac(todo.mau_sac);
    setGiaBan(todo.gia_ban.toString());
    setMoTa(todo.mo_ta || '');
    setHinhAnh(todo.hinh_anh);
    setIsAddMode(false);
  };

  // Handle delete todo
  const handleDelete = (id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa xe này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          onPress: async () => {
            try {
              await dispatch(deleteTodoFromApi(id));
              Alert.alert('Thành công', 'Xóa xe thành công');
            } catch (error) {
              Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi xóa');
            }
          },
          style: 'destructive'
        }
      ]
    );
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

  // Render todo item
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoInfo}>
        <Text style={styles.todoTitle}>{item.ten_xe_PH1234}</Text>
        <Text>Màu sắc: {item.mau_sac}</Text>
        <Text>Giá bán: {item.gia_ban.toLocaleString('vi-VN')} VNĐ</Text>
        {item.mo_ta && <Text>Mô tả: {item.mo_ta}</Text>}
      </View>
      
      {item.hinh_anh && (
        <Image 
          source={{ uri: item.hinh_anh }} 
          style={styles.todoImage} 
        />
      )}
      
      <View style={styles.todoActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionButtonText}>Sửa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lỗi: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => dispatch(fetchTodosFromApi())}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView>
        <Banner />
        
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Bộ lọc:</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity 
              style={[styles.filterButton, filter === 'ALL' && styles.activeFilter]}
              onPress={() => dispatch(setFilter('ALL'))}
            >
              <Text>Tất cả</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterButton, filter === 'PRICE_HIGH' && styles.activeFilter]}
              onPress={() => dispatch(setFilter('PRICE_HIGH'))}
            >
              <Text>Giá > 50tr</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterButton, filter === 'PRICE_LOW' && styles.activeFilter]}
              onPress={() => dispatch(setFilter('PRICE_LOW'))}
            >
              <Text>Giá ≤ 50tr</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{isAddMode ? 'Thêm xe mới' : 'Cập nhật xe'}</Text>
          
          <CustomInput 
            label="Tên xe"
            value={ten_xe}
            onChangeText={setTenXe}
            placeholder="Nhập tên xe"
          />
          
          <CustomInput 
            label="Màu sắc"
            value={mau_sac}
            onChangeText={setMauSac}
            placeholder="Nhập màu sắc"
          />
          
          <CustomInput 
            label="Giá bán"
            value={gia_ban}
            onChangeText={setGiaBan}
            placeholder="Nhập giá bán"
            keyboardType="numeric"
          />
          
          <CustomInput 
            label="Mô tả"
            value={mo_ta}
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
                {hinh_anh ? 'Thay đổi ảnh' : 'Chọn ảnh'}
              </Text>
            </TouchableOpacity>
            
            {hinh_anh && (
              <Image 
                source={{ uri: hinh_anh }} 
                style={styles.previewImage} 
              />
            )}
          </View>
          
          <View style={styles.formButtons}>
            <CustomButton 
              title={isAddMode ? 'Thêm xe' : 'Cập nhật'}
              onPress={handleSubmit}
            />
            
            {!isAddMode && (
              <CustomButton 
                title="Hủy"
                onPress={resetForm}
                color="#757575"
              />
            )}
          </View>
        </View>
        
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Danh sách xe ({filteredTodos.length})</Text>
          
          {filteredTodos.length > 0 ? (
            <FlatList
              data={filteredTodos}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.emptyText}>Không có xe nào</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2196F3',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bannerContainer: {
    height: 150,
    // backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    position: 'absolute',
  },
  filterContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#bbdefb',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  todoInfo: {
    marginBottom: 8,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  todoImage: {
    width: '100%',
    height: 150,
    borderRadius: 4,
    marginBottom: 8,
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  actionButtonText: {
    color: 'white',
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
    marginTop: 16,
  },
});

export default TodoScreen;