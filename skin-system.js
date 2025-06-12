 class SkinSystem {
    constructor(scene) {
        this.scene = scene;
        this.meshes = [];
        this.visible = false;
        this.loaded = false;
        
        this.init();
    }
    
    async init() {
       
        this.createSkinMesh('head', [0, 1.7, 0], [0.25, 0.25, 0.25], 0xffddbb);
        this.createSkinMesh('torso', [0, 1.2, 0], [0.5, 0.8, 0.3], 0xffddbb);
        this.createSkinMesh('arm_L', [-0.5, 1.2, 0], [0.15, 0.6, 0.15], 0xffddbb);
        this.createSkinMesh('arm_R', [0.5, 1.2, 0], [0.15, 0.6, 0.15], 0xffddbb);
        this.createSkinMesh('leg_L', [-0.2, 0.5, 0], [0.2, 0.8, 0.2], 0xffddbb);
        this.createSkinMesh('leg_R', [0.2, 0.5, 0], [0.2, 0.8, 0.2], 0xffddbb);
        
        this.loaded = true;
        if (this.visible) this.show();
    }
    
    createSkinMesh(name, position, size, color) {
        const geometry = new THREE.BoxGeometry(...size);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        const skinPart = new THREE.Mesh(geometry, material);
        skinPart.position.set(...position);
        skinPart.name = name;
        skinPart.userData.system = 'skin';
        this.meshes.push(skinPart);
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
