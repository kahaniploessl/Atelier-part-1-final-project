let midX;
let midY;

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

  midX = windowWidth/2;
  midY = windowHeight/2;
  mX=-l;
  mY=0;

  capture = createCapture(VIDEO);
  capture.hide();

  // sendButton = createButton('take picture');
  // sendButton.position(100,150);
  //sendButton.mousePressed(Snap);

}

function draw() {

  // for (let i=0;i<300;i++){
  //   //v1
  //   // l[i]=cos(i)*(0.7)*windowWidth-i;
  //   // h[i]=tan(i)*0.7*windowHeight-i;
  //
  //   //v2
  //   // l[i]=cos(i)*100;
  //   // h[i]=cos(i)*100;
  //
  //   //v3
  //   l[i]=cos(i)*windowWidth/2;
  //   h[i]=cos(i)*windowHeight/2;
  // }
  // image(capture,midX,midY,windowWidth,windowHeight);
  noStroke();
  for(let j=0;j < snapshot.length; j++){
    // for (let i=0;i<25;i++){
    //   l[i]=(0.95-i/100)*windowWidth-50*i;
    //   h[i]=0.95*windowHeight-20*i;


      // if (i%3==0){
      //   img=frog;
      // } if (i%3==1){
      //   img=beeDee;
      // } if (i%3==2) {
      //   img=coolCat;
      // }
      // for (let k=0;k<2;k++) {
      //   midX-=k;
      //   midY-=k/5;
      // }
      image(snapshot[j],mX,mY,l,h);
    // imageMode(CENTER);
    // image(snapshot[i],midX,midY,midX,midY);
  }

}

function mousePressed() {
  Snap();
  // midX=mouseX;
  // midY=mouseY;
}

function Snap(){
  //snapshot.push(capture.get());

  dataServer.publish(
    {
      channel: channelName,
      message:
      { messageText: 1}
    });
}

function readIncoming(inMessage) //when new data comes in it triggers this function,
{                               // this works becsuse we subscribed to the channel in setup()

  // simple error check to match the incoming to the channelName
  mX+=l;
  if (mX>windowWidth) {
    mY+=h;
    mX=0;
  }
  if (mY>windowHeight){
    mY=0;
    mX=0;
  }
  
  if(inMessage.channel == channelName)
  {
    //snapshot=inMessage.message.messageSnap;
    snapshot.push(capture.get());
  }
}
