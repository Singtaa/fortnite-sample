import { useEffect, useState } from "react"

/** Everything the HUD shows. Feed it from your game, or let the demo drive it. */
export interface FortniteStats {
    /** 0 to 100. */
    health: number
    /** 0 to 100. */
    shield: number
    /** The number beside the big shield icon. */
    armor: number
    /** Which action bar slot is raised, 0 to 5. */
    slot: number
    /** Seconds left on the storm timer. */
    storm: number
    players: number
    eliminations: number
}

export const DEFAULT_STATS: FortniteStats = {
    health: 100, shield: 50, armor: 50, slot: 0, storm: 36, players: 25, eliminations: 7,
}

/**
 * The stand-in for a game: health drifts, the selected slot cycles, the storm
 * timer counts down and starts over. It replaces v2's SampleCharacter
 * MonoBehaviour, so the sample runs with no C# and nothing set up in a scene.
 *
 * Pass enabled = false to stop it, which is what FortniteSample does when you
 * hand it your own stats.
 */
export function useDemoStats(enabled = true): FortniteStats {
    const [stats, setStats] = useState(DEFAULT_STATS)

    useEffect(() => {
        if (!enabled) return
        let tick = 0
        const id = setInterval(() => {
            tick++
            setStats((s) => ({
                ...s,
                storm: s.storm > 0 ? s.storm - 1 : 36,
                slot: tick % 2 === 0 ? (s.slot + 1) % 4 : s.slot,
                health: tick % 3 === 0 ? 20 + Math.floor(Math.random() * 81) : s.health,
                players: s.storm === 0 ? Math.max(2, s.players - 1) : s.players,
            }))
        }, 1000)
        return () => clearInterval(id)
    }, [enabled])

    return stats
}
