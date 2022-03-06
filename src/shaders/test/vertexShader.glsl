uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;

uniform float uDistance;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {
    //gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    //modelPosition.z += aRandom * 0.1;
    modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * uDistance;
    modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * uDistance;
    modelPosition.x += sin(modelPosition.x * uFrequency.x + uTime) * uDistance;
    modelPosition.x += sin(modelPosition.y * uFrequency.y + uTime) * uDistance;
    modelPosition.y += sin(modelPosition.x * uFrequency.x + uTime) * uDistance;
    modelPosition.y += sin(modelPosition.y * uFrequency.y + uTime) * uDistance;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;
}