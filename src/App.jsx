import React, { useState } from "react";

const MAZE_SIZE = 35;
const WALL = "#";
const PATH = " ";
const START = "S";
const END = "E";

function generateMaze() {
  // Create an empty maze
  const maze = Array(MAZE_SIZE)
    .fill(null)
    .map(() => Array(MAZE_SIZE).fill(WALL));

  // Generate a random starting point and mark it as a path
  let x = 0;
  let y = Math.floor(Math.random() * MAZE_SIZE);
  maze[x][y] = PATH;

  // Generate the maze recursively
  generatePath(maze, x, y);

  // Mark the start and end points
  maze[0][y] = START;
  maze[Math.floor(MAZE_SIZE / 2)][Math.floor(MAZE_SIZE / 2)] = END;

  return maze;
}

function generatePath(maze, x, y) {
  // Create a list of directions
  const directions = [
    [1, 0], // Down
    [0, 1], // Right
    [-1, 0], // Up
    [0, -1], // Left
  ];

  // Shuffle the directions randomly
  directions.sort(() => Math.random() - 0.5);

  // Try each direction
  for (let direction of directions) {
    // Calculate the new position
    const newX = x + direction[0] * 2;
    const newY = y + direction[1] * 2;

    // Check if the new position is inside the maze
    if (
      newX >= 0 &&
      newX < MAZE_SIZE &&
      newY >= 0 &&
      newY < MAZE_SIZE &&
      maze[newX][newY] === WALL
    ) {
      // Mark the path
      maze[x + direction[0]][y + direction[1]] = PATH;
      maze[newX][newY] = PATH;

      // Recursive call
      generatePath(maze, newX, newY);
    }
  }
}

function Maze() {
  const [maze, setMaze] = useState(generateMaze());

  return (
    <div className="maze">
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="maze-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`maze-cell ${cell === WALL ? "wall" : ""}`}
            >
              {cell === START && <span className="start">{cell}</span>}
              {cell === END && <span className="end">{cell}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Maze />
    </div>
  );
}
