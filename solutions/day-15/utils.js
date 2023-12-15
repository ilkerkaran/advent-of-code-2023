export const decodeLabel = (label) => label.split('').reduce((startVal, c) => ((startVal + c.charCodeAt(0)) * 17) % 256, 0)
