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
      rectangle: {
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
      selectedShape: {
        type: String,
        value: 'rectangle'
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
    
    canvas.addEventListener('mouse:down', mouseDown(options));
    this.canvas.renderAll();
 

  }
  canvas.onmousedown = function (e) {
    // React to the mouse down event
};
   //mouseDown(options){
    //pointer is name of flag for x & y coordinates, 'e' specifies original event info
   // const pointer = this.canvas.getPointer(options.e);
    //why so many this
   //  shape = this[this.selectedShape];
   // console.log(TEST);
    }

  
  addSquare(){
    const rect = new fabric.Rect(this.rectangle);
    this.canvas.add(rect);
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
