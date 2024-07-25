import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ThreeScene(){
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(mountRef.current){
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            
            // 씬, 카메라, 렌더러 생성
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000); //(시야각, 종횡비, 가까운거, 먼거리)
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(width,height);
            renderer.setClearColor('gray');
            mountRef.current.appendChild(renderer.domElement);
    
            // 큐브 생성
            const geometry = new THREE.BoxGeometry(2, 2, 2); // 너비, 높이, 깊이
            const material = new THREE.MeshBasicMaterial({ color: 'white' });

            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // 조명 추가
            const ambientLight = new THREE.AmbientLight('black'); // 부드러운 조명
            const pointLight = new THREE.PointLight('black', 10, 10); // 집중 조명
            pointLight.position.set(200, 100, 10);
            scene.add(ambientLight);
            scene.add(pointLight);
    
            camera.position.z = 5; //
    
            const animate = () => { //애니메이션 재귀 호출
                requestAnimationFrame(animate);
    
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
    
                renderer.render(scene, camera);
            }
    
            animate();

            // 윈도우 크기 변경 시 렌더러 크기 조정
            window.addEventListener('resize',()=>{
                const width = mountRef.current?.clientWidth || 0;
                const height = mountRef.current?.clientHeight || 0;
                renderer.setSize(width,height);
                camera.aspect = width/height;
                camera.updateProjectionMatrix();
            });

            return ()=>{
                mountRef.current?.removeChild(renderer.domElement);
            }
        }
    })

    return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
}

export default ThreeScene;
