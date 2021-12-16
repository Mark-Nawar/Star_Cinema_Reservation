import React, { Component } from "react";
import * as THREE from "three";

class ThreeScene extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.mount.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 1;
    this.camera.position.x = Math.PI / 2;
    var vert = [];
    this.velocities = [];
    this.acceleration = [];
    for (let i = 0; i < 10000; i++) {
      vert.push(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      this.velocities.push(0);
      this.acceleration.push(0.01);
    }

    this.stars_geometry = new THREE.BufferGeometry();

    var verticies = new Float32Array(vert);
    this.stars_geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(verticies, 3)
    );
    var photo = new THREE.TextureLoader().load("images/star.png");
    var material = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.9,
      map: photo,
    });
    this.stars = new THREE.Points(this.stars_geometry, material);

    this.scene.add(this.stars);
    this.animation();
    this.renderer.render(this.scene, this.camera);
  }
  animation = () => {
    var positions = this.stars_geometry.getAttribute("position");
    for (let i = 0; i < positions.count; i++) {
      var z = positions.getZ(i);

      var vel = this.velocities[i];
      const accel = this.acceleration[i];
      vel += accel;
      z -= vel;
      if (z < -250) {
        z = 250;
        vel = 0;
      }
      this.velocities[i] = vel;
      positions.setZ(i, z);
      positions.needsUpdate = true;
    }
    this.stars.rotation.z += 0.01;
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animation);
  };
  render() {
    return (
      <div
        ref={(mount) => {
          this.mount = mount;
        }}
      ></div>
    );
  }
}
export default ThreeScene;
