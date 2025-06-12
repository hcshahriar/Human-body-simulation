class DigestiveSystem {
    constructor(scene) {
        this.scene = scene;
        this.meshes = [];
        this.visible = false;
        this.loaded = false;
        
        this.init();
    }
    
    async init() {
       
        this.createOrgan('stomach', [0.2, 1.0, 0.2], [0.3, 0.2, 0.2], 0xccaa88);
        this.createOrgan('liver', [0, 1.1, -0.1], [0.4, 0.3, 0.2], 0xaa8866);
        this.createOrgan('intestines', [0, 0.8, 0], [0.5, 0.2, 0.3], 0xddbb99);
        
      
        this.createTube('esophagus', [
            [0, 1.5, 0], [0.1, 1.4, 0.1], [0.2, 1.3, 0.1], [0.2, 1.1, 0.2]
        ], 0.03, 0xbb9977);
        
        this.loaded = true;
        if (this.visible) this.show();
    }
    
    createOrgan(name, position, size, color) {
        const geometry = new THREE.BoxGeometry(...size);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.8
        });
        const organ = new THREE.Mesh(geometry, material);
        organ.position.set(...position);
        organ.name = name;
        organ.userData.system = 'digestive';
        this.meshes.push(organ);
    }
    
    createTube(name, points, radius, color) {
        const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
        const geometry = new THREE.TubeGeometry(path, 20, radius, 8, false);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.8
        });
        const tube = new THREE.Mesh(geometry, material);
        tube.name = name;
        tube.userData.system = 'digestive';
        this.meshes.push(tube);
    }
    
    show() {
        if (!this.loaded) return;
        this.visible = true;
        for (const mesh of this.meshes) {
            this.scene.add(mesh);
        }
    }
    
    hide() {
        this.visible = false;
        for (const mesh of this.meshes) {
            this.scene.remove(mesh);
        }
    }
    
    update() {
        
        if (this.visible) {
            const time = Date.now() * 0.001;
            
            const intestines = this.meshes.find(m => m.name === 'intestines');
            if (intestines) {
                intestines.rotation.z = Math.sin(time) * 0.1;
            }
            
            const stomach = this.meshes.find(m => m.name === 'stomach');
            if (stomach) {
                stomach.scale.x = 0.9 + Math.sin(time * 1.5) * 0.1;
            }
        }
    }
}
