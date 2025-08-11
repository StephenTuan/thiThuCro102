import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ item, onEdit, onDelete }) => {
  return (
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
});

export default TodoItem;