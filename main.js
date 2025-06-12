class HumanBodySimulation {
    constructor() {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initControls();
        this.initLights();
        this.initSystems();
        this.initGUI();
        this.animate();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111111);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.5, 3);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    initControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10;
        this.controls.maxPolarAngle = Math.PI;
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
        this.scene.add(hemisphereLight);
    }

    initSystems() {
        
        this.systems = {
            skeletal: new SkeletalSystem(this.scene),
            muscular: new MuscularSystem(this.scene),
            circulatory: new CirculatorySystem(this.scene),
            nervous: new NervousSystem(this.scene),
            respiratory: new RespiratorySystem(this.scene),
            digestive: new DigestiveSystem(this.scene),
            skin: new SkinSystem(this.scene)
        };

        
        this.systems.skeletal.show();
    }

    initGUI() {
        this.gui = new dat.GUI({ width: 300 });
        
       
        const systemsFolder = this.gui.addFolder('Body Systems');
        
        for (const [systemName, system] of Object.entries(this.systems)) {
            systemsFolder.add(system, 'visible')
                .name(systemName.charAt(0).toUpperCase() + systemName.slice(1))
                .onChange((value) => {
                    if (value) system.show();
                    else system.hide();
                });
        }
        
        systemsFolder.open();
        
      
        const presetsFolder = this.gui.addFolder('Presets');
        presetsFolder.add({
            'Skeleton Only': () => this.setPreset('skeletal'),
            'Muscles Only': () => this.setPreset('muscular'),
            'Full Anatomy': () => this.setPreset(['skeletal', 'muscular']),
            'All Systems': () => this.setPreset(Object.keys(this.systems))
        }, 'Skeleton Only').name('Show Skeleton');
        
        presetsFolder.add({
            'Skeleton Only': () => this.setPreset('skeletal'),
            'Muscles Only': () => this.setPreset('muscular'),
            'Full Anatomy': () => this.setPreset(['skeletal', 'muscular']),
            'All Systems': () => this.setPreset(Object.keys(this.systems))
        }, 'Muscles Only').name('Show Muscles');
        
        presetsFolder.add({
            'Skeleton Only': () => this.setPreset('skeletal'),
            'Muscles Only': () => this.setPreset('muscular'),
            'Full Anatomy': () => this.setPreset(['skeletal', 'muscular']),
            'All Systems': () => this.setPreset(Object.keys(this.systems))
        }, 'Full Anatomy').name('Full Anatomy');
        
        presetsFolder.add({
            'Skeleton Only': () => this.setPreset('skeletal'),
            'Muscles Only': () => this.setPreset('muscular'),
            'Full Anatomy': () => this.setPreset(['skeletal', 'muscular']),
            'All Systems': () => this.setPreset(Object.keys(this.systems))
        }, 'All Systems').name('All Systems');
        
        presetsFolder.open();
    }

    setPreset(systemsToShow) {
       
        if (typeof systemsToShow === 'string') {
            systemsToShow = [systemsToShow];
        }
        
     
        for (const system of Object.values(this.systems)) {
            system.hide();
        }
        
       
        for (const systemName of systemsToShow) {
            if (this.systems[systemName]) {
                this.systems[systemName].show();
                // Update GUI to reflect changes
                this.gui.__controllers.forEach(controller => {
                    if (controller.property === 'visible' && 
                        controller.object === this.systems[systemName]) {
                        controller.setValue(true);
                    }
                });
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
       
        for (const system of Object.values(this.systems)) {
            if (system.update) {
                system.update();
            }
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}


window.onload = () => {
    new HumanBodySimulation();
};
