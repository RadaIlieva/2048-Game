document.addEventListener('DOMContentLoaded', ()=>{

    const gridContainer = document.querySelector('.grid-container');
    let grid = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]

    ];

    function generateTile(){
        let emptyCells = [];
        for(let row = 0; row < 4;row++){
            for (let col = 0; col < 4; col++){
                if(grid[row][col] === 0){
                    emptyCells.push({row, col});
                }
            }
        }

        if (emptyCells.length > 0){
            const randomCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
            grid[randomCell.row][randomCell.col] = Math.random() > 0.1 ? 2:4;


        }
    }

    function updateGrid(){
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach((cell, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const value = grid[row][col];
            cell.setAttribute('data-value', value);
            cell.innerHTML = value > 0 ? value : ''; 
        });
    }
    

    function slideLeft(){
        for (let row = 0; row < 4; row++){
            let newRow = grid[row].filter(num => num !== 0);
            while (newRow.length < 4) newRow.push(0);
            for(let i = 0; i < 3; i++){
                if(newRow[i] === newRow[i + 1] && newRow[i] !== 0){
                    newRow[i] *= 2;
                    newRow[i + 1] = 0;
                }
                newRow = newRow.filter(num => num !== 0);
                while (newRow.length < 4) newRow.push(0);
                grid[row] = newRow;
            }
        }
    }

    function slideRight() {
        for (let row = 0; row < 4; row++) {
            let newRow = grid[row].filter(num => num !== 0); 
            while (newRow.length < 4) newRow.unshift(0); 
            for (let i = 3; i > 0; i--) { 
                if (newRow[i] === newRow[i - 1] && newRow[i] !== 0) {
                    newRow[i] *= 2;
                    newRow[i - 1] = 0;
                }
            }
            newRow = newRow.filter(num => num !== 0); 
            while (newRow.length < 4) newRow.unshift(0); 
            grid[row] = newRow;
        }
    }
    function slideUp() {
        for (let col = 0; col < 4; col++) {
            let newCol = [];
            for (let row = 0; row < 4; row++) {
                if (grid[row][col] !== 0) newCol.push(grid[row][col]);
            }
            while (newCol.length < 4) newCol.push(0); 
            for (let i = 0; i < 3; i++) {
                if (newCol[i] === newCol[i + 1] && newCol[i] !== 0) {
                    newCol[i] *= 2;
                    newCol[i + 1] = 0;
                }
            }
            newCol = newCol.filter(num => num !== 0); 
            while (newCol.length < 4) newCol.push(0); 
            for (let row = 0; row < 4; row++) {
                grid[row][col] = newCol[row];
            }
        }
    }

    function slideDown() {
        for (let col = 0; col < 4; col++) {
            let newCol = [];
            for (let row = 0; row < 4; row++) {
                if (grid[row][col] !== 0) newCol.push(grid[row][col]);
            }
            while (newCol.length < 4) newCol.unshift(0); 
            for (let i = 3; i > 0; i--) { 
                if (newCol[i] === newCol[i - 1] && newCol[i] !== 0) {
                    newCol[i] *= 2;
                    newCol[i - 1] = 0;
                }
            }
            newCol = newCol.filter(num => num !== 0); 
            while (newCol.length < 4) newCol.unshift(0); 
            for (let row = 0; row < 4; row++) {
                grid[row][col] = newCol[row];
            }
        }
    }

    
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                slideUp();
                break;
            case 'ArrowDown':
            case 's':
                slideDown();
                break;
            case 'ArrowLeft':
            case 'a':
                slideLeft();
                break;
            case 'ArrowRight':
            case 'd':
                slideRight();
                break;
            default:
                break;
        }
        generateTile(); 
        updateGrid(); 
    });

    
    generateTile();
    generateTile();
    updateGrid();
});
