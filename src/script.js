import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import testVertexShader from './shaders/test/vertexShader.glsl'
import testFragmentShader from './shaders/test/fragmentShader.glsl'
import { DoubleSide } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const stats = new Stats()
container.appendChild( stats.dom )

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.BoxGeometry(2, 2, 2, 24, 24)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

for(let i = 0; i < count; i++) {
    randoms[i] = Math.random()
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    transparent: true,
    wireframe: true,
    uniforms:
    {
        uFrequency: { value: new THREE.Vector2(3, 0) },
        uDistance: { value: 0.1 },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('orange') }
    }
})

var wireframeToggle = { add:function(){ 
    if (mesh.material.wireframe) {
        mesh.material.wireframe = false
        mesh2.material.wireframe = false
    }
    else {
        mesh.material.wireframe = true
        mesh2.material.wireframe = true
    } 
}}

gui.add(wireframeToggle,'add').name('Toggle Wireframe')
gui.add(material.uniforms.uDistance, 'value').min(0).max(1).step(0.001).name('Cube Wave Dist')
gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('CubeX Freq')
gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('CubeY Freq')

// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-2, 0, 0)
scene.add(mesh)

// Geometry
const geometry2 = new THREE.SphereGeometry(2, 32, 32)

geometry2.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

const material2 = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    transparent: true,
    wireframe: true,
    uniforms:
    {
        uFrequency: { value: new THREE.Vector2(4, 2) },
        uDistance: { value: 0.1 },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('green') }
    }
})

gui.add(material2.uniforms.uDistance, 'value').min(0).max(1).step(0.001).name('Sphere Wave Dist')
gui.add(material2.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('SphereX Freq')
gui.add(material2.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('SphereY Freq')

// Mesh
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.set(2, 0, 0)
scene.add(mesh2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    material.uniforms.uTime.value = elapsedTime
    material2.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()
    stats.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()