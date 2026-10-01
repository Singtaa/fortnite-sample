import { Text, View } from "onejs-react"
import { Gradient, Icon } from "./parts"

export interface CharacterStatsProps {
    health: number
    shield: number
    armor: number
}

/** Shield and health bars, bottom left. */
export function CharacterStats({ health, shield, armor }: CharacterStatsProps) {
    return (
        <View className="fns-stats">
            <View className="fns-stats-bars">
                <View className="fns-stats-row" style={{ height: "30%" }}>
                    <Icon className="fns-stats-icon" glyph={0xEAE0} />
                    <View className="fns-stats-track">
                        <View className="fns-stats-fill" style={{ width: `${clamp(shield)}%` }}>
                            <Gradient from="#007CCC" to="#00A0E6" width={356} />
                        </View>
                    </View>
                    <Text className="fns-text fns-stats-value" text={String(Math.round(shield))} />
                </View>
                <View style={{ height: "10%" }} />
                <View className="fns-stats-row" style={{ height: "60%" }}>
                    <Icon className="fns-stats-icon" glyph={0xE9F5} />
                    <View className="fns-stats-track">
                        <View className="fns-stats-fill" style={{ width: `${clamp(health)}%` }}>
                            <Gradient from="#02BC23" to="#48E025" width={356} />
                        </View>
                    </View>
                    <Text className="fns-text fns-stats-value" text={String(Math.round(health))} />
                </View>
            </View>
            <View className="fns-stats-armor">
                <Icon className="fns-stats-armor-icon" glyph={0xE9C1} />
                <Text className="fns-text fns-stats-armor-value" text={String(armor)} />
            </View>
        </View>
    )
}

function clamp(n: number): number {
    return Math.max(0, Math.min(100, n))
}
