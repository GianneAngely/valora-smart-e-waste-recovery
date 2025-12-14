/**
 * Maps COCO-SSD object classes to e-waste component labels
 * COCO-SSD can detect various electronics that are relevant for e-waste recovery
 */

// Mapping from COCO-SSD class names to e-waste component labels
const EWASTE_MAPPING: Record<string, string> = {
  'cell phone': 'smartphone',
  'laptop': 'laptop',
  'keyboard': 'keyboard',
  'mouse': 'mouse',
  'remote': 'remote_control',
  'tv': 'monitor',
  'microwave': 'microwave',
  'toaster': 'small_appliance',
  'hair drier': 'small_appliance',
};

/**
 * Maps a COCO-SSD class name to an e-waste component label
 * @param cocoClass - The class name from COCO-SSD detection
 * @returns The corresponding e-waste label, or null if not mapped
 */
export function mapToEwaste(cocoClass: string): string | null {
  return EWASTE_MAPPING[cocoClass] || null;
}

/**
 * Checks if a COCO-SSD class is electronics/e-waste related
 * @param cocoClass - The class name from COCO-SSD detection
 * @returns True if the class is mapped to e-waste
 */
export function isElectronics(cocoClass: string): boolean {
  return cocoClass in EWASTE_MAPPING;
}

/**
 * Gets all COCO-SSD classes that are mapped to e-waste
 * @returns Array of COCO-SSD class names that map to e-waste
 */
export function getElectronicsClasses(): string[] {
  return Object.keys(EWASTE_MAPPING);
}
