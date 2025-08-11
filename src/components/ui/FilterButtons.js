import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Bộ lọc:</Text>
      <View style={styles.filterButtons}>
        <TouchableOpacity 
          style={[styles.filterButton, currentFilter === 'ALL' && styles.activeFilter]}
          onPress={() => onFilterChange('ALL')}
        >
          <Text>Tất cả</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, currentFilter === 'PRICE_HIGH' && styles.activeFilter]}
          onPress={() => onFilterChange('PRICE_HIGH')}
        >
          <Text>Giá > 50tr</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, currentFilter === 'PRICE_LOW' && styles.activeFilter]}
          onPress={() => onFilterChange('PRICE_LOW')}
        >
          <Text>Giá ≤ 50tr</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FilterButtons;