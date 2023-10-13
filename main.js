import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import "./style.css"

const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(3, 128, 128)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83"
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const light = new THREE.PointLight(0xffffff, 15, 100)
light.position.set(0, 10, 10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

const canvas = document.querySelector('.webgl')
const render = new THREE.WebGLRenderer({ canvas })

render.setSize(size.width, size.height)
render.setPixelRatio(2)
render.render(scene, camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.height

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  render.setSize(size.width, size.height)
})

const loop = () => { 
  controls.update()
  render.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

c