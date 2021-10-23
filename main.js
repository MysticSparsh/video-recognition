img= "";
Status = "";
objects = [];

//preload function
function preload()
{
    img = loadImage('dog_cat.jpg');
}
//setup function
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
//draw function
function draw()
{
    image(video , 0 ,0,380,380);
    
    if(Status != "" )
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
      for (i = 0 ; i < objects.length ; i++) 
      {
          document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of obhects detected are : " + objects.length;
          fill(r, g ,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15 );
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y , objects[i].width , objects[i].height);
      } 
    }
}

// Checking if model is loaded
function modelLoaded()
{
    console.log("Model Loaded Successfully");
    Status = true;
   
}
// Exectuing  the model  on console
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}