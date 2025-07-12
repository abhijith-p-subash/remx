/**
 * Copies the provided text to the clipboard.
 * @param text - The string to be copied
 * @returns Promise<boolean> - true if successful, false otherwise
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};
