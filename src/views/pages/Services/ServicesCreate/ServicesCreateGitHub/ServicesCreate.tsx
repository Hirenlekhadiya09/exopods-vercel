import { Octokit } from "octokit";
import { Transition } from "@headlessui/react";
import { useState, useEffect, useRef } from "react";
import {
  Dots,
  CurrentProcess,
  YetToCompleteProcess,
  DeployProgress,
  GitRepoCard,
} from "pages/Services/_sections/DeployProgress";
import { useNavigate } from "react-router-dom";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;
const githubAppLink: string = import.meta.env.VITE_EXO_GITHUB_APP_LINK;

function ServicesCreate() {
  const [repoData, setRepoData] = useState<any[]>([]);
  const [branchesData, setBranchesData] = useState<any[]>([]);
  const inputRepoRef = useRef(null);
  const inputBranchRef = useRef(null);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [deploymentName, setDeploymentName] = useState<string>("");
  const [openRepoList, setOpenRepoList] = useState(false);
  const [openBranchList, setOpenBranchList] = useState(false);
  const [ownerName, setOwnerName] = useState<string>("");
  const [skeleton, setSkelton] = useState(true);
  const [cCWarning, setCCWarning] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDeploymentName(selectedRepo + "-" + selectedBranch);
  }, [selectedRepo, selectedBranch]);

  // const filteredRepos =
  //   selectedRepo === ""
  //     ? repoData
  //     : repoData.filter((repo: any) => {
  //         return repo.name.toLowerCase().includes(selectedRepo.toLowerCase());
  //       });

  // const filteredBranches =
  //   selectedBranch === ""
  //     ? branchesData
  //     : branchesData.filter((branch: any) => {
  //         return branch.name
  //           .toLowerCase()
  //           .includes(selectedBranch.toLowerCase());
  //       });

  function handleSelectedRepo(val: string) {
    setSelectedRepo(val);
    setOpenRepoList(false);
    setSelectedBranch("");
  }

  function handleSelectedBranch(val: string) {
    setSelectedBranch(val);
    setOpenBranchList(false);
  }

  function handleClickOutsideRepoList(e: MouseEvent) {
    // @ts-ignore
    if (inputRepoRef.current && !inputRepoRef.current.contains(e.target)) {
      setOpenRepoList(false);
    }
  }
  function handleClickOutsideBranchList(e: MouseEvent) {
    // @ts-ignore
    if (inputBranchRef.current && !inputBranchRef.current.contains(e.target)) {
      setOpenBranchList(false);
    }
  }

  window.addEventListener("click", (e) => {
    if (openRepoList) {
      handleClickOutsideRepoList(e);
    }
    if (openBranchList) {
      handleClickOutsideBranchList(e);
    }
  });

  useEffect(() => {
    // if (window.localStorage.getItem("installation_token")) {
    //   fetchReposList(window.localStorage.getItem("installation_token"));
    // } else {
    fetchGitHubAppToken();
    // }
  }, []);

  async function fetchGitHubAppToken() {
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}user/github-token`;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        fetchAccessToken(data.token);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async function fetchAccessToken(token: string) {
    const octokit = new Octokit({
      auth: `Bearer ${token}`,
    });

    await octokit
      .request("POST /app/installations/{installation_id}/access_tokens", {
        // @ts-ignore
        installation_id: window.localStorage.getItem("installation_id"),
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((res: any) => {
        window.localStorage.setItem("installation_token", res.data.token);
        fetchReposList(res.data.token);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  async function fetchReposList(token: string) {
    const octokit = new Octokit({
      auth: `Bearer ${token}`,
    });

    try {
      const response = await octokit.request("GET /installation/repositories", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      setOwnerName(response.data.repositories[0].owner.login);
      setSkelton(false);
      const repos = response.data.repositories;

      const reposWithBranches = await Promise.all(
        repos.map(async (repo: any) => {
          const branches = await repoBranches({
            repoName: repo.name,
            owner: repo.owner.login,
          });
          return { ...repo, branches };
        })
      );
      setRepoData(reposWithBranches);
      setSelectedRepo(reposWithBranches[0].name);
      setBranchesData(reposWithBranches[0].branches);
      setSelectedBranch(reposWithBranches[0].branches[0].name);
    } catch (error) {
      console.log(error);
    }
  }

  async function repoBranches({
    repoName,
    owner,
  }: {
    repoName: string;
    owner: string;
  }) {
    const octokit = new Octokit({
      auth: `${window.localStorage.getItem("installation_token")}`,
    });

    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/branches",
        {
          owner: owner,
          repo: repoName,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function handleImportRepoClick() {
    const windowWidth = 1000;
    const windowHeight = 600;
    const windowLeft = 50;
    const windowTop = 50;
    window.open(
      `${githubAppLink}/installations/${window.localStorage.getItem(
        "installation_id"
      )}`,
      "_blank",
      `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedRepo === "") {
      setCCWarning("Please choose a Repository");
    } else if (deploymentName === "") {
      setCCWarning("Please enter the Deployment Name");
    } else if (selectedBranch === "") {
      setCCWarning("Please choose a Branch");
    } else {
      navigate("/services/new/github/deployment", {
        state: {
          selectedRepo: selectedRepo,
          selectedBranch: selectedBranch,
          deploymentName: deploymentName,
          ownerName: ownerName,
        },
      });
    }
  }

  function SkeletonInput() {
    return (
      <div className="animate-pulse w-full h-[46px] bg-[#85858521] rounded-lg"></div>
    );
  }

  function SearchIcon() {
    return (
      <>
        {!skeleton && (
          <div className="absolute top-[38px] left-3">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 16L12.875 12.375M14.8333 7.66667C14.8333 11.3486 11.8486 14.3333 8.16667 14.3333C4.48477 14.3333 1.5 11.3486 1.5 7.66667C1.5 3.98477 4.48477 1 8.16667 1C11.8486 1 14.8333 3.98477 14.8333 7.66667Z"
                stroke="white"
                stroke-opacity="0.7"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="m-12">
          <GitRepoCard
            selectedRepo={selectedRepo}
            selectedBranch={selectedBranch}
          />
          <DeployProgress>
            <CurrentProcess
              heading="Configure Github"
              description="Specify how Exopods will build your site. "
              inProcess={true}
              step={1}
            />
            <Dots />
            <YetToCompleteProcess
              heading="Configure Deployment"
              description="Specify how Exopods will build your site. "
              inProcess={false}
              step={2}
            />
            <Dots />
            <YetToCompleteProcess
              heading="Go Live"
              description="Specify how Exopods will build your site. "
              inProcess={false}
              step={3}
            />
          </DeployProgress>
        </div>
        <div className="m-12 p-8 w-full border border-[#BBBBBB26] rounded-[9px]">
          <div className="mb-6">
            <h3 className="text-[#EDEDED] text-[22px] font-medium">
              Configure GitHub
            </h3>
            <p className="text-[#F1F1FF99] text-[14px]">
              Please follow the steps to configure your Project and deploy it.
            </p>
          </div>
          <section>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mt-12">
                <div className="relative">
                  <SearchIcon />
                  <label
                    htmlFor="select-service"
                    className="text-[#C4C4C4A8] text-[14px] font-normal mb-2"
                  >
                    Repo Name
                  </label>
                  {skeleton ? (
                    <SkeletonInput />
                  ) : (
                    <>
                      <div className="flex gap-3 mb-3.5">
                        <input
                          ref={inputRepoRef}
                          // onChange={(e) => setSelectedRepo(e.target.value)}
                          onFocus={() => setOpenRepoList(true)}
                          type="text"
                          value={selectedRepo}
                          placeholder="Search.."
                          className="bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none pl-9 px-5 py-3 rounded-lg w-full text-sm"
                          name="select-service"
                          autoComplete="off"
                        />
                        <button
                          onClick={() => handleImportRepoClick()}
                          type="button"
                          className="border border-[#C4C4C4A8] text-[#C4C4C4A8] rounded-md px-3 whitespace-nowrap"
                        >
                          Import Git Repo
                        </button>
                      </div>
                      {openRepoList && (
                        <Transition
                          show={true}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setSelectedRepo("")}
                        >
                          <div className="bg-[#0C1015] border border-[#BBBBBB26] text-[#fff] px-5 py-3 rounded-[10px] w-full text-sm">
                            {repoData.length === 0 && selectedRepo !== "" ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                              </div>
                            ) : (
                              repoData.map((repo: any) => (
                                <div
                                  onClick={() => {
                                    setBranchesData(repo.branches);
                                    handleSelectedRepo(repo.name);
                                  }}
                                  key={repo.name}
                                  className="bg-[#0C1015] px-[10px] py-2 flex items-center gap-[10px] rounded-[10px] hover:bg-[#BBBBBB0A]"
                                >
                                  <div className="w-5 h-5">
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="10"
                                        cy="10"
                                        r="10"
                                        fill="#E6E6E6"
                                      />
                                      <path
                                        d="M6.3577 11.0307H9.16466L7.68417 15.382C7.49041 15.9353 8.02199 16.2307 8.35983 15.7795L12.8708 9.67693C12.9553 9.56411 13 9.45666 13 9.33312C13 9.12897 12.8559 8.96781 12.6473 8.96781H9.83534L11.3208 4.61651C11.5096 4.06321 10.983 3.76774 10.6451 4.22436L6.13414 10.3216C6.04966 10.4397 6 10.5472 6 10.6654C6 10.8749 6.14904 11.0307 6.3577 11.0307Z"
                                        fill="#FFB800"
                                      />
                                    </svg>
                                  </div>
                                  {repo.name}
                                </div>
                              ))
                            )}
                          </div>
                        </Transition>
                      )}{" "}
                    </>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="select-service"
                  className="text-[#C4C4C4A8] text-[14px] font-normal mb-2"
                >
                  Deployment Name
                </label>
                {skeleton ? (
                  <SkeletonInput />
                ) : (
                  <input
                    type="text"
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    placeholder="My-deployment"
                    className="mb-3.5 bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none px-3 py-3 rounded-lg w-full text-sm"
                    name="deployment-name"
                    autoComplete="off"
                  />
                )}
              </div>
              <div className="relative">
                <SearchIcon />
                <label
                  htmlFor="select-service"
                  className="text-[#C4C4C4A8] text-[14px] font-normal mb-2"
                >
                  Select Branch
                </label>
                {skeleton ? (
                  <SkeletonInput />
                ) : (
                  <>
                    <input
                      ref={inputBranchRef}
                      // onChange={(e) => setSelectedBranch(e.target.value)}
                      onFocus={() => setOpenBranchList(true)}
                      type="text"
                      value={selectedBranch}
                      placeholder="Search.."
                      className="mb-3.5 bg-transparent text-[#fff] border border-[#BBBBBB1F] focus:border-[#BBBBBB80] active:border-[#BBBBBB80] focus:outline-none active:outline-none pl-9 px-5 py-3 rounded-lg w-full text-sm"
                      name="select-service"
                      autoComplete="off"
                    />
                    {openBranchList && (
                      <Transition
                        show={true}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setSelectedBranch("")}
                      >
                        <div className="bg-[#0C1015] border border-[#BBBBBB26] text-[#fff] px-5 py-3 rounded-[10px] w-full text-sm">
                          {branchesData.length === 0 && selectedRepo !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            branchesData.map((branch: any) => (
                              <div
                                onClick={() =>
                                  handleSelectedBranch(branch.name)
                                }
                                key={branch.name}
                                className="bg-[#0C1015] px-[10px] py-2 flex items-center gap-[10px] rounded-[10px] hover:bg-[#BBBBBB0A]"
                              >
                                <div className="w-5 h-5">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="10"
                                      cy="10"
                                      r="10"
                                      fill="#E6E6E6"
                                    />
                                    <path
                                      d="M6.3577 11.0307H9.16466L7.68417 15.382C7.49041 15.9353 8.02199 16.2307 8.35983 15.7795L12.8708 9.67693C12.9553 9.56411 13 9.45666 13 9.33312C13 9.12897 12.8559 8.96781 12.6473 8.96781H9.83534L11.3208 4.61651C11.5096 4.06321 10.983 3.76774 10.6451 4.22436L6.13414 10.3216C6.04966 10.4397 6 10.5472 6 10.6654C6 10.8749 6.14904 11.0307 6.3577 11.0307Z"
                                      fill="#FFB800"
                                    />
                                  </svg>
                                </div>
                                {branch.name}
                              </div>
                            ))
                          )}
                        </div>
                      </Transition>
                    )}
                  </>
                )}
              </div>
              <div>
                <span className="text-red-500 text-sm mt-3 inline-block">
                  {cCWarning}
                </span>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="mb-8 text-[#fff] border h-11 rounded-md w-full border-[#1A73E8] hover:!bg-[#fff] ease-in-out hover:text-[#000] text-sm font-medium"
                  style={{
                    background: `linear-gradient(90deg, rgba(26, 115, 232, 0.05) 0%, rgba(240, 40, 73, 0.05) 54%, rgba(133, 59, 206, 0.05) 98.5%)`,
                  }}
                >
                  Continue
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default ServicesCreate;
