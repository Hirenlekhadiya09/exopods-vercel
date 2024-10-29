import React, { useState } from "react";
import Header from "pages/Home/_components/Header";
import Footer from "pages/Home/_components/Footer";

type SidebarItemProps = {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  label,
  isActive,
  onClick,
}) => (
  <li>
    <a
      href={`#${id}`}
      className={`inline-block px-2 py-1 transition-all duration-300 rounded-lg border ${
        isActive
          ? "text-[#D2A8FF] bg-gradient-to-r from-[#1A73E8] via-[#853BCE] to-[#C471ED]"
          : "hover:text-[#D2A8FF] hover:bg-gradient-to-r from-[#1A73E8] via-[#853BCE] to-[#C471ED]"
      }`}
      style={{
        background:
          "linear-gradient(90deg, rgba(26, 115, 232, 0.05) 0%, rgba(240, 40, 73, 0.05) 54%, rgba(133, 59, 206, 0.05) 98.5%)",
        border: isActive ? "2px solid transparent" : "1px solid transparent",
        borderImage: isActive
          ? "linear-gradient(90deg, #1A73E8, #853BCE, #C471ED) 1"
          : "",
        borderImageSlice: isActive ? 1 : 0,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          const target = e.currentTarget as HTMLElement;
          target.style.borderImage =
            "linear-gradient(90deg, #1A73E8, #853BCE, #C471ED) 1";
          target.style.borderImageSlice = "1";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          const target = e.currentTarget as HTMLElement;
          target.style.borderImage = "";
          target.style.border = "1px solid transparent";
        }
      }}
      onClick={onClick}
    >
      {label}
    </a>
  </li>
);

