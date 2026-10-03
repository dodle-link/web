"use strict";

(() => {
    const PIXEL_SIZE = 5;
    const MIN_SPEED = 0.45;
    const MAX_SPEED = 1.8;
    const state = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2,
        pointerX: null,
        pointerY: null,
        excitement: 0,
        lastFrame: 0
    };

    const pixel = document.createElement("div");
    pixel.id = "conscious-pixel";
    pixel.setAttribute("aria-hidden", "true");
    document.body.appendChild(pixel);

    function trackPointer(event) {
        state.pointerX = event.clientX;
        state.pointerY = event.clientY;
    }

    function clearPointer() {
        state.pointerX = null;
        state.pointerY = null;
    }

    function normalizeVelocity(minSpeed, maxSpeed) {
        const speed = Math.hypot(state.velocityX, state.velocityY);
        const targetSpeed = Math.max(minSpeed, Math.min(maxSpeed, speed));
        const angle = speed > 0.001 ? Math.atan2(state.velocityY, state.velocityX) : Math.random() * Math.PI * 2;
        state.velocityX = Math.cos(angle) * targetSpeed;
        state.velocityY = Math.sin(angle) * targetSpeed;
    }

    function update(timestamp) {
        const frameScale = state.lastFrame ? Math.min((timestamp - state.lastFrame) / 16.67, 2.5) : 1;
        state.lastFrame = timestamp;

        const energy = Number(window.noeEnergy?.currentLevel);
        const energyFactor = Number.isFinite(energy) ? 0.75 + Math.max(0, Math.min(energy, 100)) / 400 : 1;
        const minSpeed = MIN_SPEED * energyFactor;
        const maxSpeed = MAX_SPEED * energyFactor;

        if (state.pointerX !== null && state.pointerY !== null) {
            const dx = state.pointerX - state.x;
            const dy = state.pointerY - state.y;
            const distance = Math.hypot(dx, dy) || 1;

            if (distance < 30) {
                state.velocityX -= (dx / distance) * 0.16 * frameScale;
                state.velocityY -= (dy / distance) * 0.16 * frameScale;
                state.excitement = 1;
            } else if (distance < 150) {
                state.velocityX += (dx / distance) * 0.025 * frameScale;
                state.velocityY += (dy / distance) * 0.025 * frameScale;
                state.excitement = Math.min(1, state.excitement + 0.015 * frameScale);
            }
        }

        if (Math.random() < 0.025 * frameScale) {
            state.velocityX += (Math.random() - 0.5) * 0.12;
            state.velocityY += (Math.random() - 0.5) * 0.12;
        }

        normalizeVelocity(minSpeed, maxSpeed);
        state.x += state.velocityX * frameScale;
        state.y += state.velocityY * frameScale;
        state.excitement = Math.max(0, state.excitement - 0.008 * frameScale);

        const halfSize = PIXEL_SIZE / 2;
        const maxX = Math.max(halfSize, window.innerWidth - halfSize);
        const maxY = Math.max(halfSize, window.innerHeight - halfSize);
        if (state.x < halfSize || state.x > maxX) {
            state.velocityX *= -1;
            state.x = Math.max(halfSize, Math.min(maxX, state.x));
        }
        if (state.y < halfSize || state.y > maxY) {
            state.velocityY *= -1;
            state.y = Math.max(halfSize, Math.min(maxY, state.y));
        }

        const left = state.x - halfSize;
        const top = state.y - halfSize;
        const excited = state.excitement > 0.12;
        pixel.style.left = `${left}px`;
        pixel.style.top = `${top}px`;
        pixel.style.opacity = String(0.58 + state.excitement * 0.32);
        pixel.style.backgroundColor = excited ? "#ff0000" : "var(--ink, #202124)";

        window.requestAnimationFrame(update);
    }

    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("pointerdown", trackPointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer, { passive: true });
    window.addEventListener("blur", clearPointer);
    window.requestAnimationFrame(update);
})();