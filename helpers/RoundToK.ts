/**
 * Converts a number to a string with "K" for thousands if the number is >= 1000.
 * Numbers below 1000 are returned as is.
 * 
 * @param num - The number to convert.
 * @returns A string representing the formatted number.
 */
export function RoundToK(num: number | string): string {
    if (Number(num) >= 1000) {
        const formattedNumber = Number(num) / 1000;
        return formattedNumber % 1 === 0 ? formattedNumber.toFixed(0) + 'K' : formattedNumber.toFixed(1) + 'K';
    }
    return num.toString()
}