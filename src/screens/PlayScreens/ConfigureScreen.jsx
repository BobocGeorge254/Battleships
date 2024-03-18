import React, { useState } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";

export default function PlayScreen({ route }) {
  const { user, playerId, opponentId } = route.params;
  const [size, setSize] = useState(0);
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(false)));
  const [direction, setDirection] = useState("horizontal");

  const handlePress = (rowIndex, colIndex) => {
    const countColoredSquares = board.reduce((acc, row) => {
      return (
        acc +
        row.reduce((rowAcc, cell) => {
          return rowAcc + (cell ? 1 : 0);
        }, 0)
      );
    }, 0);

    if (countColoredSquares < 25) {
      const newBoard = board.map((row, i) => {
        return row.map((cell, j) => {
          if (i === rowIndex && j === colIndex) {
            return true;
          }
          else if (direction === "horizontal" && i === rowIndex && j > colIndex && j <= colIndex + size) {
            return true;
          } 
          else if (direction === "vertical" && i > rowIndex && i <= rowIndex + size && j === colIndex) {
            return true;
          }
          return cell;
        });
      });
      setBoard(newBoard);
    }
  };
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            onPress={() => handlePress(rowIndex, colIndex)}
          >
            <View
              style={[styles.cell, { backgroundColor: cell ? "red" : "gray" }]}
            />
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text>Playing against {opponentId}. Prepare your map</Text>
      <View style={styles.controls}>
        <Text>Size:</Text>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.sizeButton,
              { backgroundColor: size === value ? "blue" : "gray" },
            ]}
            onPress={() => setSize(value)}
          >
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.directionButtons}>
          <Button
            title="Horizontal"
            onPress={() => setDirection("horizontal")}
            color={direction === "horizontal" ? "blue" : "gray"}
          />
          <Button
            title="Vertical"
            onPress={() => setDirection("vertical")}
            color={direction === "vertical" ? "blue" : "gray"}
          />
        </View>
      </View>
      {renderBoard()}
      <Button 
        title="Go"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 30,
    height: 30,
    margin: 1,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  sizeButton: {
    backgroundColor: "gray",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  directionButtons: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
});
