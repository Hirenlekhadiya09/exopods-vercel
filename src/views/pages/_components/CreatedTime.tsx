export default function CreatedTime({ createdTime }: { createdTime: string }) {
  let createdText = "";
  const lastCreatedTime: number = new Date(createdTime).getTime();
  const now: number = new Date().getTime();

  const elapsedMilliseconds = now - lastCreatedTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  if (elapsedSeconds < 60) {
    createdText = `${elapsedSeconds} seconds ago`;
  } else if (elapsedSeconds < 3600) {
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    createdText = `${elapsedMinutes} minutes ago`;
  } else if (elapsedSeconds < 86400) {
    const elapsedHours = Math.floor(elapsedSeconds / 3600);
    createdText = `${elapsedHours} hours ago`;
  } else {
    const elapsedDays = Math.floor(elapsedSeconds / 86400);
    createdText = `${elapsedDays} days ago`;
  }

  return <p className="text-xs text-[#FFFFFFE5]">{createdText}</p>;
}
