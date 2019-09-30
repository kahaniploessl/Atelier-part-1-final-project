let mX;
let mY;

let l=150;
let h=150;

let capture;
let snapshot=[];


let dataServer;
let pubKey = 'pub-c-1d3be3ec-b6c3-4d03-bb68-2435b9a1cd8e';
let subKey = 'sub-c-8ead9dce-d5af-11e9-b2f2-9a66d3fcadaa';

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "Camera";




function setup() {
  // initialize pubnub
 dataServer = new PubNub(
 {
   publish_key   : pubKey,  //get these from the pubnub account online
   subscribe_key : subKey,
   ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
 });

 //attach callbacks to the pubnub object to handle messages and connections
 dataServer.addListener({ message: readIncoming });
 dataServer.subscribe({channels: [channelName]});


  createCanvas(windowWidth, windowHeight);
  background(220,150,50);
  mX=-l;
  mY=0;

  capture = createCapture(VIDEO);
  capture.hide();

  // sendButton = createButton('take picture');
  // sendButton.position(100,150);
  //sendButton.mousePressed(Snap);

}

function draw() {

  noStroke();

}

function mousePressed() {
  Snap();
}

function Snap(){
  mX+=l;
  if (mX>windowWidth) {
    mY+=h;
    mX=0;
  }
  if (mY>windowHeight){
    mY=0;
    mX=0;
  }
  dataServer.publish(
    {
      channel: channelName,
      message:
      { messageText: 1, messageX: mX, messageY: mY}
    });
}

function readIncoming(inMessage) //when new data comes in it triggers this function,
{                               // this works becsuse we subscribed to the channel in setup()

  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
    //snapshot=inMessage.message.messageSnap;
    snapshot.push(capture.get());
    for(let j=0;j < snapshot.length; j++){
        image(snapshot[j],inMessage.message.messageX,inMessage.message.messageY,l,h);
    }
  }
}
