import Container from "atoms/Container";
import PageHeader from "molecules/PageHeader";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DomainItemTR from "./_components/DomainItemTR";
import DomainItemCard from "./_components/DomainItemCard";
import Loader from "pages/_components/Loader";
import { removeAccessToken } from "pages/Auth/removeAccessToken";
const exoApiUrl: string = import.meta.env.VITE_EXO_API_URL;

interface DomainItemProps {
  container_name: string;
  _id: string;
  records: any;
  initiated_at: string;
  domain: string;
  container_id: string;
  status: boolean;
}

function DomainsIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const [domainsData, setDomainsData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDomainsData();
  }, []);

  async function fetchDomainsData() {
    const accessToken = window.localStorage.getItem("access_token");
    const apiUrl = `${exoApiUrl}domain/list/`;

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
      .then((dData) => {
        //////////////////
        // if (dData.data.length === 0) {
        //   navigate(`/domains/new`);
        // }
        //////////////////
        setDomainsData(dData.data.reverse());
        setIsLoading(false);
      })
      .catch((err: any) => {
        navigate(`/domains/new`);
        console.log(err);
      });
  }

  async function handleDetachDomain(id: string) {
    setIsLoading(true);
    const accessToken = window.localStorage.getItem("access_token");
    const deleteUrl = `${exoApiUrl}domain/detach/${id}`;

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchDomainsData();
        }
        if (res.status == 401) {
          removeAccessToken();
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Error:", err);
      });
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <section></section>
      <section className="pb-2">
        <div className="fixed top-16 sm:top-0 px-6 sm:px-0 left-0 sm:relative bg-[#0C1015] w-[calc(100vw-20px)] sm:w-full">
          <div className="flex gap-8 items-start exobp:items-center justify-between sm:mt-5 exobp:mt-0">
            <PageHeader
              title="Domains"
              className="flex gap-4 flex-col justify-between"
            >
              <p className="text-[#ffffff99] text-sm font-normal max-w-[770px] hidden exobp:flex">
                Enhance your containerized applications with a custom domain!
                Here, you can add a new domain to your container and ensure your
                services are easily accessible. Let's get started!
              </p>
            </PageHeader>
            <NavLink
              to="/domains/new"
              className="flex items-center gap-[5px] fsm:bg-[#08A593] py-[6.5px] fsm:px-[16px] rounded-lg text-sm text-[#fff]"
            >
              <svg
                width="12"
                height="12"
                className="w-4 h-4 fsm:w-3 fsm:h-3"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 11V1M1 6H11"
                  stroke="white"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </svg>
              <span className="hidden fsm:inline-block whitespace-nowrap">
                New Domain
              </span>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="">
        <div className="mt-8 flow-root">
          <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="hidden exobp:inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative">
                <table className="min-w-full table-fixed">
                  <thead className=" rounded-2xl h-12">
                    <tr className="text-[#667085] text-xs font-normal">
                      <th
                        scope="col"
                        className="px-2 min-w-[5rem] text-left pl-4 bg-[#24292F] text-[#fff] rounded-tl-2xl rounded-bl-2xl"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#24292F] text-[#fff]"
                      >
                        Domain
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#24292F] text-[#fff]"
                      >
                        Created On
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#24292F] text-[#fff]"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-2 text-left bg-[#24292F] text-[#fff] rounded-tr-2xl rounded-br-2xl pl-3"
                      >
                        <span className="sr-only">Manage</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y-[0.5px] divide-[#ffffff40] bg-white">
                    {domainsData.map((item: DomainItemProps) => (
                      <DomainItemTR
                        handleDetachDomain={() =>
                          handleDetachDomain(item.container_id)
                        }
                        containerId={item._id}
                        records={item.records}
                        status={item.status}
                        containerName={item.container_name}
                        domain={item.domain}
                        createdTime={item.initiated_at}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-5 exobp:hidden px-4 sm:px-8 mt-20 sm:mt-0 pb-10">
              {domainsData.map((item: DomainItemProps) => (
                <DomainItemCard
                  handleDetachDomain={() =>
                    handleDetachDomain(item.container_id)
                  }
                  containerId={item._id}
                  records={item.records}
                  status={item.status}
                  containerName={item.container_name}
                  domain={item.domain}
                  createdTime={item.initiated_at}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default DomainsIndex;
