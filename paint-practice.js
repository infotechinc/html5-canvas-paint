import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
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

        <style> 

          .myCanvas{
            margin-left: 20px;
          }

          .icon-bar {
            width: 120px;
            margin-top: 17px;
            margin-left: auto;
            margin-right: auto; 
            background-color: #555;
            overflow: auto
          }
          .icon-bar a:hover {
            background-color: #4CAF50;
          }
          .icon-bar a {
            float: left; 
            text-align: center;
            width: 25%;
            color: white; 
            font-size: 35px;
          }


          
        </style>

  
       <canvas id="myCanvas" style="border:3px solid black";></canvas>
    
     

       <div class = "icon-bar" >
          <a class="active" href="#" title = "Create Square" id="rectSel" on-click= "rectSelector"><iron-icon  style = "color: white" icon = "check-box-outline-blank" ></iron-icon></a>
          <a href="#" id="arrowSel"  title = "Create Arrow" on-click= "arrowSelector">  <iron-icon style = "color: white" icon = "arrow-forward"></iron-icon> </a>
          <a href="#" id="switchSel" title = "Switch Tools" on-click= "switchToolSelection">  <iron-icon style = "color: white" icon = "swap-horiz" ></iron-icon> </a>
          <a href = "#" id = "delIcon" title = "Delete" on-click = "deleteSquare"> <iron-icon style = "color:white" icon = "delete"></iron-icon></a>
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
            fill: ' #000',
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
            fill: ' #000',
            path: 'M0 0 L100.1 0 M 100 0 L75 20 M100 0 L75 -20',
          }
        }
      },
      selectedTool: {
        type: String,
        value: 'rectangle',
      }
    };
  }
  ready(){
    super.ready();
    const canvas = this.shadowRoot.querySelector('canvas');
    const iconRect = this.shadowRoot.querySelector('#rectSel');
    const iconArrow = this.shadowRoot.querySelector('#arrowSel');
    this.canvas = new fabric.Canvas(canvas, {width: 500, height: 500});
    this.canvas.renderAll();  
  }

  initCanvasListeners(){
    this.canvas.on('mouse:down', this.mouseDown.bind(this));
    this.canvas.on('mouse:move', this.mouseMove.bind(this));
    this.canvas.on('mouse:up', this.mouseUp.bind(this));
    document.body.addEventListener('keydown', this.deleteListener.bind(this), false);
  }

  switchToolSelection(){
    this.canvas.selection = true;
    this.canvas.off('mouse:down');
  }

  rectSelector(){
    //I want to turn the listeners back on when user clicks the rectangle tool
    this.selectedTool = 'rectangle';
    this.canvas.selection = false;
    this.initCanvasListeners();

    const toConstruct = this[this.selectedShape];
    this.canvas.renderAll();
  }
  arrowSelector(){
     this.canvas.selection = false;
     this.selectedTool = 'arrow';
     this.initCanvasListeners();

     new fabric.Path(this.arrow); 
     this.canvas.renderAll();
  }
  deleteListener(e){
    const key = e.keyCode;
    if(key == '8'){
      this.canvas.remove(this.canvas.getActiveObject());
    }
     {detail: 'delete'};
   }
  mouseDown(e){
    this.mouseDown = true;
    const pointer = this.canvas.getPointer(e.e);
    const posX = pointer.x;
    const posY = pointer.y;
    const toConstruct = this[this.selectedShape];
    const shape = new fabric.Rect(toConstruct);
    shape.left = posX;
    shape.top = posY;
    this.shape = shape;
    this.canvas.add(shape);
    this.switchToolSelection();
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
      this.shape.left = pointer.x;
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
    this.selectedTool = "switchSel";
  }
  addSquare(e){
    const rect = new fabric.Rect(this.rectangle);
    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
    this.canvas.renderAll(); 
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
