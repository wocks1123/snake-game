import * as tf from '@tensorflow/tfjs';


const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-backend-webgl');


function point(x, y, canvas){
    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x+1, y+1);
    canvas.stroke();
}

//annotations:
// indexFinger: (4) [Array(3), Array(3), Array(3), Array(3)]
// middleFinger: (4) [Array(3), Array(3), Array(3), Array(3)]
// palmBase: [Array(3)]
// pinky: (4) [Array(3), Array(3), Array(3), Array(3)]
// ringFinger: (4) [Array(3), Array(3), Array(3), Array(3)]
// thumb: (4) [Array(3), Array(3), Array(3), Array(3)]

async function app(canvas, poseCallback) {
    console.log('Loading mobilenet..')

    // Load the model.
    const model = await handpose.load();
    console.log('Successfully loaded model')

    // Create an object from Tensorflow.js data API which could capture image
    // from the web camera as Tensor.
    //webcamElement = document.querySelector("#player")

    //const webcam = await tf.data.webcam(webcamElement)

    //var canvas = document.querySelector('#output')
    var ctx = canvas.getContext('2d');

    var t = true;
    while (t) {
        //const img = await webcam.capture()
        //const result = await model.detect(img)

        //const result = await model.estimateHands(document.querySelector("#output"));
        const result = await model.estimateHands(canvas);

        if (result.length === 0) {
            await tf.nextFrame();
            continue;
        }
        //console.log("result", result);

        poseCallback(result);
        //parsePose(result);


        ////////////////////////////////////////////////////////////////////
        /* Draw */
        result.forEach((item) => {
            var anno = item.annotations;
            for (const [key, value] of Object.entries(anno)) {
                key
                value.forEach(v => {
                    //console.log("v", v);
                    point(v[0], v[1], ctx);
                })
            }
        });

        // var f = result[0];
        // var a1 = f.annotations;
        // console.log("a1", a1);
        // console.log("a1", typeof a1);
        // for (const [key, value] of Object.entries(a1)) {
        //     key
        //     //console.log(`${key}`);
        //     value.forEach(v => {
        //         console.log("v", v);
        //         point(v[0], v[1], ctx);
        //     })
        // }
        ////////////////////////////////////////////////////////////////////


        // let {bbox, label, score} = result[0]
        // console.log("result[0].className", result[0]);
        // // Dispose the tensor to release the memory.
        //img.dispose()

        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
    }
}
async function main(canvas, poseCallback) {
    await app(canvas, poseCallback);
}

export default main;
export { main }