const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleClick = (section: string) => {
    setActiveSection(section);
  };

  const sections = [
    {
      id: "legal-basis-for-collecting-information",
      label: "Legal basis for collecting information",
    },
    {
      id: "type-of-information-that-we-collect",
      label: "Type of Information that we collect",
    },
    {
      id: "how-and-why-we-collect-your-information",
      label: "How and Why We Collect Your Information",
    },
    { id: "sharing-with-third-party", label: "Sharing with Third-Party" },
    {
      id: "information-that-cannot-be-uploaded",
      label: "Information that cannot be uploaded",
    },
    { id: "your-controls-and-choices", label: "Your Controls and Choices" },
    { id: "how-long-is-the-data-kept", label: "How long is the data kept?" },
    { id: "data-security-and-integrity", label: "Data Security and Integrity" },
    {
      id: "data-transfers-storage-and-processing-globally",
      label: "Data Transfers, Storage and Processing Globally",
    },
    {
      id: "changes-to-this-privacy-policy",
      label: "Changes to this Privacy Policy",
    },
    {
      id: "contact-in-case-of-grievances",
      label: "Contact in case of grievances",
    },
    { id: "comments-and-questions", label: "Comments and Questions" },
    { id: "what-are-cookies", label: "What are cookies?" },
  ];

  return (
    <nav className="w-full md:w-1/3 md:h-screen mb-8 md:mb-0 md:sticky md:top-[120px] h-auto overflow-y-auto bg-transparent scrollbar-hidden">
      <ul className="space-y-4 text-sm md:text-base">
        {sections.map((section) => (
          <SidebarItem
            key={section.id}
            id={section.id}
            label={section.label}
            isActive={activeSection === section.id}
            onClick={() => handleClick(section.id)}
          />
        ))}
      </ul>
    </nav>
  );
};
function PrivacyPolicy() {
  const paragraphClass = "text-[#9A9DAC] text-justify mb-6 mr-[22px]";
  const headerHeight = "120px";

  return (
    <>
      <Header />
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          section {
            scroll-margin-top: ${headerHeight}; 
          }
          .scrollbar-hidden::-webkit-scrollbar {
           display: none;
          }
          .scrollbar-hidden {
          -ms-overflow-style: none; 
          scrollbar-width: none; 
          }
          .gradient-border {
          border: 2px solid; 
          border-image: linear-gradient(90deg, rgba(26, 115, 232, 1), rgba(133, 59, 206, 1), rgba(196, 113, 237, 1)) 1; 
          padding: 8px 16px; 
          margin-bottom: 10px;
          border-radius: 8px; 
          color: #ffffff;
          background-color: #000000; 
          transition: all 0.3s ease; 
          }
          .gradient-border:hover {
           border-image: linear-gradient(90deg, rgba(26, 115, 232, 1), rgba(240, 40, 73, 1), rgba(133, 59, 206, 1)) 1; 
           color: #D2A8FF; 
           background-color: #1a1a1a;
          }
        `}
      </style>
      <div className="min-h-screen bg-[#000] text-white flex flex-col">
        <div className="flex-grow flex items-center justify-center mt-28">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-6">
              Updated September 1, 2024
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Privacy Policy
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row mt-16">
          <Sidebar />
        <div className="w-full md:w-2/3 md:ml-8">
        <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Exopods (exopods.com) is a product offering from Exopods, Inc.</h2>
        <p className={paragraphClass}>
        Our privacy policy is designed to provide greater transparency into our privacy practices and principles while processing your personal information.
        </p>
        <p className={paragraphClass}>
        <span style={{ color: 'white' }}>Effective Date: 1st August, 2024</span>
        </p>
        <p className={paragraphClass}>
            This privacy policy describes the treatment of certain Personal Information provided by you or collected by us on www.exopods.com where this privacy policy is posted.
        </p>
        <p className={paragraphClass}>
            By using our Services, you are hereby consenting to collection of your information by us. The information in some cases may include Personal Information and Sensitive Personal Information too. You will be required to click on the box below, confirming your acceptance of this Privacy Policy.
        </p>
        </section>
          <section id="legal-basis-for-collecting-information" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">1. Legal basis for collecting information</h2>
            <p className={paragraphClass}>
                We collect certain Information because it is necessary for us to be able to provide and administer the Service and its features. We also collect certain Information to comply with specified statutory requirements.
            </p>
            <p className={paragraphClass}>
                Such data is processed based on your consent. To the extent that processing is carried out on the basis of consent, it is for you to give such a consent and you may at any time, wholly or partly, withdraw your consent. Even if you have consented to our using your information for a specific purpose, you will have the right to change your mind at any time, but this will not affect any processing that has already taken place.
            </p>
            <p className={paragraphClass}>
                Please note that for certain Services it is essential for us to access and use certain Information and if you refuse to provide us the consent, it may result in a suspension of your account
            </p>
          </section>

            <section id="type-of-information-that-we-collect" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                2. Type of Information that we collect
              </h2>
              <p className={paragraphClass}>
                We collect the following information as and when you access and
                use the Services as set out below:
              </p>
              <p className={paragraphClass}>
                I.  Information you provide when you sign up for our Services:
                Registration information you provide when you create an account,
                including your first name and surname, country of residence,
                gender, age, email address, username and password, your postal
                address, telephone number, PAN and GST numbers.
              </p>
              <p className={paragraphClass}>
                II. Information you provide when you use our Services: Location
                information (either provided by a mobile device through which
                you utilize our Services or associated with your IP address)
                when you use our Services, usage, viewing and technical data,
                including your device identifier or IP address, when you use our
                Services on third-party sites or platforms or open emails we
                send. The information you provide in public forums while using
                our Services.
              </p>
              <p className={paragraphClass}>
                III. Information you provide when you contact us for support:
                Information sent either one-to-one or within a limited group
                using our message, chat, post or similar functionality, where we
                are required by law to collect this information.
              </p>
            </section>
            <section
              id="how-and-why-we-collect-your-information"
              className="mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                3. How and Why We Collect Your Information
              </h2>
              <p className={paragraphClass}>
                We collect information through technology, such as cookies and
                web beacons when you use our Services. The information we learn
                from customers helps us personalize and continually improve your
                experience of the Services as set out below:
              </p>
              <p className={paragraphClass}>
                I. Provide you with service notifications via email and within
                the Services based on your notification selections
              </p>
              <p className={paragraphClass}>
                II. Contact you by email, postal mail, or phone regarding
                services, surveys, research studies, promotions, special events
                and other subjects that we think may be of interest to you
              </p>
              <p className={paragraphClass}>
                III. Help us better understand your interests and needs, and
                improve the Services
              </p>
              <p className={paragraphClass}>
                IV. The information we learn may also provide the basis for
                market and customer analysis, market research, statistics,
                business monitoring and business and methodological development
                for our website.
              </p>
              <p className={paragraphClass}>
                V. Engage analysis, research, and reports regarding use of our
                Services
              </p>
              <p className={paragraphClass}>
                VI. Provide, manage, and improve the Services
              </p>
              <p className={paragraphClass}>
                VII. Protect our Services and our users
              </p>
              <p className={paragraphClass}>
                VIII. Understand and resolve app crashes and other issues being
                reported.
              </p>
              <p className={paragraphClass}>
                IX. We acquire information from other trusted sources to update
                or supplement the information you have provided to us or which
                are collected automatically.
              </p>
              <p className={paragraphClass}>
                X. We also use this information to improve our platform, prevent
                or detect fraud or abuses of our Services, for market research
                purposes and enable third parties to carry out technical,
                logistical or other functions on our behalf.
              </p>
              <p className={paragraphClass}>
                XI. In addition to the above, we process your Personal
                Information to prevent, detect and investigate potential
                prohibited or illegal activities, including fraud, and to
                enforce our terms of use or for any other offer or marketing
                campaign as the case may be.
              </p>
            </section>
            <section id="sharing-with-third-party" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                4. Sharing with Third-Party
              </h2>
              <p className={paragraphClass}>
                I. Exopods provide a simple, scalable deployment tool for any
                web app. Whether you’re building a backend, frontend, or
                deploying open-source apps to the cloud, Exopods enables instant
                deployments directly from GitHub, making your development
                workflow seamless and efficient. From third-party services,
                including through features that allow you to link your account
                on Exopods with an account on a third party service, such as
                GitHub using multiple keys project keys for their APIs. They are
                governed by their own API  policies By using one of these tools,
                you agree that Exopods may transfer that information to and from
                the applicable third party service. Third party services are not
                under Exopods' control, and Exopods is not responsible for any
                third party service’s use of your exported information. The
                Service may also contain links to third party websites. Linked
                websites are not under Exopods’s control, and Exopods is not
                responsible for their content. These third party services are
                governed by their own Terms of Service and Privacy Policies (Eg:
                Google Privacy Policy). If you choose to send your Workflow
                Repos to Production, you are agreeing to be bound by the GitHub
                Terms of Service, and Privacy Policy when connecting your
                Exopods account to your GitHub channel. You may review and
                revoke access to your channel via GitHub's security settings
                page.
              </p>
              <p className={paragraphClass}>
                We do not share your information with any third parties unless
                required to do so by any statutory authorities under any law in
                force. However, we disclose certain information to some third
                parties as duly displayed on our website.
              </p>
              <p className={paragraphClass}>
                In addition, if you access our website through any intermediate
                website, the cookies of such website may be accessing certain
                information at the source level over which we have no control.
              </p>
              <p className={paragraphClass}>
                System Communication & Transactional Emails- We use Sendgrid,
                Intercom and Mixpanel as our transactional email providers. The
                emails we send from the services use such t
              </p>
            </section>
            <section id="information-that-cannot-be-uploaded" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                5. Information that cannot be uploaded
              </h2>
              <p className={paragraphClass}>
                While using the Services, you shall not host, display, upload,
                modify, publish, transmit, update or share any information on to
                the Services that:
              </p>
              <p className={paragraphClass}>
                I. belongs to another person and to which you do not have any
                right to;
              </p>
              <p className={paragraphClass}>
                II. is grossly harmful, harassing, blasphemous defamatory,
                obscene, pornographic, paedophilic, libelous, invasive of
                another’s privacy, hateful, or racially, ethnically
                objectionable, disparaging, relating or encouraging money
                laundering or gambling, or otherwise unlawful in any manner
                whatever.
              </p>
              <p className={paragraphClass}>III. harms minors in any way;</p>
              <p className={paragraphClass}>
                IV.  infringes any patent, trademark, copyright or other
                proprietary rights;
              </p>
              <p className={paragraphClass}>
                V. violates any law for the time being in force;
              </p>
              <p className={paragraphClass}>
                VI. deceives or misleads the addressee about the origin of such
                messages or communicates any information which is grossly
                offensive or menacing in nature;
              </p>
              <p className={paragraphClass}>
                VII. impersonates another person;
              </p>
              <p className={paragraphClass}>
                VIII. contains software viruses or any other computer code,
                files or programs designed to interrupt, destroy or limit the
                functionality of any computer resource;
              </p>
              <p className={paragraphClass}>
                IX. threatens the unity, integrity, defense, security or
                sovereignty of India, friendly relations with foreign states, or
                public order or causes incitement to the commission of any
                cognizable offence or prevents investigation of any offence or
                is insulting any other nation.
              </p>
            </section>
            <section id="your-controls-and-choices" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                6. Your Controls and Choices
              </h2>
              <p className={paragraphClass}>
                You can control your choices regarding our collection, use and
                sharing of your information. In accordance with local law, your
                controls and choices may include:
              </p>
              <p className={paragraphClass}>
                I. You may correct, update and delete your account;
              </p>
              <p className={paragraphClass}>
                II. You may change your choices for subscriptions, product
                emails and alerts;
              </p>
              <p className={paragraphClass}>
                III. You may request access to the personal information we hold
                about you and that we shall amend or delete it and we shall
                request third parties with whom we have shared the information
                do the same. Once you place a request to delete the personal
                information, we shall take all reasonable steps taking into
                account available technology and the means available to us,
                including technical measures to erase the personal information.
              </p>
              <p className={paragraphClass}>
                IV. You may choose whether we share your personal information
                with other companies so they can send you offers and promotions
                about their products and services;
              </p>
              <p className={paragraphClass}>
                V. You may choose whether to receive targeted advertising from
                many ad networks, data exchanges, marketing analytics and other
                service providers;
              </p>
              <p className={paragraphClass}>
                Further, you may exercise your right to data portability, which
                means that you have the right to receive the Personal
                Information processed about you in a structured, commonly used
                and machine-readable i.e. HTML format. Please note that some of
                the rights above only may be exercised in certain situations,
                e.g. the right to data portability, which only applies when the
                processing is carried out on the basis of an agreement or a
                consent and if the processing is carried out by automated means.
                In case you have any questions regarding how we process your
                Personal Information, want to exercise any of your rights or
                want to know more about the rights, you may contact us as
                indicated below.
              </p>
              <p className={paragraphClass}>
                E-mail address: support@exopods.com
              </p>
              <p className={paragraphClass}>
                You may exercise your controls and choices, or request access to
                your personal information, by contacting support@exopods.com or
                following instructions provided in communications sent to you.
                You may request access to the personal information we hold about
                you and that we amend or delete it and we request third parties
                with whom we have shared the information do the same. Once you
                place a request to delete the personal information, we shall
                take all reasonable steps taking into account available
                technology and the means available to us, including technical
                measures to erase the personal information. If you have
                questions regarding the specific personal information about you
                that we process or retain, please contact our grievance officer
                mentioned in clause 11.
              </p>
              <p className={paragraphClass}>
                You agree to receive marketing information from us. If you do
                not want us to process your Personal Information for direct
                marketing, you can give written notice thereof to us.
              </p>
            </section>
            <section id="how-long-is-the-data-kept" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                7. How long is the data kept?
              </h2>
              <p className={paragraphClass}>
                We will keep Personal Information regarding you only as long as
                it is necessary, having regard to the purpose of the processing.
                This means that Personal Information collected and processed
                will be stored for as long as you have an account and required
                by law.
              </p>
              <p className={paragraphClass}>
                We will also, during the same period, keep your account
                information, we may store data for longer if required by law or
                if required in our legal interests, for example if there are
                ongoing legal proceedings.
              </p>
            </section>
            <section id="data-security-and-integrity" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                8. Data Security and Integrity
              </h2>
              <p className={paragraphClass}>
                The security, integrity and confidentiality of your Personal
                Information are extremely important to us. We have implemented
                technical, administrative and physical security measures that
                are designed to protect guest information from unauthorized
                access, disclosure, use and modification. From time to time, we
                review our security procedures to consider appropriate new
                technology and methods. Please be aware though that, despite our
                best efforts, no security measures are perfect or impenetrable.
                We limit access to personal information about you to employees
                who we believe reasonably need to come into contact with that
                information to be provided.
              </p>
              <p className={paragraphClass}>
                However, we may be required to share the aforesaid Personal
                Information with government authorities and agencies for the
                purposes of verification of identity or for prevention,
                detection, investigation including cyber incidents, prosecution
                and punishment of offences. You agree and consent for us to
                disclose your information, if so required under the applicable
                law.
              </p>
              <p className={paragraphClass}>
                All interactions with our Services use the Transport Layer
                Security/Secure Sockets Layer (TLS/SSL) protocol.
              </p>
              <p className={paragraphClass}>
                All data is encrypted via SSL/TLS when transmitted from our
                servers to your browser. The database backups are also
                encrypted. Except for your password, data isn’t encrypted while
                it’s live in our database (since it needs to be ready to send to
                you when you need it).
              </p>
              <p className={paragraphClass}>
                All data that we store in our log files or send to third party
                software that we use to analyze errors with the Software is
                anonymized and no personal identifiable information is sent to
                them.
              </p>
              <p className={paragraphClass}>
                We use Stripe for payment, analytics, and other business
                services. Stripe collects identifying information about the
                devices that connect to its services. Stripe uses this
                information to operate and improve the services it provides to
                us, including fraud detection. You can learn more about Stripe
                and read its privacy policy at https://stripe.com/in/privacy.
              </p>
            </section>
            <section
              id="data-transfers-storage-and-processing-globally"
              className="mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                9. Data Transfers, Storage and Processing Globally
              </h2>
              <p className={paragraphClass}>
                We have plans to operate globally and may transfer your Personal
                Information and Sensitive Personal Information to third parties
                in locations around the world for the purposes described in this
                privacy policy. Wherever your personal information is
                transferred, stored or processed by us, we will take reasonable
                steps to safeguard the privacy of your personal information. By
                accepting this Privacy Policy, you hereby explicitly provide
                your consent and grant us the right to transfer your Personal
                Information and Sensitive Personal Information to third parties.
              </p>
            </section>
          <section id="changes-to-this-privacy-policy" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">10. Changes to this Privacy Policy</h2>
            <p className={paragraphClass}>
            From time to time, we may change this privacy policy to accommodate new technologies, industry practices, regulatory requirements or for other purposes. We shall provide notice to you through the contact details provided to us by you
            </p>
          </section>
          <section id="contact-in-case-of-grievances" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">11. Contact in case of grievances</h2>
            <p className={paragraphClass}>
            support@exopods.com is the data controller for the processing of your Personal Information handled by us. If you have any concerns about privacy please contact us with a thorough description and we will try to resolve the issue for you at the earliest.
            </p>
            <p className={paragraphClass}>
                Entity – Exopods Incorporation.
            </p>
            <p className={paragraphClass}>
                Contact Information:
            </p>
            <p className={paragraphClass}>    
                Name: Ashish Kumar Gupta
                <p>Email: support@exopods.com</p>
              </p>
            </section>
            <section id="comments-and-questions" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                12. Comments and Questions
              </h2>
              <p className={paragraphClass}>
                If you have a comment or question about this privacy policy,
                please contact us at support@exopods.com. Our Services may
                contain links to other sites not owned or controlled by us and
                we are not responsible for the privacy practices of those sites.
                We encourage you to be aware when you leave our Services and to
                read the privacy policies of other sites that may collect your
                personal information.
              </p>
            </section>
          <section id="what-are-cookies" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">13. What are cookies?</h2>
            <p className={paragraphClass}>
                Cookies are pieces of information that a website places on the hard drive of your computer when you visit the website. Cookies may involve the transmission of information from us to you and from you directly to us, to another party on our behalf, or to another party in accordance with its privacy policy. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. If you turn cookies off, you won’t have access to many features that make your guest experience more efficient and some of our services will not function properly.
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}>How do we use cookies?</span>
            </p>
            <p className={paragraphClass}>
                We collect information about your activity on our Services using tracking technologies such as cookies, flash cookies and web beacons. We use two types: persistent cookies and session cookies. A persistent cookie helps us recognize you as an existing user, so it’s easier to return to the Services or interact with our Services without signing in again. After you sign in, a persistent cookie stays in your browser and will be read by us when you return to one of our products. Session cookies only last for as long as the session (usually the current visit to a website or a browser session). This tracking data is used for many purposes including, for example, to:
            </p>
            <p className={paragraphClass}>
             <ul className={paragraphClass} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
              <span style={{ color: 'white' }}>Authentication</span>: If you’re signed in to the Services, cookies help us show you the right information and personalize your experience.
                </li>
             <li>
              <span style={{ color: 'white' }}>Security</span>: We use cookies to enable and support our security features, and to help us detect malicious activity and violations of our Terms of Use.
                </li>
             <li>
              <span style={{ color: 'white' }}>Preferences, Features and Services</span>: Cookies can tell us what your communications and product preferences are.
             </li>
                <li>
             <span style={{ color: 'white' }}>Performance, Analytics and Research</span>: Cookies help us learn how well our site and plugins perform in different locations. We also use cookies to understand, improve, and research products, features, and services, including when you access our Services from other websites, applications, or devices such as your work computer or your mobile device.
                </li>
             </ul>
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}>
                Controlling Cookies</span>
            </p>
            <p className={paragraphClass}>
            
                While you may block and/or limit our access to cookies, if you limit the ability of websites to set cookies, if may affect your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
            </p>
            <p className={paragraphClass}>
                <span style={{ color: 'white' }}>
                Definitions:-</span>
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}>Anonymous Information</span>: Anonymous information means information that does not directly or indirectly identify, and cannot reasonably be used to identify, an individual guest.
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}>
                IP address</span>: An IP address is associated with the access point through which you enter the Internet, and is typically controlled by your Internet Service Provider (ISP), your company, or your university. We may use IP addresses to collect information regarding the frequency with which our guests visit various parts of our products hosting our Services, and we may combine IP addresses with personal information.
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}>Notices</span>: Notices will be sent by email to you at the last email address you provided us, by posting notice of such changes in our Services, or by other means, consistent with applicable law.
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}>Personal information</span>: Personal information means and includes information that identifies (whether directly or indirectly) and Sensitive Personal Information of a person by reference to an identifier such as a name, an identification number, location data including postal address or an online identifier to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of such person. When anonymous information is directly or indirectly associated with personal information, this anonymous information also is treated as personal information.
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}> Public Forums</span>: Our Services may offer message boards, conversation pages, blogs, chat rooms, social community environments, profile pages, and other forums that do not have a restricted audience. If you provide personal information when you use any of these features, that personal information may be publicly posted and otherwise disclosed without limitation as to its use by us or by a third party.
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}> Sensitive Personal Information</span>: Sensitive Personal Information shall have the meaning ascribed to it under the applicable law and is presently defined to mean such personal information which consists of information relating to
            </p>
            <p className={paragraphClass}>
            <ul className={paragraphClass} style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>passwords;</li>
            <li>financial information such as bank accounts or credit card or debit card or other payment instrument details;</li>
            <li>physical, physiological and mental health conditions;</li>
            <li>sexual orientation; (v) medical records and history;</li>
            <li>Biometric information;</li>
            <li>any detail relating to the above clauses as provided to body corporate for providing service; and</li>
            <li>any of the information received under above clauses by body corporate for processing, stored or processed under lawful contract or otherwise; provided that any information that is freely available or accessible in public domain or furnished under the Right to Information Act, 2000 or any other law for the time being in force shall not be regarded as sensitive personal information.</li>
            </ul>
            </p>
            <p className={paragraphClass}>
            <span style={{ color: 'white' }}>Company Name as registered</span>: Exopods, Inc.
            <p>
            <span style={{ color: 'white' }}>Company Address</span>: Unit 12-2753, 701 Tillery Street , Austin, Texas 78702, United States</p>
            <p>
            <span style={{ color: 'white' }}>Effective Date you started Exopods</span>: 1st-August-2024</p>
            <p>
            <span style={{ color: 'white' }}>A company email id</span>: support@exopods.com</p>
            <p>
            <span style={{ color: 'white' }}>Do you have any refund policy, please mention it</span>: NO</p>
            <p>
            <span style={{ color: 'white' }}>Are you also using any third-party end-user/API on your product that you must mention to a user?</span>: Stripe</p>
            <p>
            <span style={{ color: 'white' }}>Payment Gateway agreement or which platform and there T&C</span>: Stripe</p>
            </p>
          </section>
     </div>
    </div>
    </div>
    <Footer />
 </>
  );
}

export default PrivacyPolicy;
