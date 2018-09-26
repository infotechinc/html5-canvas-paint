import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
/**
 * `paint-practice`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaintPractice extends PolymerElement {
  static get template() {
    return html`
       <body onload = "initCanvasListeners()">
       <canvas id="myCanvas" style="border:3px solid purple";></canvas>
       <sp> Choose Option: <bl></sp>
       <button id = "add" on-click = "addSquare" > Create Square </button>
       <button id="delete" on-click = "deleteSquare"> Delete Square </button> 
       <div class = "icon-bar" style = "background-color: #555">
          <a class="active" href="#" id="rectSel" on-click= "rectSelector"><iron-icon hover = "background-color: #000" style = " color: white" icon = "check-box-outline-blank" ></iron-icon></a>
          <a href="#" id="arrowSel" on-click= "arrowSelector">  <iron-icon style = "color: white" icon = "arrow-forward"></iron-icon> </a>
          <a href="#" on-click= "toggle">  <iron-icon style = "color: white" icon = "swap-horiz" name="toggleSel"></iron-icon> </a>
       </div>
       
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
      arrow:{
        type: Object,
        value: ()=>{
          return{
            top: 100,
            left:100,
            width: 50,
            height: 50,
            fill: ' #9999ff',
            path: 'M0 0 L100.1 0 M 100 0 L75 20 M100 0 L75 -20'
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
    const canvas = this.shadowRoot.querySelector('canvas');
    const iconRect = this.shadowRoot.querySelector('#rectSel');
    const iconArrow = this.shadowRoot.querySelector('#arrowSel');
    this.canvas = new fabric.Canvas(canvas, {width: 500, height: 500});
    this.canvas.renderAll();  
    this.initCanvasListeners();
  }

  initCanvasListeners(){
    this.canvas.on('mouse:down', this.mouseDown.bind(this));
    this.canvas.on('mouse:move', this.mouseMove.bind(this));
    this.canvas.on('mouse:up', this.mouseUp.bind(this));
    document.body.addEventListener('keydown', this.deleteListener.bind(this), false);
  }

  toggle(){
    this.canvas.selection = false;
    this.canvas.off('mouse:down');
  }

  rectSelector(){
    // document.body.addEventListener("click", this.initCanvasListeners.bind());
     //this.canvas.on('mouse:down', this.initCanvasListeners.bind());
    // this.canvas.onmousedown = function(){
     // initCanvasListeners();
    // }
     //this.canvas.on('mouse:down', this.ready);
     this.canvas.selection = true;
     const toConstruct = this[this.selectedShape];
     this.selectedShape = 'rectangle';
     
     this.canvas.renderAll();
  }
  arrowSelector(){
     this.canvas.selection = true;
     const toConstruct = this[this.selectedShape];
     this.selectedShape = 'arrow';
     const path = new fabric.Path('M0 0 L100.1 0 M 100 0 L75 20 M100 0 L75 -20', {
      left: 100,
    top: 100,
    stroke: 'red',
    strokeWidth: 1,
    fill: false
     });
     this.canvas.add(path);
    this.canvas.renderAll();
  }
  deleteListener(e){
    const key = e.keyCode;
    if(key == '8'){
      this.canvas.remove(this.canvas.getActiveObject());
    }
     console.log(key);
     {detail: 'delete'};
   }
  mouseDown(e){
    this.mouseDown = true;
    var s = e;
    const pointer = this.canvas.getPointer(e.e);
    const posX = pointer.x;
    const posY = pointer.y;
    const toConstruct = this[this.selectedShape];
    const shape = new fabric.Rect(toConstruct);
    shape.left = posX;
    shape.top = posY;
    this.shape = shape;
    this.canvas.add(shape);
    this.downX = shape.left;
    this.downY = shape.top;
  }
  mouseMove(e){
    if(this.mouseDown != true){
    return;
    }
    const pointer = this.canvas.getPointer(e.e);
    const shape = this.canvas.getActiveObject();
    if(this.shape.left > pointer.x ){
      console.log("this.shape.left");
      console.log(this.shape.left);
      console.log("\n");
      console.log("pointer.x");
      console.log(pointer.x);      this.shape.left = pointer.x;
    }
    if(this.shape.top >pointer.y){  
      this.shape.top = pointer.y;
    }
    const width = (Math.abs(pointer.x - this.downX));
    const height = (Math.abs(pointer.y -this.downY));
    this.shape.set({width: width, height: height});
    this.shape.setCoords();
    this.canvas.renderAll();
  }
  mouseUp(e){
    this.mouseDown = false;
  }
  addSquare(e){
    console.log('event',e);
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
