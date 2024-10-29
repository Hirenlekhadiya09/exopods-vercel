interface Ihfs {
    containerData: any,
    filterVal: string,
    searchVal: string,
    setActiveContainerData: any,
}

export function handleFilterSearch({ containerData, filterVal, searchVal, setActiveContainerData }: Ihfs) {
    const activeData: any = [];
    function filterSearch() {
      for (const item of containerData) {
        if (
          filterVal === "running" &&
          item.status.toLowerCase() === "running" &&
          item.container.container_name
            .toLowerCase()
            .includes(searchVal.toLowerCase())
        ) {
          activeData.push(item);
        } else if (
          filterVal !== "running" &&
          item.status.toLowerCase() !== "running" &&
          item.container.container_name
            .toLowerCase()
            .includes(searchVal.toLowerCase())
        ) {
          activeData.push(item);
        }
      }
      setActiveContainerData(activeData);
    }

    function search() {
        const activeData = [];
        for (const item of containerData) {
          const containerName = item.container.container_name;
          if (containerName.toLowerCase().includes(searchVal.toLowerCase())) {
            activeData.push(item);
          }
        }
        setActiveContainerData(activeData);
    }

    function filter(val: string) {
      const activeData = [];
      for (const item of containerData) {
        if (item.status.toLowerCase() === val) {
          activeData.push(item);
        } else if (
          val === "other" &&
          !(item.status.toLowerCase() === "running")
        ) {
          activeData.push(item);
        }
      }
      setActiveContainerData(activeData);
    }

    if (filterVal === "view-all" && searchVal === "") {
      setActiveContainerData(containerData);
    } else if (filterVal === "view-all" && searchVal !== "") {
      search();
    } else if (filterVal === "running" && searchVal === "") {
      filter("running");
    } else if (filterVal === "running" && searchVal !== "") {
      filterSearch();
    } else if (
      filterVal !== "view-all" &&
      filterVal !== "running" &&
      searchVal === ""
    ) {
      filter("other");
    } else {
      filterSearch();
    }
  }