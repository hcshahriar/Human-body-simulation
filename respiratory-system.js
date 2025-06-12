class RespiratorySystem {
    constructor(scene) {
        this.scene = scene;
        this.meshes = [];
        this.visible = false;
        this.loaded = false;
        
        this.init();
    }
    
    async init() {
        
        this.createLung('lung_L', [-0.3, 1.1, 0.1], [0.3, 0.4, 0.3], 0x88ccff);
        this.createLung('lung_R', [0.3, 1.1, 0.1], [0.3, 0.4, 0.3], 0x88ccff);
        this.createAirway('trachea', [
            [0, 1.5, 0], [0, 1.4, 0], [0, 1.3, 0], [0, 1.2, 0]
        ], 0.05, 0x88ddff);
        
        this.loaded = true;
        if (this.visible) this.show();
    }
    
    createLung(name, position, size, color) {
        const geometry = new THREE.BoxGeometry(...size);
        geometry.scale(1, 1, 1.3 + Math.random() * 0.2); 
        
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        
        const lung = new THREE.Mesh(geometry, material);
        lung.position.set(...position);
        lung.name = name;
        lung.userData.system = 'respiratory';
        this.meshes.push(lung);
    }
    
    createAirway(name, points, radius, color) {
        const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
        const geometry = new THREE.TubeGeometry(path, 20, radius, 8, false);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.8
        });
        const airway = new THREE.Mesh(geometry, material);
        airway.name = name;
        airway.userData.system = 'respiratory';
        this.meshes.push(airway);
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
            const breathFactor = 0.9 + Math.sin(time * 2) * 0.1;
            
            for (const mesh of this.meshes) {
                if (mesh.name.includes('lung')) {
                    mesh.scale.y = breathFactor;
                    mesh.scale.x = breathFactor;
                    mesh.material.opacity = 0.5 + breathFactor * 0.3;
                }
            }
        }
    }
}
