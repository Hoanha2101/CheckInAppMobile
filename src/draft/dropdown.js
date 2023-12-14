import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Trí tuệ nhân tạo', value: 'Trí tuệ nhân tạo' },
  { label: 'Kĩ thuật phần mềm', value: 'Kĩ thuật phần mềm' },
  { label: 'Quản trị kinh doanh', value: 'Quản trị kinh doanh' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Thiết kế mĩ thuật số', value: 'Thiết kế mĩ thuật số' },
  { label: 'An toàn thông tin', value: 'An toàn thông tin' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select major"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 42,
    border: '#fff',
    borderWidth: 2,
    borderColor: "#fff",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    color:"#fff",
    paddingHorizontal:10,
    fontSize: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 20,
  },
});