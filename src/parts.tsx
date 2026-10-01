import { Text, View } from "onejs-react"
import { icons } from "./assets"

/** One glyph from RPG Awesome, by its code point. */
export function Icon({ glyph, className }: { glyph: number, className: string }) {
    return <Text className={className} text={String.fromCharCode(glyph)} style={{ unityFontDefinition: icons() }} />
}

function color(hex: string): CS.UnityEngine.Color {
    const n = parseInt(hex.slice(1), 16)
    return new CS.UnityEngine.Color(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1)
}

const STEPS = 16
const gradients = new Map<string, CS.UnityEngine.Texture2D>()

/**
 * A 16 pixel strip, bilinear filtered and stretched, which reads as a smooth
 * left to right gradient at any width and costs one texture per pair.
 */
function gradientTexture(from: string, to: string): CS.UnityEngine.Texture2D {
    const key = from + to
    let tex = gradients.get(key)
    if (!tex) {
        tex = new CS.UnityEngine.Texture2D(STEPS, 1)
        tex.wrapMode = CS.UnityEngine.TextureWrapMode.Clamp
        tex.filterMode = CS.UnityEngine.FilterMode.Bilinear
        const a = color(from)
        const b = color(to)
        for (let x = 0; x < STEPS; x++) tex.SetPixel(x, 0, CS.UnityEngine.Color.Lerp(a, b, x / (STEPS - 1)))
        tex.Apply()
        gradients.set(key, tex)
    }
    return tex
}

/** A left to right gradient filling its box. */
export function Gradient({ from, to, width }: { from: string, to: string, width: number | string }) {
    return <View className="fns-gradient" style={{ width, backgroundImage: gradientTexture(from, to) }} />
}
