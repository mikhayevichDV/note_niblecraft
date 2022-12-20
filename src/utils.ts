export const uniqValue = (): string => {
    return Math.random().toString() + performance.now().toString()
}
