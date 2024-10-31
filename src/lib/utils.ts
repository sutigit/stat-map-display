export function joinPaths(...segments: string[]): string {
    return segments
        .map((segment, index) => {
            if (index === 0) {
                return segment.replace(/\/+$/, '');  // Trim trailing slashes from the first segment
            }
            return segment.replace(/^\/+|\/+$/, '');  // Trim slashes from middle segments
        })
        .join('/');
}
