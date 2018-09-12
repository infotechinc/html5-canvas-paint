import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


/**
 * `paint-practice`
 * practice using making a shape and button with fabric.js
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaintPractice extends PolymerElement {
  
      // <canvas id = "canvas"> </canvas>
 
  static get template() {
    //style="border:3px solid purple
    return html`
     
        
       
       <canvas id="myCanvas" style="border:3px solid purple";></canvas>
       <sp> Choose Option: <bl></sp>
       <button on-click = "addSquare" > Create Square </button>
       <button id="delete" on-click = "deleteSquare"> Delete Square </button>

     
    `;
  }
  static get properties() {
    return {
      square: {
        type: Object,
        value: ()=>{
          return { 
            top: 100,
            left: 100,
            width: 50,
            height: 50,
            fill: ' #9999ff',
          }
        }
      },
      selectedTool: {
        type: String,
        value: 'square'
      }
    };
  }

  ready(){
    super.ready();
    console.log(fabric);
    //shadow selector query
    
    const canvas = this.shadowRoot.querySelector('canvas');
   // const button = this.shadowRoot.querySelector('button');

    this.canvas = new fabric.Canvas(canvas, {width: 500, height: 500});

  
    this.canvas.renderAll();


  }

  addSquare(){
    const square = new fabric.Rect(this.square);
    this.canvas.add(square);
    this.canvas.renderAll();
    console.log(this.canvas.size());
  }

  deleteSquare(){
    const context = this.canvas.getContext("2d");
    if( this.canvas.getActiveObject() == null){
      window.alert("Please select shape you wish to delete.\n A shape must be created in order to delete.");
    }
    this.canvas.remove(this.canvas.getActiveObject());

  }


}

window.customElements.define('paint-practice', PaintPractice);
