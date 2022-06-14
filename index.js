//Run Builder
init();

function toDataURL(src, callback, outputFormat)
{
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
}

function drawIMG(dataURL, coords)
{
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
        //https://www.w3schools.com/tags/canvas_drawimage.asp
        coordsArr= coords.split(",");
        ctx.drawImage(img,coordsArr[0] - coordsArr[2],coordsArr[1],coordsArr[2],coordsArr[3],coordsArr[4],coordsArr[5],coordsArr[6],coordsArr[7]);
    };
    img.src = dataURL;
}

function init()
{
    var imgURL;
    var images = [];
    
    var hairFront = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/hair1.png',
        'coords' : '1016,497,319,199,0,0,600,530'
    };

    var hairBack = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/hair1.png',
        'coords' : '0,1400,482,323,0,0,600,530'
    }

    var head = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/head.png',
        'coords' : '696,1244,187,153,13,44,187,176'
    }

    //Note coords need to be the x position subtracted by the width of the element. So to get Face 3 to load
    //coords 696 - 187 = 
    
    
    images.push(head);
    //images.push(hairFront);
    //images.push(hairBack);

    images.forEach(element => {
        console.log(element);
        toDataURL(element.url, function(dataUrl) {
            console.log('RESULT:', dataUrl);
            imgURL = dataUrl;
            drawIMG(imgURL, element.coords);
        });
    });
}

