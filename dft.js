/*
    Calculates the DFT on the incoming signal and outputs the real and imaginary components

    @inputs (xx) - incoming signal
    @outputs (rex,img) - real and imaginary components of the DFT
*/
function dft(xx) {
    // Initialize the arrays
    let rex = [];
    let imx = [];
    for (let k=0;k<=xx.length/2+1;k++) {
        rex[k] = 0;
        imx[k] = 0;
    }
    
    // Calculate the DFT
    for (let k=0;k<=xx.length/2+1;k++) {
        for(let i=0;i<=xx.length-1;i++) {
            rex[k] = rex[k] + xx[i] * Math.cos(2*Math.PI*k*i/xx.length).toFixed(3);
            imx[k] = imx[k] - xx[i] * Math.sin(2*Math.PI*k*i/xx.length).toFixed(3);
            if(k==1) {
                console.log("Real: " + rex[k]);
                console.log("Imaginary: " + imx[k]);
            }
        }
    }

    console.log(rex);
    console.log(imx);
    // Return the Real and Imaginary Component
    return [rex, imx];
}

let xx = [1,1,2,1,3,2];
let dftSignal = dft(xx);
let real = dftSignal[0];
let img = dftSignal[1];
console.log(real);
console.log(img);