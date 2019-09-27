function conv(vec1, vec2){
    var disp = 0; // displacement given after each vector multiplication by element of another vector
    var convVec = [];
    // for first multiplication
    for (j = 0; j < vec2.length ; j++){
        convVec.push(vec1[0] * vec2[j]);
    }
    disp = disp + 1;
    for (i = 1; i < vec1.length ; i++){
        for (j = 0; j < vec2.length ; j++){
            if ((disp + j) !== convVec.length){
                convVec[disp + j] = convVec[disp + j] + (vec1[i] * vec2[j])
            }
            else{
                convVec.push(vec1[i] * vec2[j]);
            }
        }
        disp = disp + 1;
    }
    return convVec;
}


vec1 = [0, -1.0, -1.5,  2.0, 1.5, 1.5, 0.8, 0, -0.5];
vec2 = [1, -0.8, -0.5, -0.2];

vec3 = conv(vec1,vec2);

for(let i=0;i<vec3.length;i++) {
  vec3[i] = vec3[i].toFixed(2);
}

console.log(vec3);