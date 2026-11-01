/**
 * The breakable 404: particles sit on the glyphs of the number, spring back when the pointer
 * nudges them, and fall loose under gravity once pushed far enough. All tuning is per 60 Hz step.
 */

type ParticleState = "attached" | "loose" | "returning";

export type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  state: ParticleState;
  /** Picks the particle's colour and its idle float phase. */
  shade: number;
};

type Pointer = { x: number; y: number; previousX: number; previousY: number };

export type ParticleField = {
  particles: Particle[];
  width: number;
  height: number;
  pointer: Pointer | null;
  steps: number;
};

export const SHADE_COUNT = 4;
export const PARTICLE_RADIUS_SHARE = 0.38;
/** Share of loose particles that counts as fully broken; the last stragglers are hard to reach. */
export const BROKEN_SHARE = 0.9;

const SPRING = 0.06;
const ATTACHED_DAMPING = 0.82;
const PUSH_RADIUS = 70;
const PUSH_STRENGTH = 1.6;
/** Extra push per pixel of pointer travel in one step, so a fast swipe hits harder than a hover. */
const SWIPE_BOOST = 0.35;
/** How much of the pointer's own motion a particle inherits, so swipes drag particles along. */
const SWIPE_DRAG = 0.25;
const BREAK_DISTANCE = 42;
/** A returning particle only locks back in once this slow, so its overshoot cannot re-break it. */
const SETTLE_SPEED = 1.5;
const GRAVITY = 0.45;
const AIR_DRAG = 0.995;
const FLOOR_BOUNCE = 0.45;
const FLOOR_FRICTION = 0.9;
const WALL_BOUNCE = 0.6;
const BLAST_RADIUS = 120;
const BLAST_SPEED = 14;
/** Upward kick on a blast so the pieces arc before they fall. */
const BLAST_LIFT = 4;
const IDLE_FLOAT_AMPLITUDE = 1.2;
const IDLE_FLOAT_SPEED = 0.03;

export function createParticleField(
  points: readonly { x: number; y: number }[],
  width: number,
  height: number,
): ParticleField {
  return {
    particles: points.map((point, index) => ({
      homeX: point.x,
      homeY: point.y,
      x: point.x,
      y: point.y,
      velocityX: 0,
      velocityY: 0,
      state: "attached",
      shade: index % SHADE_COUNT,
    })),
    width,
    height,
    pointer: null,
    steps: 0,
  };
}

export function movePointer(field: ParticleField, x: number, y: number) {
  if (field.pointer) {
    field.pointer.x = x;
    field.pointer.y = y;
  } else {
    field.pointer = { x, y, previousX: x, previousY: y };
  }
}

export function releasePointer(field: ParticleField) {
  field.pointer = null;
}

/** A click or tap: everything inside the blast radius flies outward and comes loose. */
export function blast(field: ParticleField, x: number, y: number) {
  for (const particle of field.particles) {
    const offsetX = particle.x - x;
    const offsetY = particle.y - y;
    const distance = Math.hypot(offsetX, offsetY);
    if (distance >= BLAST_RADIUS) continue;
    const falloff = 1 - distance / BLAST_RADIUS;
    const directionX = distance === 0 ? 0 : offsetX / distance;
    const directionY = distance === 0 ? -1 : offsetY / distance;
    particle.velocityX += directionX * BLAST_SPEED * falloff;
    particle.velocityY += directionY * BLAST_SPEED * falloff - BLAST_LIFT * falloff;
    particle.state = "loose";
  }
}

/** Sends every particle back to its place in the number. */
export function rebuild(field: ParticleField) {
  for (const particle of field.particles) {
    if (particle.state === "loose") particle.state = "returning";
  }
}

export function getBrokenShare(field: ParticleField): number {
  if (field.particles.length === 0) return 0;
  let looseCount = 0;
  for (const particle of field.particles) {
    if (particle.state === "loose") looseCount++;
  }
  return looseCount / field.particles.length;
}

