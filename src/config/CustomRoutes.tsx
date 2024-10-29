import { Navigate, useRoutes } from "react-router-dom";
import { configPages } from "config/configPages";

// ===========================================================
// Dashboard
// ===========================================================

// Services
// -----------------
import ServicesIndex from "pages/Services/ServicesIndex/ServicesIndex";
import ServicesShow from "pages/Services/ServicesShow/ServicesShow";
import ServicesCreate from "pages/Services/ServicesCreate/ServicesCreate";
import ServicesCreateDockerImage from "pages/Services/ServicesCreate/ServicesCreateDockerImage/ServicesCreate";
import ServicesCreateTemplates from "pages/Services/ServicesCreate/ServicesCreateTemplates/ServicesCreate";
import ServicesCreateGitHub from "pages/Services/ServicesCreate/ServicesCreateGitHub/ServicesCreate";
import ServicesCreateConfigureDeployment from "pages/Services/ServicesCreate/ServicesCreateConfigureDeployment/ServicesCreate";
import ServicesCreateGoLive from "pages/Services/ServicesCreate/ServicesCreateGoLive/ServicesCreate";

// GitHub
import GitHubIndex from "pages/GitHub/GitHubIndex";

// Domains
// -----------------
import DomainsIndex from "pages/Domains/DomainsIndex/DomainsIndex";
import DomainsCreate from "pages/Domains/DomainsCreate/DomainsCreate";
import DomainsVerify from "pages/Domains/DomainsVerify/DomainsVerify";

// Networking
// -----------------
import NetworkingIndex from "pages/Services/ServicesShow/Networking/NetworkingIndex";
import LogsIndex from "pages/Services/ServicesShow/Logs/LogsIndex";
import EventsIndex from "pages/Services/ServicesShow/Events/EventsIndex";
import RevisionIndex from "pages/Services/ServicesShow/Revision/RevisionIndex";
import InspectIndex from "pages/Services/ServicesShow/Inspect/InspectIndex";
import FilesIndex from "pages/Services/ServicesShow/Files/FilesIndex";
import IntegregationIndex from "pages/Services/ServicesShow/Integregation/IntegregationIndex";
import TriggersIndex from "pages/Services/ServicesShow/Triggers/TriggersIndex";

// ===========================================================
// Authentication
// ===========================================================
// import Login from "pages/Auth/Login";
// import Register from "pages/Auth/Register";
import SignIn from "pages/Auth/SignIn";
import SignUp from "pages/Auth/SignUp";

// ===========================================================
// Other
// ===========================================================

// LAYOUT
// -----------------
// import LayoutAuth from "pages/_layout/LayoutAuth";
import LayoutDashboard from "pages/_layout/LayoutDashboard";

// NOT ALLOWED
// -----------------
import Forbidden from "pages/Forbidden/Forbidden";
import NotFound from "pages/NotFound/NotFound";
import HomeIndex from "pages/Home/HomeIndex";
import TermsOfService from "pages/TermsOfService/TermsOfService";
import PrivacyPolicy from "pages/PrivacyPolicy/PrivacyPolicy";
import ServiceCreateDocker from "pages/Services/ServicesCreate/ServicesCreateDockerImage/ServiceCreateDocker";
import ServicesCreateDocker from "pages/Services/ServicesCreate/ServicesCreateConfigureDeploymentDocker/ServicesCreate";
import Summary from "pages/Home/Summary/summary";

function CustomRoutes() {
  let routes = useRoutes([
    {
      path: "/",
      element: <HomeIndex />,
    },
    {
      path: "/terms-of-service",
      element: <TermsOfService />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/services/summary/:id/",
      element: <Summary />,
    },
    // {
    //   path: "/auth/login",
    //   element: <Navigate to="/" replace={true} />,
    // },
    {
      path: "/",
      element: <LayoutDashboard />,
      children: [
        {
          path: "/",
          element: <Navigate to="/services" replace={true} />,
        },
        {
          path: "/services",
          element: <ServicesIndex />,
        },
        {
          path: "/github",
          element: <GitHubIndex />,
        },
        {
          path: "/services/new",
          element: <ServicesCreate />,
        },
        {
          path: "/services/new/docker-image",
          element: <ServicesCreateDockerImage />,
        },
        {
          path: "/service/new/docker-images",
          element: <ServiceCreateDocker />,
        },
        {
          path: "/services/new/docker/deployment",
          element: <ServicesCreateDocker />,
        },
        {
          path: "/services/new/templates",
          element: <ServicesCreateTemplates />,
        },
        {
          path: "/services/new/github",
          element: <ServicesCreateGitHub />,
        },
        {
          path: "/services/new/github/deployment",
          element: <ServicesCreateConfigureDeployment />,
        },
        {
          path: "/services/new/github/golive",
          element: <ServicesCreateGoLive />,
        },
        {
          path: `${configPages.SERVICES.path}/:id/`,
          element: <ServicesShow />,
          children: [
            {
              path: "",
              element: <Navigate to="logs" replace={true} />,
            },
            {
              path: "logs",
              element: <LogsIndex />,
            },
            {
              path: "events",
              element: <EventsIndex />,
            },
            {
              path: "revision",
              element: <RevisionIndex />,
            },
            {
              path: "inspect",
              element: <InspectIndex />,
            },
            {
              path: "files",
              element: <FilesIndex />,
            },
            {
              path: "networking",
              element: <NetworkingIndex />,
            },
            {
              path: "integregation",
              element: <IntegregationIndex />,
            },
            {
              path: "triggers",
              element: <TriggersIndex />,
            },
          ],
        },
        {
          path: "/domains",
          element: <DomainsIndex />,
        },
        {
          path: "/domains/new",
          element: <DomainsCreate />,
        },
        {
          path: "/domains/verify",
          element: <DomainsVerify />,
        },
      ],
    },
    // ====================================================
    // CustomRoutes: Authentication
    // ====================================================
    // {
    //   path: configPages.AUTH.path,
    //   element: <LayoutAuth />,
    //   children: [
    //     {
    //       path: configPages.AUTH.path + configPages.LOGIN.path,
    //       element: <Navigate to="/" replace={true} />,
    //       // element: <Login />,
    //     },
    //     {
    //       path: configPages.AUTH.path + configPages.REGISTER.path,
    //       element: <Navigate to="/" replace={true} />,
    //       // element: <Register />,
    //     },
    //     // {
    //     //     path: configPages.AUTH.path + configPages.FORGOTTEN_PASSWORD.path,
    //     //     element: <Forgot />
    //     // },
    //   ],
    // },

    // ====================================================
    // CustomRoutes: Self Service
    // ====================================================

    // ====================================================
    // CustomRoutes: Something Went Wrong
    // ====================================================
    // {
    //   path: "/auth/login",
    //   element: <Navigate to="/" replace={true} />,
    // },
    // {
    //   path: "/signupp",
    //   element: <Signupp />,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: configPages.NOT_FOUND.path,
      element: <NotFound />,
    },
    {
      path: configPages.FORBIDDEN.path,
      element: <Forbidden />,
    },
  ]);

  return routes;
}

export default CustomRoutes;
