class SkeletalSystem {
    constructor(scene) {
        this.scene = scene;
        this.meshes = [];
        this.visible = false;
        this.loaded = false;
        
        this.init();
    }
    
    async init() {
        this.createBone('skull', [0, 1.7, 0], [0.2, 0.2, 0.2]);
        this.createBone('spine', [0, 1.2, 0], [0.15, 0.8, 0.15]);
        this.createBone('pelvis', [0, 0.7, 0], [0.25, 0.1, 0.2]);
        
        // Arms
        this.createBone('upperArm_L', [-0.4, 1.3, 0], [0.1, 0.3, 0.1]);
        this.createBone('lowerArm_L', [-0.6, 1.1, 0], [0.08, 0.3, 0.08]);
        this.createBone('upperArm_R', [0.4, 1.3, 0], [0.1, 0.3, 0.1]);
        this.createBone('lowerArm_R', [0.6, 1.1, 0], [0.08, 0.3, 0.08]);
        
        // Legs
        this.createBone('upperLeg_L', [-0.15, 0.4, 0], [0.12, 0.4, 0.12]);
        this.createBone('lowerLeg_L', [-0.15, 0.0, 0], [0.1, 0.4, 0.1]);
        this.createBone('upperLeg_R', [0.15, 0.4, 0], [0.12, 0.4, 0.12]);
        this.createBone('lowerLeg_R', [0.15, 0.0, 0], [0.1, 0.4, 0.1]);
        
        this.loaded = true;
        if (this.visible) this.show();
    }
    
    createBone(name, position, size) {
        const geometry = new THREE.BoxGeometry(...size);
        const material = new THREE.MeshPhongMaterial({
            color: 0xf0f0f0,
            transparent: true,
            opacity: 0.9,
            shininess: 30
        });
        const bone = new THREE.Mesh(geometry, material);
        bone.position.set(...position);
        bone.name = name;
        bone.userData.system = 'skeletal';
        this.meshes.push(bone);
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
       
    }
}
