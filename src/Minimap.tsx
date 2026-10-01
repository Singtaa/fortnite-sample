import { useEffect, useState } from "react"
import { Text, View } from "onejs-react"
import { art } from "./assets"
import { Icon } from "./parts"

export interface MinimapProps {
    /** Seconds left on the storm timer. */
    storm: number
    players: number
    eliminations: number
}

/**
 * The map and the match counters, top right. The map pans back and forth on a
 * ten second USS transition, so it costs no script per frame; the storm icon
 * flashes red on every other second of the timer.
 */
export function Minimap({ storm, players, eliminations }: MinimapProps) {
    const [laidOut, setLaidOut] = useState(false)
    const [far, setFar] = useState(false)

    // Starts once the map has been laid out. UI Toolkit animates only from a
    // style it has already applied, so a class added before the first layout
    // lands at once; a fixed delay guessed at when that is, and lost.
    useEffect(() => {
        if (!laidOut) return
        setFar(true)
        const id = setInterval(() => setFar((f) => !f), 10000)
        return () => clearInterval(id)
    }, [laidOut])

    return (
        <View className="fns-minimap">
            <View className="fns-map-frame">
                <View
                    className={far ? "fns-map fns-map--far" : "fns-map"}
                    style={{ backgroundImage: art("map.jpg") }}
                    onGeometryChanged={() => setLaidOut(true)}
                />
                <Icon className="fns-map-marker" glyph={0xEAC5} />
            </View>
            <View className="fns-match">
                <Icon className={storm % 2 === 1 ? "fns-match-icon fns-match-icon--storm fns-match-icon--pulse" : "fns-match-icon fns-match-icon--storm"} glyph={0xEA09} />
                <Text className="fns-text fns-match-value" text={clock(storm)} />
                <Icon className="fns-match-icon" glyph={0xEA48} />
                <Text className="fns-text fns-match-value" text={String(players)} />
                <Icon className="fns-match-icon" glyph={0xEAA1} />
                <Text className="fns-text fns-match-value" text={String(eliminations)} />
            </View>
        </View>
    )
}

function clock(seconds: number): string {
    const s = Math.max(0, Math.floor(seconds))
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}
