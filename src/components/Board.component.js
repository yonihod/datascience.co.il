import React, {useState,useEffect} from 'react';
import Tile from './Tile.component';

/**
 * Check if the array is solveable using the inversion count theory
 * for reference: https://massivealgorithms.blogspot.com/2015/06/how-to-check-if-instance-of-8-puzzle-is.html#:~:text=The%20formula%20says%3A,a%20solvable%20situation%20is%20odd.
 * 
 * @param {} array 
 */
const isSolveable = (array) => {
    let inversions = 0;
    for(let i = 0; i< array.length; i++){
        if(array[i] != 0){
            const inversion = array[i] - (i+1);
            if(inversion > 0) 
                inversions += array[i] - (i+1)
        }
    }
    return inversions % 2 === 0;
}

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

const to2dMatrix = array => {
    if(!array) return [];
    let matrix = [];
    for(let i = 0; i < 3; i++){
        let row = [];
        for(let j = 0; j < 3; j++){
            row[j] = array[i*3+j];
        }
        matrix[i] = row;
    }

    console.log(matrix);
    return matrix;
}

const getMatrixPosition = (matrix, value) => {
    for(let i = 0; i< matrix.length; i++){
        for(let j = 0; j< matrix[i].length; j++){
            if(matrix[i][j] === value)
                return {
                    row: i,
                    col: j
                }
        }
    }
}

const checkSolved = (matrix) => {
    for(let i = 0; i< matrix.length; i++){
        for(let j = 0; j< matrix[i].length; j++){
            if(matrix[i][j] ===0)
                continue
            if(matrix[i][j] != i*3+j+1){
                return false;
            }
        }
    }
    return true;
}

const copy2dMatrix = (matrix) => {
    const newMatrix = [];
    for(let i = 0; i< matrix.length; i++){
        newMatrix[i] = [];
        for(let j = 0; j< matrix[i].length; j++){
            newMatrix[i][j] = matrix[i][j];
        }
    }

    return newMatrix;
}


const canSwap = (holePosition, valuePosition) => {
    return (Math.abs(holePosition.row - valuePosition.row) + Math.abs(holePosition.col - valuePosition.col) === 1);
}

const setInitialTileBoard = () => {
    let initialTiles = shuffle([0,1,2,3,4,5,6,7,8]);
    while(!isSolveable(initialTiles)){
        initialTiles = shuffle([0,1,2,3,4,5,6,7,8]);
    }
    initialTiles = to2dMatrix(initialTiles);

    return initialTiles
}

const initialTiles = setInitialTileBoard();
function Board() {
    const [tiles, setTiles] = useState(initialTiles);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(()=>{
        setIsSolved(checkSolved(tiles));
    },[tiles])
    
    const swap = (value) => {
        const holePosition = getMatrixPosition(tiles, 0);
        const valuePosition = getMatrixPosition(tiles, value);
        if(canSwap(holePosition, valuePosition)){
            const newTilesMatrix = copy2dMatrix(tiles);
            newTilesMatrix[holePosition.row][holePosition.col] = value;
            newTilesMatrix[valuePosition.row][valuePosition.col] = 0
            setTiles(newTilesMatrix);
        }
    }

    const reset = () => {
        const newTileBoard = setInitialTileBoard();
        setIsSolved(false);
        setTiles(newTileBoard);
    }

    return(
        <div>
            {isSolved ?
                <div className={"absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 w-6/12 h-48 rounded p-4 grid place-items-center"}>
                    <h1 className='text-2xl'>Nice!</h1>
                    <button onClick={() => reset()} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Go for another round?</button>
                </div>
            :null}
            <div className="board p-12 mx-auto mt-12 grid gap-2 grid-cols-3 grid-rows-3 text-3xl justify-center align-middle place-items-center text-center">
                {tiles.map((row, colIndex)=> {
                    return row.map((value, rowIndex) => {
                        return <Tile key={colIndex*3 + rowIndex} id={colIndex*3 + rowIndex} value={value} swap={swap}></Tile>
                    })
                })}
            </div>
            <div className={"flex justify-center"}>
                <button onClick={() => reset()} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Shuffle</button>
            </div>
        </div>
    )
    
}

export default Board;