import { Text, View } from "onejs-react"
import { art } from "./assets"

export const Rarity = { Common: 0, Uncommon: 1, Rare: 2, Epic: 3, Legendary: 4 } as const
export type Rarity = typeof Rarity[keyof typeof Rarity]

const RARITY_COLORS = ["#A3A9AF", "#57B001", "#00A2EA", "#A24DC6", "#FEA741"]

export interface ActionBarItem {
    /** A file in the sample's art folder, or any texture of your own. */
    image: string | CS.UnityEngine.Texture2D
    rarity?: Rarity
}

/** The four items v2 showed, then two empty slots. */
export const DEFAULT_ITEMS: (ActionBarItem | null)[] = [
    { image: "daggers.png", rarity: Rarity.Epic },
    { image: "mk7.png", rarity: Rarity.Legendary },
    { image: "drum.png" },
    { image: "splash.png", rarity: Rarity.Rare },
    null,
    null,
]

const KEYS = ["F", "1", "2", "3", "4", "5"]

export interface ActionBarProps {
    /** Which slot is raised. */
    slot: number
    items?: (ActionBarItem | null)[]
}

/** The inventory slots, bottom right. */
export function ActionBar({ slot, items = DEFAULT_ITEMS }: ActionBarProps) {
    return (
        <View className="fns-bar">
            {KEYS.map((key, i) => <Slot key={key} label={key} item={items[i] ?? null} selected={slot === i} />)}
        </View>
    )
}

function Slot({ label, item, selected }: { label: string, item: ActionBarItem | null, selected: boolean }) {
    return (
        <View className="fns-slot">
            {item
                ? (
                    <View
                        className={selected ? "fns-slot-item fns-slot-item--selected" : "fns-slot-item"}
                        style={{ backgroundColor: RARITY_COLORS[item.rarity ?? Rarity.Common] }}
                    >
                        <View className="fns-slot-art" style={{ backgroundImage: typeof item.image === "string" ? art(item.image) : item.image }}>
                            <View className="fns-slot-frame" />
                        </View>
                    </View>
                )
                : <View className="fns-slot-empty" />}
            <Text className="fns-text fns-slot-key" text={label} />
        </View>
    )
}
