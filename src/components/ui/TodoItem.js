import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.todoItem}>
      <View style={{flexDirection:'row'}}>
        {item.hinh_anh_PH33001 && (
          <Image
            source={{ uri: item.hinh_anh_PH33001 }}
            style={styles.todoImage}
          />
        )}
        <View style={styles.todoInfo}>
          <Text style={styles.todoTitle}>{item.ten_xe_PH33001}</Text>
          <Text>Màu sắc: {item.mau_sac_PH33001}</Text>
          <Text>Giá bán: {item.gia_ban_PH33001} VNĐ</Text>
          {/* {item.mo_ta_PH33001 && <Text>Mô tả: {item.mo_ta_PH33001}</Text>} */}
          <Text>Mô tả: {item.mo_ta_PH33001}</Text>
        </View>
      </View>

      <View style={styles.todoActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.actionButtonText}>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.actionButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  todoInfo: {
    width: '60%'
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoImage: {
    width: '40%',
    height: 100,
    margin: 5,
    borderWidth:1,
    borderColor: 'black',
    borderRadius:5
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding:8,
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
});

export default TodoItem;