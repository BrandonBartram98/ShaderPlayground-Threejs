precision mediump float;

varying float vRandom;
uniform vec3 uColor;

void main() {
    //gl_FragColor = vec4(1.0, vRandom, 0.75, 1.0);
    gl_FragColor = vec4(uColor, 1.0);
}