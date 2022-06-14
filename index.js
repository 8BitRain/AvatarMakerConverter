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

function drawIMG(dataURL, coords, partType)
{
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
        //https://www.w3schools.com/tags/canvas_drawimage.asp
        coordsArr= coords.split(",");

        switch (partType) {
            case 'head':
                ctx.drawImage(img,coordsArr[0] - coordsArr[2],coordsArr[1],coordsArr[2],coordsArr[3],coordsArr[4],coordsArr[5],coordsArr[6],coordsArr[7]);
                break;
            case 'hair_front':
                //Hair equation
                //width: is frame x + source size w
                //height: is frame y + spriteSourceSize h
                var width = (parseInt(coordsArr[0]) + parseInt(coordsArr[2]));
                var height = (parseInt(coordsArr[1]) + parseInt(coordsArr[3]));
                console.log(width + "," + height + "," + coordsArr[2] + "," + coordsArr[3] + "," + coordsArr[4] + "," + coordsArr[5] + "," + coordsArr[6] + "," + coordsArr[7]);
                console.log("Displaying hair front");
                ctx.drawImage(img,width,height,coordsArr[2],coordsArr[3],coordsArr[4],coordsArr[5],coordsArr[6],coordsArr[7]);
                break;
            case 'hair_back':
                //Hair equation
                //width: is frame x + source size w
                //height: is frame y + spriteSourceSize h
                var width = (parseInt(coordsArr[0]) + parseInt(coordsArr[2]));
                var height = (parseInt(coordsArr[1]) + parseInt(coordsArr[3]));
                console.log(width + "," + height + "," + coordsArr[2] + "," + coordsArr[3] + "," + coordsArr[4] + "," + coordsArr[5] + "," + coordsArr[6] + "," + coordsArr[7]);
                console.log("Displaying hair back");
                ctx.drawImage(img,width,height,coordsArr[2],coordsArr[3],coordsArr[4],coordsArr[5],coordsArr[6],coordsArr[7]);
                break;
            default:
                break;
        }
    };
    img.src = dataURL;
}

function init()
{
    var imgURL;
    var images = [];
    
    var hairFront = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/hair1.png',
        'coords' : '1016,497,319,199,0,0,319,199',
        'type': "hair_front"
    };

    //Hair equation
    //0: is frame x + source size w
    //1: is frame y + spriteSourceSize h
    var hairBack = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/hair2.png',
        'coords' : '0,1400,482,323,0,0,356,419',
        'type': "hair_back"
    }

    var head = {
        'url' : 'https://rtl-tpt.github.io/WebTest/assets/src/unity/head.png',
        'coords' : '696,1244,187,153,13,250,187,176',
        'type': "head"
    }
    
    images.push(head);
    images.push(hairFront);
    images.push(hairBack);

    images.forEach(element => {
        console.log(element);
        toDataURL(element.url, function(dataUrl) {
            console.log('RESULT:', dataUrl);
            imgURL = dataUrl;
            drawIMG(imgURL, element.coords, element.type);
        });
    });
}

