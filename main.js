status = "";
objects = [];
video = "";
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createVideo(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_input = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw()
{
    image(video, 0, 0, 480, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            
            fill("#0388fc");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#0388fc");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects[i].length == object_input)
    {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML = "Status : Object mentioned found";
        
        var synth = new SpeechSynthesis();
        
        document.getElementById("object_status").innerHTML = object_input + "Found";
        utterThis = SpeechSynthesisUtterance(object_input);
        Synth.speak(utterThis);
    }
    else
    {
        document.getElementById("status").innerHTML = "Object not found";
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}