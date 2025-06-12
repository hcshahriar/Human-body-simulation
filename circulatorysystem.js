 class CirculatorySystem {
    constructor(scene) {
        this.scene = scene;
        this.meshes = [];
        this.visible = false;
        this.loaded = false;
        
        this.init();
    }
    
    async init() {
        
        this.createBloodVessel('aorta', [
            [0, 1.4, 0], [0, 1.2, 0], [0, 1.0, 0], [0, 0.8, 0]
        ], 0.03, 0xff0000);
        
        this.createBloodVessel('venaCava', [
            [0.1, 1.4, 0], [0.1, 1.2, 0], [0.1, 1.0, 0], [0.1, 0.8, 0]
        ], 0.04, 0x0000ff);
        
        
        this.createBloodVessel('artery_L', [
            [0, 1.2, 0], [-0.2, 1.2, 0], [-0.4, 1.2, 0], [-0.5, 1.1, 0]
        ], 0.02, 0xff0000);
        
        this.createBloodVessel('artery_R', [
            [0, 1.2, 0], [0.2, 1.2, 0], [0.4, 1.2, 0], [0.5, 1.1, 0]
        ], 0.02, 0xff0000);
        
        this.loaded = true;
        if (this.visible) this.show();
    }
    
    createBloodVessel(name, points, radius, color) {
        const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
        const geometry = new THREE.TubeGeometry(path, 20, radius, 8, false);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        const vessel = new THREE.Mesh(geometry, material);
        vessel.name = name;
        vessel.userData.system = 'circulatory';
        this.meshes.push(vessel);
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
            for (const mesh of this.meshes) {
                mesh.material.color.setHSL(
                    mesh.material.color.r === 1 ? 0.0 : 0.6, 
                    1, 
                    0.5 + Math.sin(time * 3) * 0.3
                );
            }
        }
    }
}
