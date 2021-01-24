/** 
    @author: Dan Thoreson
    @date: 24-Jan-2021
    @description: Sudoku-solving algorithm. Input is an 9x9 array of arrays to the solveSudoku() function. 
                  Missing values should be denoted by zeroes. Given a valid input, solveSudoku() will return
                  a completed puzzle. 
                  Example implementation: 
                    let board = [
                        [5, 3, 0, 0, 7, 0, 0, 0, 0],
                        [6, 0, 0, 1, 9, 5, 0, 0, 0],
                        [0, 9, 8, 0, 0, 0, 0, 6, 0],
                        [8, 0, 0, 0, 6, 0, 0, 0, 3],
                        [4, 0, 0, 8, 0, 3, 0, 0, 1],
                        [7, 0, 0, 0, 2, 0, 0, 0, 6],
                        [0, 6, 0, 0, 0, 0, 2, 8, 0],
                        [0, 0, 0, 4, 1, 9, 0, 0, 5],
                        [0, 0, 0, 0, 8, 0, 0, 7, 9]
                    ];

                    console.log("Solved board: ", solveSudoku(board));
**/ 

const solveSudoku = board => {
    let numOfUnsolved = findTotalUnsolved(board);

    while(numOfUnsolved > 0) {
        for(let x = 0; x < 9; x++) {
            for(let y = 0; y < 9; y++) {
                if(board[y][x] === 0) {
                    board[y][x] = solveCell(board, x, y);

                    // If the cell was previously 0 and is now non-zero, we solved it
                    if(board[y][x] !== 0) {
                        numOfUnsolved--;
                    }
                }             
            }
        }
    }

    return board;
}

// Finds the total # of unsolved cells in the table; we'll decrement this count as we solve the puzzle
const findTotalUnsolved = (board) => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((total, x) => {
        const unsolveddThisRow = board[x].reduce((count, n) => {
            return (n === 0) ? count + 1 : count;
        }, 0);

        return total += unsolveddThisRow; 
    }, 0);
}

const solveCell = (board, x, y) => {
    // Get the values that are not present in the row, column, or 3x3 block
    const survivors = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => {
        return !getColOrRowArray(board, "row", y).includes(n) && !getColOrRowArray(board, "col", x).includes(n) && !getBlockArray(board, x, y).includes(n);
    });

    // Solve the cell when it has only one possible value
    return survivors.length === 1 ? survivors[0] : 0;
}

const getColOrRowArray = (board, type, n) => {
    let colOrRowArray = [];
    for(let i = 0; i < 9; i++) {
        if(type === "row") {
            colOrRowArray.push(board[n][i]);
        } else {
            colOrRowArray.push(board[i][n]);
        }
        
    }

    return colOrRowArray;
}

const getBlockArray = (board, x, y) => {
    let blockOptions = [];

    // Get the neighbors
    const colIndicesNeeded = getNeededIndices(y);
    const rowIndicesNeeded = getNeededIndices(x);

    for(let x = 0; x < colIndicesNeeded.length; x++) {
        for(let y = 0; y < rowIndicesNeeded.length;y++) {
            blockOptions.push(board[colIndicesNeeded[x]][rowIndicesNeeded[y]]);
        }            
    }    

    return blockOptions;
}

// Used with getBlockOptions - returns an array of the cell's neighboring indices
const getNeededIndices = (n) => {
    let indices = [];

    if(n === 0 || n === 3 || n === 6) {
        indices.push(n);
        indices.push(n+1);
        indices.push(n+2);
    } else if(n === 1 || n === 4 || n === 7) {
        indices.push(n-1);
        indices.push(n);
        indices.push(n+1);
    } else {
        indices.push(n-2);
        indices.push(n-1);
        indices.push(n); 
    }

    return indices;
}