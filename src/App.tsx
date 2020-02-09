import * as React from 'react';
import { CSSProperties } from 'react';
import './App.css';

const colorsArray : any[] = ["red", "yellow", "blue", "green"];

class App extends React.Component<ICandyCrushProperties, ICandyCrushState> {
    constructor(props:ICandyCrushProperties){
        super(props)
            this.state = {
                divTableArray : [],
            };
    }

    componentDidMount(){
       this.CreateDivTableArray();
    }

    render() {
    return (
    <div style = {{ padding : '10px'}}> { this.CreateTable() } </div>
    );
    }

    // Selecting random colors for the blocks
    SelectRandomColor = () => {
        return colorsArray[Math.floor(Math.random()*colorsArray.length)];
    }

    // creating an array of whole grid with row number, column number and color
    CreateDivTableArray = () => {
        let divTableArray : any = [];
        // outer loop to create divTableArray
        for (let i = 0; i < 10; i++) {
            let divRowArray : any = [];
            // inner loop to create divRowarray
            for (let j = 0; j < 10; j++) {
                divRowArray.push( { "rowNumer" : i, "colNumber" : j, "color" : this.SelectRandomColor() });
            }
            divTableArray.push(divRowArray);
        }
        this.setState({ divTableArray : divTableArray });
        console.log(this.state.divTableArray);
    }

    // Function to create JSX element of the whole grid
    CreateTable = () : JSX.Element[] => {
        let divTableJSX: JSX.Element[];
        divTableJSX = this.state.divTableArray.map(( divDetails : divTable[] , rowIndex : number ) => {
            let divRowJSX: JSX.Element[];
            divRowJSX = divDetails.map(( divRowDetails : divTable , colIndex : number ) => {
                return(
                    <div style={this.GetDivStyle( divRowDetails.color )}
                    onClick={()=>{ this.ChangeColor(rowIndex, colIndex, divRowDetails.color  )}}
                    onMouseOver={ this.ChangeEffect } onMouseLeave={ this.ChangeEffectBack }></div>
                )
            });
            return(
            <div style = {{ display : 'flex'}}>{ divRowJSX } </div>
            )
            });
            return divTableJSX;
    }

    //Changing the color of block on click and then check the adjacent cells for the same color
    ChangeColor =( rowNumber : number, colNumber : number, color : string ) : void => {
    let divTableArray = this.state.divTableArray;
    //right
    if ( divTableArray[rowNumber] && divTableArray[rowNumber][colNumber+1] && divTableArray[rowNumber][colNumber+1].color === color ){
        divTableArray[rowNumber][colNumber+1].color = "white";
        this.ChangeColorAdjacent( divTableArray, rowNumber, colNumber+1, color );
    }
    //left
    if ( divTableArray[rowNumber] && divTableArray[rowNumber][colNumber-1] && divTableArray[rowNumber][colNumber-1].color === color ){
            divTableArray[rowNumber][colNumber-1].color = "white";
            this.ChangeColorAdjacent( divTableArray, rowNumber, colNumber-1, color );
        }
    //top
    if ( divTableArray[rowNumber+1] && divTableArray[rowNumber][colNumber] && divTableArray[rowNumber+1][colNumber].color === color ){
            divTableArray[rowNumber+1][colNumber].color = "white";
            this.ChangeColorAdjacent( divTableArray, rowNumber+1, colNumber, color );
        }
    //bottom
    if ( divTableArray[rowNumber-1] && divTableArray[rowNumber][colNumber] && divTableArray[rowNumber-1][colNumber].color === color ){
                divTableArray[rowNumber-1][colNumber].color = "white";
                this.ChangeColorAdjacent( divTableArray, rowNumber-1, colNumber, color );
        }
        this.setState({ divTableArray : divTableArray });
        this.ReOrderGrid(this.state.divTableArray);
    }


    // Check for the color of adjacent cells and remove them (making them white/blank first and re arrange them later)
    ChangeColorAdjacent = ( divTableArray : any , rowNumber : number, colNumber : number, color : string): void => {
     //right
        if ( divTableArray[rowNumber] && divTableArray[rowNumber][colNumber+1] && divTableArray[rowNumber][colNumber+1].color === color ){
            divTableArray[rowNumber][colNumber+1].color = "white";
            this.ChangeColorAdjacent( divTableArray, rowNumber, colNumber+1, color );
        }
        //left
        if ( divTableArray[rowNumber] && divTableArray[rowNumber][colNumber-1] && divTableArray[rowNumber][colNumber-1].color === color ){
                divTableArray[rowNumber][colNumber-1].color = "white";
                this.ChangeColorAdjacent( divTableArray, rowNumber, colNumber-1, color );
        }
        //top
        if ( divTableArray[rowNumber+1] && divTableArray[rowNumber][colNumber] && divTableArray[rowNumber+1][colNumber].color === color ){
                divTableArray[rowNumber+1][colNumber].color = "white";
                this.ChangeColorAdjacent( divTableArray, rowNumber+1, colNumber, color );
        }
        //bottom
        if ( divTableArray[rowNumber-1] && divTableArray[rowNumber][colNumber] && divTableArray[rowNumber-1][colNumber].color === color ){
                    divTableArray[rowNumber-1][colNumber].color = "white";
                    this.ChangeColorAdjacent( divTableArray, rowNumber-1, colNumber, color );
        }

    }

    // Loop through the columns to find the white/blank cells and re-arrange them
    ReOrderGrid = ( divTableArray : any ) : void => {
        for ( let i = 0; i < 10; i++ ) {
            let arrayOfColors = [];
            // loop through the columns to find the white/blank cells and re-arrange them
            for ( let j = 0; j < 10; j++ ) {
                arrayOfColors.push( this.state.divTableArray[j][i].color );
            }
            let newArrayOfColors;
            if ( arrayOfColors.indexOf("white") !== -1 ) {
                newArrayOfColors = arrayOfColors.sort( function(x,y){ return x === "white" ? -1 : y === "white" ? 1 : 0;});
            }
            else {
                newArrayOfColors = arrayOfColors;
            }
        let reArrangeColorsArray = this.state.divTableArray;
         for ( let j = 0; j < 10; j++ ) {
            reArrangeColorsArray[j][i].color = newArrayOfColors[j];
         }
         this.setState( { divTableArray : reArrangeColorsArray } );
         }
    }

    // Get block style
    GetDivStyle = ( color : string ) : CSSProperties => ( {
        display    : 'flex',
        height     : '40px',
        width      : '40px',
        padding    : '2px',
        background : color,
        border     : '1px solid black'
    } )

    ChangeEffect = ( e : any ) : void => {
        e.target.style.border = '1px solid white';
    }

    ChangeEffectBack = ( e : any ) : void => {
        e.target.style.border = '1px solid black';
    }

}


export interface divTable {
    rowNumber : number,
    colNumber : number,
    color     : string,
}

interface ICandyCrushProperties {
    divTableArray : any[]
}

interface ICandyCrushState {
    divTableArray : any[]
}

export default App;
