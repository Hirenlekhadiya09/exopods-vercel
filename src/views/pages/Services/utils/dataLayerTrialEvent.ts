export default function dataLayerTrialEvent(txnArray: string[]) {
  if (txnArray.length === 0) {
    return window.dataLayer.push({
      event: "trial",
    });
  }
}
