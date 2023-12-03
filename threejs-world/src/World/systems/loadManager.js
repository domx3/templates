import { LoadingManager } from "three";

// load manager
function setLoadManager() {
  const manager = new LoadingManager();

  manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    //console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  manager.onLoad = function () {
    //console.log( 'Loading complete!');
    
    // removes laoding screen after first element is loaded
    const loadingScreen = document.getElementById( 'loading-screen' );
    loadingScreen.style.display = 'none';
    
  };

  manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    //console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  };

  manager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
  };
  
  return manager;
}

export { setLoadManager }