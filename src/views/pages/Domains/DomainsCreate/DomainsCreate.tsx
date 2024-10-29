import { Transition } from "@headlessui/react";
import Container from "atoms/Container";
import PageHeader from "molecules/PageHeader";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
import Loader from "pages/_components/Loader";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { configPages } from "config/configPages";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

function DomainsCreate() {
  const inputRef = useRef(null);
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunningData, setIsRunningData] = useState(true);
  const [subDomain, setSubDomain] = useState("");
  const [sucdWarning, setSucdWarning] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContainerData();
  }, []);

  async function fetchContainerData() {
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}kube/list-container`;

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
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
        return Promise.reject(res);
      })
      .then((cData) => {
        const activeData = cData.data.filter(
          (item: any) => item.status.toLowerCase() === "running"
        );
        if (activeData.length === 0) {
          setIsRunningData(false);
          setIsLoading(false);
          return;
        }
        setServicesData(activeData);
        setIsLoading(false);
      })
      .catch((err: any) => {
        // if (err.msg === "data not found") {
        //   navigate(`/services`);
        // }
        // navigate(`/services`);
        setIsRunningData(false);
        console.log(err);
        // console.log(err.status);
        setIsLoading(false);
      });
  }

  const filteredServices =
    query === ""
      ? servicesData
      : servicesData.filter((service: any) => {
          return service.container.container_name
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  function handleSelected(val: string) {
    setQuery(val);
    setOpen(false);
  }

  function handleClickOutside(e: MouseEvent) {
    // @ts-ignore
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setOpen(false);
    }
  }

  window.addEventListener("click", handleClickOutside);

  function handleSetUpCustomDomainCheck() {
    if (query === "") {
      setSucdWarning("Please select a service");
    } else if (subDomain === "") {
      setSucdWarning("Please add a subdomain.");
    } else if (
      !/^([a-zA-Z0-9][a-zA-Z0-9-_]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+$/gim.test(
        subDomain
      )
    ) {
      setSucdWarning("Please add a valid subdomain.");
    } else {
      handleSetUpCustomDomain();
    }
  }

  function handleSetUpCustomDomain() {
    const filterForId = servicesData.filter(
      (item: any) => item.container.container_name == query
    );

    setIsLoading(true);
    // @ts-ignore
    callCustomDomainApi(filterForId[0].container._id);
  }

  async function callCustomDomainApi(id: string) {
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}domain/request/${id}`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        subdomain: subDomain,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
        return Promise.reject(res);
      })
      .then((vData) => {
        navigate("/domains/verify", {
          state: { containerId: id, dataForVerify: vData.data },
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  if (isLoading) {
    return <Loader />;
  }
  if (!isRunningData) {
    return (
      <div className="w-full min-h-[calc(100vh-64px)] flex flex-col gap-6 items-center justify-center">
        <p className="text-[#fff] text-xl fsm:text-2xl text-center px-4">
          No active Running Container
        </p>
        <Link
          to="/services"
          className="bg-[#08A593] py-[6.5px] px-[16px] rounded-lg text-sm text-[#fff]"
        >
          Go to Services
        </Link>
      </div>
    );
  }
  return (
    <Container className="mt-16 sm:mt-0">
      <section>
        <div className="max-w-[480px]">
          <PageHeader title="Set up custom domain">
            <p className="mt-2 text-sm text-[#ffffff99] font-normal">
              Enhance your containerized applications with a custom domain!
              Here, you can add a new domain to your container and ensure your
              services are easily accessible. Let's get started!
            </p>
          </PageHeader>
        </div>
      </section>

      <section>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSetUpCustomDomainCheck();
          }}
        >
          <div className="flex flex-col gap-4 mt-12">
            <div className="relative max-w-[calc(100vw-50px)] fsm:w-[392px]">
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
              <label
                htmlFor="select-service"
                className="text-[#ffffffcc] font-normal mb-1"
              >
                Select service
              </label>
              <input
                ref={inputRef}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setOpen(true)}
                type="text"
                value={query}
                placeholder="Search.."
                className="mb-3.5 bg-transparent text-[#fff] border border-[#FFFFFFB2] pl-9 px-5 py-3 rounded-lg w-full text-sm"
                name="select-service"
                autoComplete="off"
              />
              {open && (
                <Transition
                  show={true}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <div className="bg-[#1B1F24] text-[#fff] px-5 py-3 rounded-[10px] w-full text-sm">
                    {filteredServices.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredServices.map((service: any) => (
                        <div
                          onClick={() =>
                            handleSelected(service.container.container_name)
                          }
                          key={service.container._id}
                          className="bg-[#1B1F24] px-[10px] py-2 flex items-center gap-[10px] rounded-[10px] hover:bg-[#08A5931A]"
                        >
                          <div className="w-5 h-5">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="10" cy="10" r="10" fill="#E6E6E6" />
                              <path
                                d="M6.3577 11.0307H9.16466L7.68417 15.382C7.49041 15.9353 8.02199 16.2307 8.35983 15.7795L12.8708 9.67693C12.9553 9.56411 13 9.45666 13 9.33312C13 9.12897 12.8559 8.96781 12.6473 8.96781H9.83534L11.3208 4.61651C11.5096 4.06321 10.983 3.76774 10.6451 4.22436L6.13414 10.3216C6.04966 10.4397 6 10.5472 6 10.6654C6 10.8749 6.14904 11.0307 6.3577 11.0307Z"
                                fill="#FFB800"
                              />
                            </svg>
                          </div>
                          {service.container.container_name}
                        </div>
                      ))
                    )}
                  </div>
                </Transition>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="enter-sub-domain"
                className="text-[#ffffffcc] font-normal mb-1"
              >
                Enter sub domain
              </label>
              <input
                className="bg-transparent text-[#fff] border border-[#FFFFFFB2] px-5 py-3 rounded-lg max-w-[calc(100vw-50px)] fsm:w-[392px] text-sm"
                type="text"
                onChange={(e) => setSubDomain(e.target.value)}
                value={subDomain}
                placeholder="subdomain.domain.com"
                name="enter-sub-domain"
                autoComplete="off"
              />
              <span className="text-red-500 text-sm mt-3 inline-block">
                {sucdWarning}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#ffffff99] font-normal mt-12 max-w-[420px]">
            Please select a service and enter your subdomain to set up your
            custom domain.
          </p>

          <div className="mt-12">
            <button
              type="submit"
              className="mb-8 bg-[#08A593] text-[#fff] border-2 w-[117px] h-11 rounded-lg border-[#08A593] text-sm font-medium"
              // onClick={() => handleSetUpCustomDomainCheck()}
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </Container>
  );
}

export default DomainsCreate;
