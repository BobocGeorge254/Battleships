import React, { useState } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import GameService from "../../services/game.service";

const targetShipsCount = {
  2: 4,
  3: 3,
  4: 2,
  6: 1
}

const shipColors = {
  2: '#8fbf88',
  3: '#5c9154',
  4: '#295922',
  6: '#13420b'
}
const xPositions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const yPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function ConfigureScreen({ route, navigation }) {
  const { game } = route.params;
  const [size, setSize] = useState(2);
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null)));
  const [direction, setDirection] = useState("HORIZONTAL");
  const [ships, setShips] = useState([])

  

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <TouchableOpacity
            key={`${rowIndex} ${colIndex}`}
            style={[styles.cell, { backgroundColor: cell ? shipColors[cell] : "gray" }]}
            onPress={() => handlePressCell(rowIndex, colIndex)}
          />
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.controls}>
          <Text>Size:</Text>
          {[2, 3, 4, 6].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.sizeButton,
                { backgroundColor: getSizeButtonColor(value) },
              ]}
              disabled={!checkShipCount(value)}
              onPress={() => handleSetShipSize(value)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
          <Button
            title="Revert"
            onPress={revertShip}
          />
        </View>
        <View style={styles.directionButtons}>
          <Button
            title="Horizontal"
            onPress={() => setDirection("HORIZONTAL")}
            color={direction === "HORIZONTAL" ? "blue" : "gray"}
          />
          <Button
            title="Vertical"
            onPress={() => setDirection("VERTICAL")}
            color={direction === "VERTICAL" ? "blue" : "gray"}
          />
        </View>
      </View>
      {renderBoard()}
      <Button 
        title="Submit"
        onPress={handleSendMapConfiguration}
      />
    </View>
  );

  function handlePressCell(rowIndex, colIndex) {
    if (!checkShipCount(size)) return;
    const newBoard = board.map(row => [...row]);

    if (direction == "HORIZONTAL" ) {
      if (colIndex + size - 1 >= 10) return;
      for (let i = colIndex; i < colIndex + size; i++) {
        if (board[rowIndex][i]) return;
        newBoard[rowIndex][i] = size;
      }
    }
    
    if (direction == "VERTICAL" ) {
      if (rowIndex + size - 1 >= 10) return;
      for (let i = rowIndex; i < rowIndex + size; i++) {
        if (board[i][colIndex]) return;
        newBoard[i][colIndex] = size;
      }
    }

    const newShip = {
      x: xPositions[colIndex],
      y: yPositions[rowIndex],
      size, direction
    }
    
    const newShipsData = [...ships, newShip]
    setShips(newShipsData)
    setBoard(newBoard);

    if (!checkShipCount(size, newShipsData))
      [6, 4, 3, 2].forEach(x => {
        if (checkShipCount(x, newShipsData) &&  !checkShipCount(size, newShipsData)) {
          setSize(x)
        }
      })
  };

  function getSizeButtonColor(value) {
    if (!checkShipCount(value)) return 'gray'
    if (size != value) return '#64a7fa'
    return 'blue';
  }

  function checkShipCount(size, shipsData=ships) {
    const count = shipsData.filter(x => x.size == size).length
    return count < targetShipsCount[size]
  }

  function handleSetShipSize(value) {
    if(checkShipCount(value))
      setSize(value)
  }

  function revertShip() {
    if (!ships || ships.length == 0) return;

    const newBoard = board.map(row => [...row]);
    const lastShip = ships[ships.length - 1]
    const colIndex = lastShip.x.charCodeAt(0) - 'A'.charCodeAt(0)
    const rowIndex = lastShip.y - 1

    if (lastShip.direction == "HORIZONTAL" )
      for (let i = colIndex; i < colIndex + lastShip.size; i++)
        newBoard[rowIndex][i] = null;
    
    if (lastShip.direction == "VERTICAL" )
      for (let i = rowIndex; i < rowIndex + lastShip.size; i++)
        newBoard[i][colIndex] = null;
    
    setShips(ships.slice(0, ships.length - 1))
    setBoard(newBoard)
  }

  async function handleSendMapConfiguration() {
    GameService.sendMapConfig(game.id, {ships}).then(res => console.log(res))
  }
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
