/**
 * The HUD's stylesheet, carried in the bundle as a string.
 *
 * Not Tailwind: OneJS's Tailwind plugin scans the app's own files and skips
 * node_modules, so classes written here would generate no rules. A USS string
 * compiled once at load needs nothing from the app's build config, and it
 * keeps the transitions (health bar, selected slot, map pan, storm timer) in
 * UI Toolkit rather than in a per-frame loop.
 *
 * Every class is prefixed fns- so it cannot collide with the app's own.
 */
const USS = `
.fns-root {
    position: absolute; left: 0; top: 0; right: 0; bottom: 0;
    background-color: rgb(251, 146, 60);
    -unity-background-scale-mode: scale-and-crop;
}
.fns-text { color: white; -unity-font-style: bold; -unity-text-align: middle-center; }
.fns-gradient { height: 100%; -unity-background-scale-mode: stretch-to-fill; }

.fns-stats {
    position: absolute; left: 80px; bottom: 80px; width: 580px; height: 80px;
    flex-direction: row; padding: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
}
.fns-stats-bars { flex-grow: 1; flex-shrink: 1; }
.fns-stats-row { flex-direction: row; justify-content: space-between; align-items: center; }
.fns-stats-icon { width: 40px; height: 100%; font-size: 20px; color: white; -unity-text-align: middle-center; }
.fns-stats-track { width: 356px; height: 100%; background-color: rgba(0, 0, 0, 0.4); }
.fns-stats-fill {
    height: 100%; overflow: hidden;
    transition-property: width; transition-duration: 0.5s; transition-timing-function: ease-in-out;
}
.fns-stats-value { width: 50px; height: 100%; font-size: 20px; }
.fns-stats-armor { width: 20%; height: 100%; flex-direction: row; justify-content: space-around; align-items: center; }
.fns-stats-armor-icon { font-size: 60px; color: rgb(137, 255, 255); }
.fns-stats-armor-value { font-size: 30px; }

.fns-bar {
    position: absolute; right: 16px; bottom: 80px; width: 520px; height: 120px;
    flex-direction: row; justify-content: space-between;
}
.fns-slot { width: 80px; height: 120px; justify-content: flex-end; align-items: center; }
.fns-slot-item {
    width: 80px; height: 80px; margin-bottom: 0;
    transition-property: margin-bottom; transition-duration: 0.4s; transition-timing-function: ease-in-out;
}
.fns-slot-item--selected { margin-bottom: 12px; }
.fns-slot-art { flex-grow: 1; -unity-background-scale-mode: scale-to-fit; }
.fns-slot-frame { flex-grow: 1; }
.fns-slot-item--selected .fns-slot-frame { border-width: 2px; border-color: white; }
.fns-slot-empty { width: 80px; height: 80px; border-width: 1px; border-color: rgba(255, 255, 255, 0.5); }
.fns-slot-key {
    margin-top: 6px; padding: 2px 6px; font-size: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    border-width: 1px; border-color: rgba(255, 255, 255, 0.3);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.fns-minimap { position: absolute; top: 16px; right: 16px; width: 300px; height: 400px; }
.fns-map-frame { width: 300px; height: 300px; overflow: hidden; background-color: rgb(245, 245, 220); }
.fns-map {
    position: absolute; left: -850px; top: -850px; width: 1400px; height: 1400px;
    translate: 0 0;
    transition-property: translate; transition-duration: 10s; transition-timing-function: ease-in-out-quad;
}
.fns-map--far { translate: 600px 600px; }
.fns-map-marker { position: absolute; left: 140px; top: 140px; font-size: 20px; color: white; }
.fns-match { flex-direction: row; margin-top: 8px; align-items: center; justify-content: center; }
.fns-match-icon {
    width: 26px; height: 26px; border-radius: 13px; font-size: 16px; color: white;
    background-color: rgba(0, 0, 0, 0.3); -unity-text-align: middle-center;
}
.fns-match-icon--storm { transition-property: color; transition-duration: 1s; transition-timing-function: ease-in-out; }
.fns-match-icon--pulse { color: red; }
.fns-match-value { font-size: 18px; padding-left: 6px; padding-right: 12px; }
`

type Globals = { compileStyleSheet?: (uss: string, name?: string) => boolean }

let compiled = false

/** Adds the stylesheet to the panel once. Named, so a reload replaces it. */
export function ensureStyles(): void {
    if (compiled) return
    compiled = (globalThis as Globals).compileStyleSheet?.(USS, "fortnite-sample") === true
}
