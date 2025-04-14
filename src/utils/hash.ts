export const hashData = (data: Record<string, any>): string => {
  const stringified = JSON.stringify(data);
  // Simple hash function for demonstration
  let hash = 0;
  for (let i = 0; i < stringified.length; i++) {
    const char = stringified.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};
