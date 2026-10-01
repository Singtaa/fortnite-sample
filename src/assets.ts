import { toArray } from "onejs-react"
import { loadFontDefinition, loadImage } from "onejs-unity/assets"
import pkg from "../package.json"

/**
 * The sample's art and font, and how they reach a player build.
 *
 * They ship in this package under assets/@fortnite-sample/. OneJS reads an
 * app's files from its working directory's assets/ folder (the Editor) and
 * copies that folder into StreamingAssets (a player build), so in the Editor
 * the sample mirrors its folder into assets/@fortnite-sample/ before it loads
 * anything. A build made after the scene has been open once carries the art,
 * with no build step and no esbuild plugin.
 *
 * The mirror is copied again when the installed version differs from the one
 * that wrote it, so an update replaces the files.
 */
const NAMESPACE = "@fortnite-sample"
const STAMP = ".version"

type Globals = { __workingDir?: string }

function mirrorIntoApp(): void {
    if (!CS.UnityEngine.Application.isEditor) return
    const workingDir = (globalThis as Globals).__workingDir
    if (typeof workingDir !== "string") return

    const IO = CS.System.IO
    const join = (...parts: string[]) => parts.reduce((a, b) => IO.Path.Combine(a, b))
    const from = join(workingDir, "node_modules", pkg.name, "assets", NAMESPACE)
    const to = join(workingDir, "assets", NAMESPACE)
    const stamp = join(to, STAMP)
    if (!IO.Directory.Exists(from)) return
    if (IO.File.Exists(stamp) && IO.File.ReadAllText(stamp) === pkg.version) return

    IO.Directory.CreateDirectory(to)
    for (const file of toArray<string>(IO.Directory.GetFiles(from))) {
        const target = join(to, IO.Path.GetFileName(file))
        if (IO.File.Exists(target)) IO.File.Delete(target)
        IO.File.Copy(file, target)
    }
    IO.File.WriteAllText(stamp, pkg.version)
}

mirrorIntoApp()

const textures = new Map<string, CS.UnityEngine.Texture2D>()

/** A texture from the sample's folder, loaded once. */
export function art(file: string): CS.UnityEngine.Texture2D {
    let tex = textures.get(file)
    if (!tex) {
        tex = loadImage(`${NAMESPACE}/${file}`) as CS.UnityEngine.Texture2D
        textures.set(file, tex)
    }
    return tex
}

let iconFont: CS.UnityEngine.UIElements.FontDefinition | undefined

/** RPG Awesome, the icon font the HUD's glyphs come from. */
export function icons(): CS.UnityEngine.UIElements.FontDefinition {
    iconFont ??= loadFontDefinition(`${NAMESPACE}/rpgawesome.ttf`)
    return iconFont!
}
