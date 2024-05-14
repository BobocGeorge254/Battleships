import React from 'react'
import { TouchableOpacity, View } from 'react-native';


const ShipsBoard = ({board, cellSize = 30, cellColor = (cell) => 'gray', onCellPress = (rowIndex, colIndex) => null}) => {
  return board.map((row, rowIndex) => (
    <View key={rowIndex} style={{flexDirection: 'row'}}>
      {row.map((cell, colIndex) => (
        <TouchableOpacity
          key={`${rowIndex} ${colIndex}`}
          style={{ 
            width: cellSize, 
            height: cellSize, 
            backgroundColor: cellColor(cell),
            margin: 1, 
          }}
          onPress={() => onCellPress(rowIndex, colIndex)}
        />
      ))}
    </View>
  ));
}

export default ShipsBoard;