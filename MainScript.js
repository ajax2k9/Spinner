let squares = [];
let spacing = 100;
let width = 4;
let sizeX = 0;
let halfSize = 0;
let date = 0;
let winWindow;
let guesses = 0;
let minGuesses;
let hasWon = false;

p5.disableFriendlyErrors = true; // disables FES


function setup(){
    minGuesses = JSON.parse(localStorage.getItem("min_guesses"));

    if(minGuesses == undefined){
        minGuesses = 1000;
    }
    
    spacing = Math.min(windowWidth,900) / width;
    sizeX = width * spacing;
    halfSize = sizeX/2;
    createCanvas(sizeX,sizeX);
    date = year()*100+day();

    LoadPuzzle(date);
    winWindow = new WinScreen(0,0);
    
    let button1 = createElement("PuzzButt");
    button1.html("Daily Puzzle");
    button1.mousePressed(()=>{
        LoadPuzzle(date);
    });

    let button2 = createElement("RandPuzzButt");
    button2.html("Random Puzzle");
    button2.mousePressed(()=>{
        LoadPuzzle(Math.floor(Math.random() * 1000));
    });

   
}

function LoadPuzzle(_seed){
    guesses =0;
    hasWon = false;
    noiseSeed(_seed);
    for(let i = 0;i<width; i++){
        squares[i] = [];
        for(let j = 0;j<width; j++){
            let s = new square( Math.floor(noise(i*100,j*100)*5));
            s.x = spacing*(i - (width-1)/2);
            s.y = spacing*(j - (width-1)/2);

            s.scale = sizeX/(300*4);
            
            squares[i].push(s);
        }    
    }
}

function mouseClicked() {
    
    let x = Math.round((mouseX - halfSize + spacing/2) / spacing) + 1;
    let y = Math.round((mouseY - halfSize + spacing/2) / spacing) + 1;

    if(x<0 || x > width - 1)return false;
    if(y<0 || y > width - 1)return false;
    guesses ++;
    for(let i = x -1 ;i<= x + 1; i++){
        for(let j = y-1; j<= y+ 1; j++){

            if(i<0 || i > width - 1)continue;
            if(j<0 || j > width - 1)continue;

            squares[i][j].OnClick();
        }
    }
    
    this.CheckWin();
    // prevent default
    return false;
  }

  function CheckWin(){
    let phase = squares[0][0].phase;
    let win = true;

    squares.forEach(e=>{
        e.forEach(s=>{
            if(s.phase!= phase){
                win = false;
            }
        });
    });

    if(win && !hasWon){
        hasWon = true;
        let newRecord = false;

        if(guesses < minGuesses){
            newRecord = true;
            minGuesses = guesses;
        }
        winWindow.Show(guesses,minGuesses,newRecord);
        localStorage.setItem("min_guesses",minGuesses);
    }

  }

function draw(){
    translate(halfSize,halfSize);
    background(255,255,255);
    squares.forEach(e=>{
        e.forEach(s=>{s.Draw();});
    });
}