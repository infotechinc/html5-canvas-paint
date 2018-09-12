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
     
        <sp> Canvas </sp>
       
       <canvas id="myCanvas" ></canvas>
       <button on-click = "addSquare"> Create Square </button>
       <button id="delete" on-click = "deleteSquare"> Delete Square </button>

     
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'Create A Square',
      }
    };
  }
//this method is not working, canvas is created in template, I deleted this entire method and it didnt effect anything
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

    const square = new fabric.Rect({
        top: 100,
        left: 100,
        width: 50,
        height: 50,
        fill: 'purple',
    });

    this.canvas.add(square);
    this.canvas.renderAll();
    console.log(this.canvas.size());
  }

  deleteSquare(){
    // this.canvas.Delete(square)

  }


}

window.customElements.define('paint-practice', PaintPractice);
