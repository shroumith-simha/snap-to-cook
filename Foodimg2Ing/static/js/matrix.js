class FoodRainAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.emojis = ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥨', '🥪', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🫖', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍷', '🥂', '🥃'];
        this.particles = [];
        this.maxParticles = 50;
        this.fontSize = 24;
        
        this.init();
        this.animate();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.15';
        document.body.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        if (this.particles.length < this.maxParticles) {
            const particle = {
                x: Math.random() * this.canvas.width,
                y: -this.fontSize,
                emoji: this.emojis[Math.floor(Math.random() * this.emojis.length)],
                speed: 1 + Math.random() * 2,
                rotation: Math.random() * 360,
                rotationSpeed: -2 + Math.random() * 4,
                scale: 0.5 + Math.random() * 0.5
            };
            this.particles.push(particle);
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Create new particles
        if (Math.random() < 0.1) {
            this.createParticle();
        }

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.y += p.speed;
            p.rotation += p.rotationSpeed;

            // Draw particle
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.scale(p.scale, p.scale);
            this.ctx.font = `${this.fontSize}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(p.emoji, 0, 0);
            this.ctx.restore();

            // Remove particles that are off screen
            if (p.y > this.canvas.height + this.fontSize) {
                this.particles.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize food rain animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FoodRainAnimation();
}); 