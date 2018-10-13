const injectShapes = function(injectionTarget){
  injectionTarget.rectangle = {
    top: 100,
    left: 100,
    width: 50,
    height: 50,
    fill: 'red',
    mouseMoved: function(){
      //to do
    }
  }
  injectionTarget.arrow = { 
    top: 100,
    left:100,
    width: 50,
    height: 50,
    fill: ' #000',
    path: 'M0 0 L100.1 0 M 100 0 L75 20 M100 0 L75 -20',
    mouseMoved: function(){
      //to do
    }
  }
}

export { injectShapes };
