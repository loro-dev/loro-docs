import { LoroList, LoroMap, PeerID } from "loro-crdt";
import deepEqual from "deep-equal";

export function recordLocalOps(
  loroList: LoroList,
  elements: readonly { version: number }[]
): boolean {
  let changed = false;
  for (let i = loroList.length; i < elements.length; i++) {
    loroList.insertContainer(i, "Map");
    changed = true;
  }

  for (let i = 0; i < elements.length; i++) {
    const map = loroList.get(i) as LoroMap;
    const elem = elements[i];
    if (map.get("version") === elem.version) {
      continue;
    }

    for (const [key, value] of Object.entries(elem)) {
      const src = map.get(key);
      if (
        (typeof src === "object" && !deepEqual(map.get(key), value)) ||
        src !== value
      ) {
        changed = true;
        map.set(key, value);
      }
    }
  }

  return changed;
}

export function getVersion(elems: readonly { version: number }[]): number {
  return elems.reduce((acc, curr) => acc + curr.version, 0);
}

export function showVersion(version: Map<PeerID, number>): string {
  let vv = "";
  for (const [k, v] of version.entries()) {
    vv += `${k.toString().slice(0, 4)}:${v} `;
  }
  return vv;
}
