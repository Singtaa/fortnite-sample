import { View } from "onejs-react"
import { ActionBar, type ActionBarItem } from "./ActionBar"
import { art } from "./assets"
import { CharacterStats } from "./CharacterStats"
import { Minimap } from "./Minimap"
import { type FortniteStats, useDemoStats } from "./stats"
import { ensureStyles } from "./styles"

export { ActionBar, DEFAULT_ITEMS, Rarity } from "./ActionBar"
export type { ActionBarItem, ActionBarProps } from "./ActionBar"
export { CharacterStats } from "./CharacterStats"
export type { CharacterStatsProps } from "./CharacterStats"
export { Minimap } from "./Minimap"
export type { MinimapProps } from "./Minimap"
export { DEFAULT_STATS, useDemoStats } from "./stats"
export type { FortniteStats } from "./stats"

export interface FortniteSampleProps {
    /**
     * Your game's numbers. Leave it out and a built-in demo drives the HUD;
     * pass it and the demo stops, and anything you leave out keeps its default.
     */
    stats?: Partial<FortniteStats>
    /** The action bar's items, six slots, null for an empty one. */
    items?: (ActionBarItem | null)[]
    /** The picture behind the HUD. Pass null for none, to lay it over your game. */
    background?: CS.UnityEngine.Texture2D | null
}

/** The whole Fortnite HUD, filling its parent. */
export function FortniteSample({ stats, items, background }: FortniteSampleProps) {
    ensureStyles()
    const demo = useDemoStats(stats === undefined)
    const s = { ...demo, ...stats }
    const bg = background === undefined ? art("screenie2.jpg") : background
    return (
        <View className="fns-root" style={bg ? { backgroundImage: bg } : { backgroundColor: "transparent" }}>
            <ActionBar slot={s.slot} items={items} />
            <CharacterStats health={s.health} shield={s.shield} armor={s.armor} />
            <Minimap storm={s.storm} players={s.players} eliminations={s.eliminations} />
        </View>
    )
}
