export function convertDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);
  return `${hours > 0 ? hours + '\xa0час ' : ''}${minutes}\xa0минут`;
}


