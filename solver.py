"""
    @author: Dan Thoreson
    @date: 24-Jan-2021
    @description: Sudoku-solving algorithm. Input is an 9x9 array of arrays to the solveSudoku() function. 
                  Missing values should be denoted by zeroes. Given a valid input, solveSudoku() will return
                  a completed puzzle.
                  Example implementation: 
                    board = [
                        [5, 3, 0, 0, 7, 0, 0, 0, 0],
                        [6, 0, 0, 1, 9, 5, 0, 0, 0],
                        [0, 9, 8, 0, 0, 0, 0, 6, 0],
                        [8, 0, 0, 0, 6, 0, 0, 0, 3],
                        [4, 0, 0, 8, 0, 3, 0, 0, 1],
                        [7, 0, 0, 0, 2, 0, 0, 0, 6],
                        [0, 6, 0, 0, 0, 0, 2, 8, 0],
                        [0, 0, 0, 4, 1, 9, 0, 0, 5],
                        [0, 0, 0, 0, 8, 0, 0, 7, 9]
                    ]

                    print(solve_sudoku(board))
"""

def solve_sudoku(board):
    num_of_unsolved = find_total_unsolved(board) # TODO 

    while num_of_unsolved > 0:
        for x in range(9):
            for y in range(9):
                if board[y][x] == 0:
                    board[y][x] = solve_cell(board, x, y)

                    if board[y][x] != 0:
                        num_of_unsolved = num_of_unsolved - 1
    
    return board

# Returns the value for a given cell
def solve_cell(board, x, y):
    block_array = get_block_array(board, x, y)
    row_array = get_col_or_row_array(board, "row", y)
    col_array = get_col_or_row_array(board, "col", x)

    survivors = []

    # Check and see if any values are in the row, column, or block
    # If they are not present, add to a list of possible solutions
    for n in range(1, 10):
        if not_in_list(block_array, n) and not_in_list(row_array, n) and not_in_list(col_array, n):
            survivors.append(n)

    # If there is only one possible value for the cell, return it
    return survivors[0] if len(survivors) == 1 else 0

# Cleans up the if-condition where we check for values not existing in several lists
def not_in_list(arr, val):
    return not val in arr

# Returns a given row or column array based on the inputted type
def get_col_or_row_array(board, type, n):
    col_or_row_array = []

    for i in range(9):
        val = board[n][i] if type == "row" else board[i][n]
        col_or_row_array.append(val)

    return col_or_row_array

# Retrieves the 3x3 grid of neighbors for given coordinates
def get_block_array(board, x, y):
    block_options = []
    col_indices = get_needed_indices(y)
    row_indices = get_needed_indices(x)

    for x in range(len(col_indices)):
        for y in range(len(row_indices)):
            block_options.append(board[col_indices[x]][row_indices[y]])

    return block_options

# Gets the indices of the neighboring cells for a single value
def get_needed_indices(n):
    indices = []

    if n == 0 or n == 3 or n == 6:
        indices.append(n)
        indices.append(n+1)
        indices.append(n+2)
    elif n == 1 or n == 4 or n == 7:
        indices.append(n-1)
        indices.append(n)
        indices.append(n+1)
    else:
        indices.append(n-2)
        indices.append(n-1)
        indices.append(n)

    return indices

"""
    Gets the number of cells we need to solve for
    We'll decrement this count as we work through the puzzle
"""
def find_total_unsolved(board):
    num_of_unsolved = 0

    for x in range(9):
        for y in range(9):
            if board[x][y] == 0:
                num_of_unsolved = num_of_unsolved + 1

    return num_of_unsolved