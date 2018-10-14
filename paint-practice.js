import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import {injectShapes} from './injectShapes.js';

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
          <a class="active" href="#" title = "Create Square" id="rectSel" on-click= "rectToolSelected"><iron-icon  style = "color: white" icon = "check-box-outline-blank" ></iron-icon></a>
          <a href="#" id="arrowSel"  title = "Create Arrow" on-click= "arrowToolSelected">  <iron-icon style = "color: white" icon = "arrow-forward"></iron-icon> </a>
          <a href="#" id="switchSel" title = "Switch Tools" on-click= "selectToolSelected">  <iron-icon style = "color: white" icon = "swap-horiz" ></iron-icon> </a>
          <a href = "#" id = "delIcon" title = "Delete" on-click = "deleteSquare"> <iron-icon style = "color:white" icon = "delete"></iron-icon></a>
       </div>
       
    `;
  }
  static get properties() {
    return {
      selectedTool: {
        type: String,
        value: 'rectangle',
      }
    };
  }

 

  ready(){
    super.ready();
    const canvas = this.shadowRoot.querySelector('canvas');
    injectShapes(this);
    this.canvas = new fabric.Canvas(canvas, {width: 500, height: 500});
    this.canvas.renderAll();  
  }

  deleteListener(e){
    const key = e.keyCode;
    if(key == '8'){
      this.canvas.remove(this.canvas.getActiveObject());
    }
  }

  listenersOn(){
    this.canvas.on('mouse:down', this.mouseDown.bind(this));
    this.canvas.on('mouse:move', this.mouseMove.bind(this));
    this.canvas.on('mouse:up', this.mouseUp.bind(this));
    document.body.addEventListener('keydown', this.deleteListener.bind(this), false);
  }
  
  mouseDown(e){
    this.isMouseDown = true;
    const pointer = this.canvas.getPointer(e.e);
    const posX = pointer.x;
    const posY = pointer.y;
    const toConstruct = this[this.selectedTool];
    const shape = new fabric.Rect(toConstruct);
    shape.left = posX;
    shape.top = posY;
    this.currentShape = shape;
    this.canvas.add(shape);
    this.downX = shape.left;
    this.downY = shape.top;
  }
  
  mouseMove(e){
    if(this.isMouseDown != true) return;
    const pointer = this.canvas.getPointer(e.e);
    if(this.currentShape.left > pointer.x ) 
    this.currentShape.left = pointer.x;
    if(this.currentShape.top >pointer.y) 
    this.currentShape.top = pointer.y;
    const width = (Math.abs(pointer.x - this.downX));
    const height = (Math.abs(pointer.y -this.downY));
    this.currentShape.set({width: width, height: height});
    this.currentShape.setCoords();
    this.canvas.renderAll();
  }

  mouseUp(e){
    this.currentShape = null;
    this.isMouseDown = false;
    this.selectToolSelected();
  }
  
  rectToolSelected(){
    //I want to turn the listeners back on when user clicks the rectangle tool
    this.selectedTool = 'rectangle';
    this.canvas.selection = false;
    this.listenersOn();
    this.canvas.renderAll();
  }

  arrowToolSelected(){
     this.canvas.selection = false;
     this.selectedTool = 'arrow';
     this.listenersOn();

     new fabric.Path(this.arrow); 
     this.canvas.renderAll();
  }
  
  selectToolSelected(){
    this.canvas.selection = true;
    this.selectedTool = "switchSel";
    this.canvas.off('mouse:down');
  }
  
  addSquare(e){
    const rect = new fabric.Rect(this.rectangle);
    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
    this.canvas.renderAll(); 
  }

  deleteSquare(){
    if( this.canvas.getActiveObject() == null){
      window.alert("Please select shape you wish to delete.\n");
      return;
    }
    this.canvas.remove(this.canvas.getActiveObject());
  }
}
window.customElements.define('paint-practice', PaintPractice);