function applyPointerPush(particle: Particle, pointer: Pointer) {
  const offsetX = particle.x - pointer.x;
  const offsetY = particle.y - pointer.y;
  const distance = Math.hypot(offsetX, offsetY);
  if (distance >= PUSH_RADIUS || distance === 0) return;
  const pointerVelocityX = pointer.x - pointer.previousX;
  const pointerVelocityY = pointer.y - pointer.previousY;
  const pointerSpeed = Math.hypot(pointerVelocityX, pointerVelocityY);
  const falloff = 1 - distance / PUSH_RADIUS;
  const push = falloff * (PUSH_STRENGTH + pointerSpeed * SWIPE_BOOST);
  particle.velocityX += (offsetX / distance) * push + pointerVelocityX * falloff * SWIPE_DRAG;
  particle.velocityY += (offsetY / distance) * push + pointerVelocityY * falloff * SWIPE_DRAG;
}

function stepTowardHome(particle: Particle, floatX: number, floatY: number) {
  particle.velocityX += (particle.homeX + floatX - particle.x) * SPRING;
  particle.velocityY += (particle.homeY + floatY - particle.y) * SPRING;
  particle.velocityX *= ATTACHED_DAMPING;
  particle.velocityY *= ATTACHED_DAMPING;
  particle.x += particle.velocityX;
  particle.y += particle.velocityY;
}

function stepLoose(particle: Particle, width: number, height: number, radius: number) {
  particle.velocityY += GRAVITY;
  particle.velocityX *= AIR_DRAG;
  particle.velocityY *= AIR_DRAG;
  particle.x += particle.velocityX;
  particle.y += particle.velocityY;

  const floor = height - radius;
  if (particle.y > floor) {
    particle.y = floor;
    particle.velocityY = -particle.velocityY * FLOOR_BOUNCE;
    particle.velocityX *= FLOOR_FRICTION;
  }
  if (particle.x < radius) {
    particle.x = radius;
    particle.velocityX = Math.abs(particle.velocityX) * WALL_BOUNCE;
  } else if (particle.x > width - radius) {
    particle.x = width - radius;
    particle.velocityX = -Math.abs(particle.velocityX) * WALL_BOUNCE;
  }
}

/** Advances the field one 60 Hz step. `isCalm` turns off the idle float for reduced motion. */
export function stepParticleField(field: ParticleField, radius: number, isCalm: boolean) {
  const { pointer } = field;
  field.steps++;

  for (const particle of field.particles) {
    if (pointer) applyPointerPush(particle, pointer);

    if (particle.state === "loose") {
      stepLoose(particle, field.width, field.height, radius);
      continue;
    }

    const phase = field.steps * IDLE_FLOAT_SPEED + particle.shade * 1.7 + particle.homeX * 0.05;
    const floatX = isCalm ? 0 : Math.cos(phase) * IDLE_FLOAT_AMPLITUDE;
    const floatY = isCalm ? 0 : Math.sin(phase) * IDLE_FLOAT_AMPLITUDE;
    stepTowardHome(particle, floatX, floatY);

    const distanceFromHome = Math.hypot(particle.x - particle.homeX, particle.y - particle.homeY);
    if (particle.state === "returning") {
      const speed = Math.hypot(particle.velocityX, particle.velocityY);
      if (distanceFromHome < BREAK_DISTANCE / 2 && speed < SETTLE_SPEED) {
        particle.state = "attached";
      }
    } else if (distanceFromHome > BREAK_DISTANCE) {
      particle.state = "loose";
    }
  }

  if (pointer) {
    pointer.previousX = pointer.x;
    pointer.previousY = pointer.y;
  }
}

/**
 * Picks every `spacing`th pixel whose alpha is mostly opaque, from RGBA image data of the
 * rendered number. The points are the particles' home positions.
 */
export function sampleGlyphPoints(
  rgba: ArrayLike<number>,
  width: number,
  height: number,
  spacing: number,
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const halfSpacing = Math.floor(spacing / 2);
  for (let y = halfSpacing; y < height; y += spacing) {
    for (let x = halfSpacing; x < width; x += spacing) {
      const alpha = rgba[(y * width + x) * 4 + 3];
      if (alpha > 128) points.push({ x, y });
    }
  }
  return points;
}
