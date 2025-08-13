import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity,Alert, Modal} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodoFromApi, fetchTodosFromApi } from '../redux/actions/todoAction';
import Banner from '../components/ui/Banner';
import TodoItem from '../components/ui/TodoItem';
import AddEditScreen from './AddEditScreen';


const TodoScreen = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state.todos);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Fetch todos when component mounts
  useEffect(() => {
    dispatch(fetchTodosFromApi());
  }, [dispatch]);

  // Modal handlers
  const openAddModal = () => {
    setEditItem(null);
    setIsModalVisible(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditItem(null);
  };

  // Render todo item
  const renderItem = ({ item }) => (
    <TodoItem
      item={item}
      onEdit={openEditModal}
      onDelete={
        async () => {
          try {
            await dispatch(deleteTodoFromApi(item.id));
            Alert.alert('Thành công', 'Xóa xe thành công');
          } catch (error) {
            Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi xóa');
          }
        }
      }
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Banner />
        <View style={styles.headerContainer}>
          <Text style={styles.listTitle}>Danh sách xe</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={openAddModal}
          >
            <Text style={styles.addButtonText}>+ Thêm xe</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <AddEditScreen
          editItem={editItem}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding:10,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  }
});

export default TodoScreen;