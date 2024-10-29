// @ts-ignore
export function sortContainerData(containers) {
  // @ts-ignore
  function timeFun(container) {
    const lastUpdatedTime: number = new Date(
      container.container.created_time
    ).getTime();
    const now: number = new Date().getTime();

    const elapsedMilliseconds = now - lastUpdatedTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return elapsedSeconds;
  }

  // @ts-ignore
  containers.sort(function (a, b) {
    const aa = timeFun(a);
    const bb = timeFun(b);
    return aa - bb;
  });
}
