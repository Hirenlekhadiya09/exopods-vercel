export default function GitHubIndex() {
  const redirectUrl = window.location.href;
  const startIndex = redirectUrl?.indexOf("installation_id");
  const endIndex = redirectUrl?.indexOf("&setup");
  const installationId = redirectUrl?.slice(startIndex + 16, endIndex);
  localStorage.setItem("installation_id", installationId);
  opener.location.href = "/services/new/github";
  window.close();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black z-[100] flex flex-col items-center justify-center">
      <div>
        <h1 className="text-white text-3xl">GitHub Installation Completed</h1>
        <p className="text-white mt-2">This window will close automatically</p>
      </div>
    </div>
  );
}
