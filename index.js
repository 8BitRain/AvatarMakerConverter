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
        ctx.drawImage(img,coordsArr[0],coordsArr[1],coordsArr[2],coordsArr[3],coordsArr[4],coordsArr[5],coordsArr[6],coordsArr[7]);
    };
    img.src = dataURL;
}

function init()
{
    var imgURL;
    var images = [];
    
    var hair = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/hair1.png',
        'coords' : '1016,497,319,199,0,0,600,530'
    };

    var head = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/head.png',
        'coords' : '0,992,172,132,13,44,187,176'
    }
    
    
    images.push(head);
    images.push(hair);

    images.forEach(element => {
        console.log(element);
        toDataURL(element.url, function(dataUrl) {
            console.log('RESULT:', dataUrl);
            imgURL = dataUrl;
            drawIMG(imgURL, element.coords);
        });
    });
}

