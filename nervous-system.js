 class NervousSystem {
    constructor(scene) {
        this.scene = scene;
        this.meshes = [];
        this.visible = false;
        this.loaded = false;
        
        this.init();
    }
    
    async init() {
        
        this.createNerve('spinalCord', [
            [0, 1.6, 0], [0, 1.4, 0], [0, 1.2, 0], [0, 1.0, 0], [0, 0.8, 0]
        ], 0.02, 0xffff00);
        
        this.createNerve('nerve_L', [
            [0, 1.2, 0], [-0.2, 1.2, 0], [-0.4, 1.2, 0]
        ], 0.01, 0xffff00);
        
        this.createNerve('nerve_R', [
            [0, 1.2, 0], [0.2, 1.2, 0], [0.4, 1.2, 0]
        ], 0.01, 0xffff00);
        
        this.createNerve('brain', [
            [0, 1.7, 0], [0.1, 1.7, 0.1], [0, 1.7, 0.2], [-0.1, 1.7, 0.1], [0, 1.7, 0]
        ], 0.05, 0xffffaa);
        
        this.loaded = true;
        if (this.visible) this.show();
    }
    
    createNerve(name, points, radius, color) {
        const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
        const geometry = new THREE.TubeGeometry(path, 20, radius, 8, false);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            emissive: 0x444400,
            emissiveIntensity: 0.5
        });
        const nerve = new THREE.Mesh(geometry, material);
        nerve.name = name;
        nerve.userData.system = 'nervous';
        this.meshes.push(nerve);
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
            const time = Date.now() * 0.005;
            for (const mesh of this.meshes) {
                mesh.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.5;
            }
        }
    }
}
