class MuscularSystem {
    constructor(scene) {
        this.scene = scene;
        this.meshes = [];
        this.visible = false;
        this.loaded = false;
        
        this.init();
    }
    
    async init() {
       
        this.createMuscle('chest', [0, 1.2, 0.1], [0.6, 0.3, 0.15], 0xff6666);
        this.createMuscle('biceps_L', [-0.4, 1.2, 0], [0.15, 0.25, 0.15], 0xff4444);
        this.createMuscle('biceps_R', [0.4, 1.2, 0], [0.15, 0.25, 0.15], 0xff4444);
        this.createMuscle('abs', [0, 0.9, 0.1], [0.4, 0.3, 0.1], 0xff5555);
        this.createMuscle('quadriceps_L', [-0.15, 0.5, 0], [0.2, 0.4, 0.2], 0xff5555);
        this.createMuscle('quadriceps_R', [0.15, 0.5, 0], [0.2, 0.4, 0.2], 0xff5555);
        
        this.loaded = true;
        if (this.visible) this.show();
    }
    
    createMuscle(name, position, size, color) {
        const geometry = new THREE.BoxGeometry(...size);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            shininess: 20
        });
        const muscle = new THREE.Mesh(geometry, material);
        muscle.position.set(...position);
        muscle.name = name;
        muscle.userData.system = 'muscular';
        this.meshes.push(muscle);
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
            const bicepsL = this.meshes.find(m => m.name === 'biceps_L');
            const bicepsR = this.meshes.find(m => m.name === 'biceps_R');
            
            if (bicepsL && bicepsR) {
                const scale = 1 + Math.sin(time * 2) * 0.1;
                bicepsL.scale.y = scale;
                bicepsR.scale.y = scale;
            }
        }
    }
}
