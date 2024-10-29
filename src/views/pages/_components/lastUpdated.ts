export function lastUpdated({ updatedTime }: { updatedTime: string }) {
  let lastUpdatedText = "";
  const lastUpdatedTime: number = new Date(updatedTime).getTime();
  const now: number = new Date().getTime();

  const elapsedMilliseconds = now - lastUpdatedTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  if (elapsedSeconds < 60) {
    lastUpdatedText = `${elapsedSeconds} seconds ago`;
  } else if (elapsedSeconds < 3600) {
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    lastUpdatedText = `${elapsedMinutes} minutes ago`;
  } else if (elapsedSeconds < 86400) {
    const elapsedHours = Math.floor(elapsedSeconds / 3600);
    lastUpdatedText = `${elapsedHours} hours ago`;
  } else {
    const elapsedDays = Math.floor(elapsedSeconds / 86400);
    lastUpdatedText = `${elapsedDays} days ago`;
  }
  return lastUpdatedText;
}
