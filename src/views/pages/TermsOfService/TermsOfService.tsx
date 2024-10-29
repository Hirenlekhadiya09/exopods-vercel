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
      className={`inline-block px-2 py-1 transition-all duration-300 rounded-lg ${
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

  return (
    <nav className="w-full md:w-1/3 h-screen md:h-screen mb-8 md:mb-0 md:sticky md:top-[120px] bg-transparent overflow-y-auto scrollbar-hidden">
      <ul className="space-y-4 text-sm md:text-base">
        <li>
          <SidebarItem
            id="introduction"
            label="Introduction and Acceptance"
            isActive={activeSection === "introduction"}
            onClick={() => handleClick("introduction")}
          />
        </li>
        <li>
          <SidebarItem
            id="customer-content"
            label="Customer Content, Cloud Services"
            isActive={activeSection === "customer-content"}
            onClick={() => handleClick("customer-content")}
          />
        </li>
        <li>
          <SidebarItem
            id="changes-to-terms"
            label="Changes to Terms"
            isActive={activeSection === "changes-to-terms"}
            onClick={() => handleClick("changes-to-terms")}
          />
        </li>
        <li>
          <SidebarItem
            id="plans-and-subscriptions"
            label="Exopods Plans and Subscriptions"
            isActive={activeSection === "plans-and-subscriptions"}
            onClick={() => handleClick("plans-and-subscriptions")}
          />
        </li>
        <li>
          <SidebarItem
            id="access-to-services"
            label="Access to the Services & Results"
            isActive={activeSection === "access-to-services"}
            onClick={() => handleClick("access-to-services")}
          />
        </li>
        <li>
          <SidebarItem
            id="customer-details"
            label="Customer Details and Deploy Guidelines"
            isActive={activeSection === "customer-details"}
            onClick={() => handleClick("customer-details")}
          />
        </li>
        <li>
          <SidebarItem
            id="third-party-services"
            label="Third-Party Services and Products"
            isActive={activeSection === "third-party-services"}
            onClick={() => handleClick("third-party-services")}
          />
        </li>
        <li>
          <SidebarItem
            id="disclaimers"
            label="Disclaimers"
            isActive={activeSection === "disclaimers"}
            onClick={() => handleClick("disclaimers")}
          />
        </li>
        <li>
          <SidebarItem
            id="indemnification"
            label="Indemnification"
            isActive={activeSection === "indemnification"}
            onClick={() => handleClick("indemnification")}
          />
        </li>
        <li>
          <SidebarItem
            id="limitation-on-liability"
            label="Limitation on Liability"
            isActive={activeSection === "limitation-on-liability"}
            onClick={() => handleClick("limitation-on-liability")}
          />
        </li>
        <li>
          <SidebarItem
            id="payments"
            label="Payments, Cancellations"
            isActive={activeSection === "payments"}
            onClick={() => handleClick("payments")}
          />
        </li>
        <li>
          <SidebarItem
            id="terms-and-termination"
            label="Terms and Termination"
            isActive={activeSection === "terms-and-termination"}
            onClick={() => handleClick("terms-and-termination")}
          />
        </li>
        <li>
          <SidebarItem
            id="entire-agreement"
            label="Entire Agreement"
            isActive={activeSection === "entire-agreement"}
            onClick={() => handleClick("entire-agreement")}
          />
        </li>
        <li>
          <SidebarItem
            id="jurisdiction"
            label="Jurisdiction"
            isActive={activeSection === "jurisdiction"}
            onClick={() => handleClick("jurisdiction")}
          />
        </li>
        <li>
          <SidebarItem
            id="severability"
            label="Severability"
            isActive={activeSection === "severability"}
            onClick={() => handleClick("severability")}
          />
        </li>
        <li>
          <SidebarItem
            id="no-partnership"
            label="No Partnership"
            isActive={activeSection === "no-partnership"}
            onClick={() => handleClick("no-partnership")}
          />
        </li>
        <li>
          <SidebarItem
            id="force-majeure"
            label="Force Majeure"
            isActive={activeSection === "force-majeure"}
            onClick={() => handleClick("force-majeure")}
          />
        </li>
      </ul>
    </nav>
  );
};

function TermsOfService() {
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
              Terms of Service
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row mt-16">
          <Sidebar />
        <div className="w-full md:w-2/3 md:ml-8">
          <section id="introduction" className="mb-12">
            <h2 className=" text-2xl sm:text-3xl font-semibold mb-4">1. Introduction and Acceptance</h2>
            <p className={paragraphClass}>
              These terms of use (hereinafter referred to as the “Terms”) set forth the legally binding terms and conditions which govern the access to and use of any websites, mobile sites, mobile applications, products or services under the umbrella of “Exopods”, a simple, scalable deployment platform available at https://www.exopods.com/ (collectively referred to as the “Software as a Service”) offered by Exopods, Inc. The terms “Customer”, “you”, “your” shall refer to any natural person or entity and its authorized users that subscribes to or uses the Services. Certain features of the Services may be subject to additional guidelines, terms, or rules which are incorporated by reference into these Terms.
            </p>
            <p className={paragraphClass}>
              By accessing or using the Services, you are accepting these Terms (on behalf of yourself or the entity / individual that you may represent) and you represent and warrant that you have the right, authority, and capacity to enter into these Terms (on behalf of yourself or the entity/individual that you may represent). You may not access or use the Services or accept the Terms if you are not at least 13 (thirteen) years old. If you are under 18 (eighteen), you must have your parent or legal guardian’s permission to use the Services.
            </p>
            <p className={paragraphClass}>
              Furthermore, it is agreed that any past or present claims relating to these Terms or the use of the Services shall be resolved through an informal dispute resolution process or through final and binding arbitration, as more particularly mentioned hereinbelow under section 15 of these Terms.
            </p>
            <p className={paragraphClass}>
              If you do not agree with all of the provisions of these Terms, do not access and/or use the Services.
            </p>
          </section>
          <section id="customer-content" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">2. Customer Content, Cloud Services</h2>
            <p className={paragraphClass}>
            2.1. “Customer Content” shall mean any and all information and content (including but not limited to text, images, photos, videos, audio, reviews, comments and documents) that a Customer provides or makes available to Exopods in connection with the use of the Services. 
            </p>
            <p className={paragraphClass}>
              2.2. “Result” shall refer to the content created, generated and returned by the Services based on the Customer Content. 
            </p>
            <p className={paragraphClass}>
              2.3. Exopods also offers deployment tool services as a part of its Services (“Cloud Platform As A Service”) which allows you to create production workflows, GitHub repos creation, real-time third-party collaboration, docker deployment, web-app deployment, or any GitHub repo deployment, add SSH, create your own domain links, and/or other similar materials, hereinafter referred to as “Cloud Platform As A Service”.
            </p>     
            </section>
            <section id="changes-to-terms" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                3. Changes to Terms
              </h2>
              <p className={paragraphClass}>
                Exopods reserves the right from time to time and at its sole and
                absolute discretion, to make any changes/ modifications/
                additions/ deletions to these Terms as may be necessary
                (“Revised Terms”). It is your responsibility to ensure that you
                are aware of the Revised Terms, by visiting this page regularly.
                Any continued use of these Services after the Revised Terms have
                been published constitute a valid and binding acceptance by you
                of such Revised Terms.
              </p>
            </section>
            <section id="plans-and-subscriptions" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                4. Exopods Plans and Subscriptions
              </h2>
              <p className={paragraphClass}>
                4.1. Account creation: In order to use all or certain features
                of the Services, you must register for an account (“Account”)
                and provide certain information as prompted by the account
                registration form. You represent and warrant that: (a) all
                required registration information you submit is truthful and
                accurate; and (b) you will maintain the accuracy of such
                information. You may delete your Account at any time, for any
                reason, by following the instructions on the Services. Exopods
                reserves the right to suspend or terminate your Account in
                accordance with section 13.
              </p>
              <p className={paragraphClass}>
                4.2. Responsibilities: You are responsible for maintaining the
                confidentiality and security of your Account, including but not
                limited to the information you have provided, and you are solely
                responsible for all activities that occur under your Account.
                You agree to immediately notify Exopods of any unauthorized use
                or suspected unauthorized use of your Account or any other
                breach of security. Exopods cannot and will not be liable for
                any loss or damage arising from your failure to comply with the
                above requirements.
              </p>
              <p className={paragraphClass}>
                4.3. Account types: We currently offer a free account with
                limited functionality (“Free Account”) and various fee-bearing
                accounts offering feature enhancements (“Paid Subscriptions”).
              </p>
            </section>
            <section id="access-to-services" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                5. Access to the Services & Results
              </h2>
              <p className={paragraphClass}>
                5.1. License: Subject to these Terms, Exopods grants you a
                royalty-free, perpetual, irrevocable, worldwide, non-exclusive
                license to use, sub-license, reproduce, modify, adapt, publish,
                translate, create derivative works from, distribute, derive
                revenue or other remuneration from, and communicate to the
                public, perform and display your Result (in whole or in part)
                worldwide and/or to incorporate it in other works in any form,
                media or technology now known or later developed. Exopods also
                grants you a non-transferable, non-exclusive, revocable, limited
                license to use and access the Services in accordance with
                section 13.
              </p>
              <p className={paragraphClass}>
                5.2. Certain Restrictions: The rights granted to you in these
                Terms are subject to the following restrictions: (a) you shall
                not attempt to reverse engineer, de-compile, hack, disable,
                interfere with, disassemble, copy, or disrupt the integrity or
                the performance of the Services, any third-party use of the
                Services, or any third-party data contained therein (except to
                the extent such restrictions are prohibited by applicable law);
                and (b) you shall not access the Services in order to build a
                competitive product or service or copy any ideas, features,
                functions, or graphics of the Services. Unless otherwise
                indicated, any future release, update, or other addition to
                functionality of the Services shall be subject to these Terms.
              </p>
              <p className={paragraphClass}>
                5.3. Modification: Exopods reserves the right, at any time, to
                modify, suspend, or discontinue the Services (in whole or in
                part) with or without notice to you. You agree that Exopods will
                not be liable to you or to any third party for any modification,
                suspension, or discontinuation of the Services or any part
                thereof.
              </p>
              <p className={paragraphClass}>
                5.4. No support or maintenance: You acknowledge and agree that
                Exopods will have no obligation to provide you with any support
                or maintenance in connection with the Services.
              </p>
              <p className={paragraphClass}>
                5.5. Ownership: You acknowledge that all the intellectual
                property rights, including copyrights, patents, trademarks, and
                trade secrets, in the Services are owned by Exopods or its
                suppliers. Neither these Terms (nor your access to the Services)
                transfers to you or any third party any rights, title or
                interest in or to such intellectual property rights, except for
                the limited access rights expressly set forth in section 5.1.
                Exopods and its suppliers reserve all rights not granted in
                these Terms, and there are no implied licenses granted under
                these Terms.
              </p>
            </section>
            <section id="customer-details" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                6. Customer Details and Deploy Guidelines
              </h2>
              <p className={paragraphClass}>
                6.1. Customer Details and Deployment Guidelines: You are solely
                responsible for your Customer Content and any production done
                using your Customer Content, or any Customer Content which has
                been provided or generated using your Account by any affiliate/
                entity/ representative which you may be related to. You assume
                all risks associated with use of your Customer Content,
                including any reliance on its accuracy, completeness or
                usefulness by others, or any disclosure of your Customer
                Content, that personally identifies you or any third party. You
                hereby represent and warrant that your Customer Content will not
                violate our Acceptable Use Policy (defined hereinbelow). You may
                not represent or imply to others that your Customer Content is
                in any way provided, sponsored or endorsed by Exopods. Exopods
                is not obligated to backup any Customer Content, and the same
                may be deleted at any time without prior notice. You are solely
                responsible for creating and maintaining your own backup copies
                of your Customer Content if you desire.
              </p>
              <p className={paragraphClass}>
                6.2. Right to Use Your Customer Content: You hereby grant (and
                you represent and warrant that you have the right to grant) to
                Exopods an irrevocable, perpetual, non-exclusive, royalty-free
                and fully paid, worldwide license (with the right to sublicense)
                to access, use, reproduce, electronically distribute, transmit,
                perform, format, display, store, archive, and index the Customer
                Content/ Results created using your Customer Content for the
                purpose of supporting your use of the Services and providing
                Services to you. We may also use Customer Content for the
                purpose of supporting and developing and further improving the
                Services. This term and the rights and licenses granted
                hereunder do not apply to enterprise customers, who are subject
                to a separate set of terms and conditions specifically tailored
                to enterprise agreements.
              </p>
              <p className={paragraphClass}>
                6.3. Acceptable Use Policy: The following terms constitute our
                “Acceptable Use Policy”:
              </p>
              <p className={paragraphClass}>
                6.3.1. You agree not to use the Services to collect, upload,
                transmit, display, or distribute any Customer Content (i) that
                violates any third-party right, including any copyright,
                trademark, patent, trade secret, moral right, privacy right,
                right of publicity, or any other intellectual property or
                proprietary right; (ii) that is unlawful, harassing, abusive,
                tortious, threatening, harmful, invasive of another’s privacy,
                vulgar, defamatory, false, intentionally misleading, trade
                libelous, pornographic, obscene, patently offensive, promotes
                racism, bigotry, hatred, or physical harm of any kind against
                any group or individual or is otherwise objectionable; (iii)
                that is harmful to minors in any way; (iv) that is in violation
                of any law, regulation, statute, ordinance, rule, judgement,
                rule of law, order, decree, clearance, approval, directive,
                guideline, policy, requirement, or other governmental
                restriction or any similar form of decision of, or determination
                by, or any interpretation or administration of any of the
                foregoing by, any governmental authority; or (v) that adversely
                impacts an individual’s legal rights or otherwise which creates
                or modifies a binding, enforceable obligation. 
              </p>
              <p className={paragraphClass}>
                6.3.2. In addition, you agree not to: (i) upload, transmit, or
                distribute to or through the Services any computer viruses,
                worms, or any software intended to damage or alter a computer
                system or data; (ii) send through the Services unsolicited or
                unauthorized advertising, promotional materials, junk mail,
                spam, chain letters, pyramid schemes, or any other form of
                duplicative or unsolicited messages, whether commercial or
                otherwise; (iii) use the Services to harvest, collect, gather or
                assemble information or data regarding other Customers,
                including email addresses, without their consent; (iv) interfere
                with, disrupt, or create an undue burden on servers or networks
                connected to the Services, or violate the regulations, policies
                or procedures of such networks; (v) attempt to gain unauthorized
                access to the Services (or to other computer systems or networks
                connected to or used together with the Services); or (vi) harass
                or interfere with any other Customer’s use and enjoyment of the
                Services.
              </p>
              <p className={paragraphClass}>
                6.4. Enforcement: We reserve the right (but have no obligation)
                to review any Customer Content, and to investigate and/or take
                appropriate action against you in our sole discretion if you
                violate the Acceptable Use Policy or any other provision of
                these Terms or otherwise create liability for us or any other
                person. Such action may include removing or modifying your
                Customer Content, terminating your Account in accordance with
                Section 13, and/or taking appropriate action in accordance with
                applicable law, such as reporting you to law enforcement
                authorities.
              </p>
              <p className={paragraphClass}>
                6.5. Feedback: If you provide Exopods with any feedback, reviews
                or suggestions regarding the Services (“Feedback”), you hereby
                assign to Exopods all rights in such Feedback and you hereby
                irrevocably and unconditionally waive any and all intellectual
                property rights or moral rights you may have in such Feedback.
                You hereby agree that Exopods shall have the right to fully use
                your Feedback for the purpose of supporting and developing and
                further improving the Services. Furthermore, Exopods shall have
                the absolute right and discretion to utilise your Feedback for
                marketing/ promoting/ advertising Exopods and/ or the Services
                in any media formats and through any media channels, whether now
                known or existing in the future throughout the world, without
                Exopods seeking further permission from you. Exopods will treat
                any Feedback you provide to Exopods as non-confidential and
                non-proprietary. You agree that you will not submit to Exopods
                any information or ideas that you consider to be confidential or
                proprietary.
              </p>
            </section>
            <section id="third-party-services" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                7. Third-Party Services and Products
              </h2>
              <p className={paragraphClass}>
                7.1. Exopods provides tools through the Services that enable you
                to import and export information, including Customer Content, to
                and from third party services, including through features that
                allow you to link your account on Exopods with an account on a
                third party service (such as GitHub) using multiple project keys
                for their application programming interface (“API”). These third
                party services are governed by their own API policies. By using
                one of these tools, you agree that Exopods may transfer that
                information to and from the applicable third party service.
                Third party services are not under Exopods’s control, and
                Exopods is not responsible for any third party service’s use of
                your exported information. The Service may also contain links to
                third party websites, and such linked websites are not under
                Exopods’s control, and Exopods is not responsible for their
                content. These third party services are governed by their own
                terms of service and privacy policies (eg: Google Privacy
                Policy). 
              </p>
              <p className={paragraphClass}>
                7.2. Third-Party Services: You acknowledge that the Service will
                enable or assist you to access, interact with, and/or purchase
                services from several supported platforms and other third
                parties via third-party websites or applications (collectively,
                “Third-Party Services”). Such Third-Party Services are not under
                the control of Exopods and Exopods does not review, approve,
                monitor, endorse, warrant, or make any representations with
                respect to Third-Party Services and is not responsible for any
                Third-Party Services. You use all Third-Party Services at your
                risk and discretion and Exopods shall not be liable for any
                interaction/ decision/ contract/ arrangement/ service you have
                availed from such Third-Party Service or on the basis of such
                Third-Party Service. Any use of Third-Party Services is governed
                solely by the terms and conditions of such Third-Party Services
                and any contract entered into, or any transaction completed via
                any Third-Party Services, is between you and the relevant third
                party, and not with Exopods. You shall comply in all respects
                with all applicable terms of the Third-Party Services that you
                access or subscribe to in connection with the Services. If at
                any time any Third-Party Services cease to make their programs
                available to us on reasonable terms, we may cease to provide
                such features to you without entitling you to any notice,
                refund, credit, or other compensation. 
              </p>
              <p className={paragraphClass}>
                7.3. Other Customers: Each Customer is solely responsible for
                any and all of its own Customer Content. Because we do not
                control Customer Content, you acknowledge and agree that we are
                not responsible for any Customer Content, whether provided by
                you or by others. Exopods is not liable or responsible for any
                Customer Content that you may view/ access while using the
                Services, including the accuracy, currency, suitability, or
                quality of any such Customer Content/ Result. Furthermore, your
                interactions with other Customers are solely between you and
                such Customers, and Exopods will not be responsible for any loss
                (including monetary loss), damage and/ or any reputational harm
                incurred as the result of any such interactions. If there is a
                dispute between you and any Customer, we are under no obligation
                to become a party to such dispute or provide any information/
                testimony in relation to such dispute, save and except as may be
                mandated by a court of law. Please note that Other Customers may
                search for, see, use, modify and reproduce any of your Customer
                Content that you submit to any “Public” area of the Services.
                Exopods is not liable for the disclosure of your Confidential
                Information due to your failure to secure these settings.You
                warrant that the holder of any worldwide intellectual property
                right, in your Customer Content, has completely and effectively
                waived all such rights and validly and irrevocably granted to
                you the right to grant the license stated above.
              </p>
              <p className={paragraphClass}>
                7.4. Release: You hereby release and forever discharge Exopods
                (and our officers, affiliates, partners, employees, agents,
                successors, and assigns) from, and hereby waive and relinquish
                each and every past, present and future dispute, claim,
                controversy, demand, right, obligation, liability, action and
                cause of action of every kind and nature (including personal
                injuries, death, and property damage) that has arisen or arises
                directly or indirectly out of, or that relates directly or
                indirectly to, the Services (including any interactions with, or
                act or omission of, other Customers or any Third-Party Services
                and products).
              </p>
            </section>
            <section id="disclaimers" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                8. Disclaimers
              </h2>
              <p className={paragraphClass}>
                WE (AND OUR SUPPLIERS WHO PROVIDE THIRD-PARTY SERVICES) MAKE NO
                WARRANTY THAT THE SERVICES AND/OR RESULTS WILL MEET YOUR
                REQUIREMENTS, WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY,
                SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, FREE
                OF VIRUSES OR OTHER HARMFUL CODE, COMPLETE, LEGAL, OR SAFE. IF
                APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT TO THE
                SERVICES AND/OR RESULTS, ALL SUCH WARRANTIES ARE LIMITED IN
                DURATION TO 90 (NINETY) DAYS FROM THE DATE OF FIRST USE. EXOPODS
                DISCLAIMS ANY AND ALL RESPONSIBILITY OR LIABILITY IN RELATION TO
                THE CONTENT MADE AVAILABLE THROUGH THE SERVICES, INCLUDING THE
                CUSTOMER CONTENT AND/ OR RESULTS, OR ANY CONTENT OR SERVICES
                PROVIDED BY THIRD-PARTY SERVICES. EXOPODS DOES NOT CONTROL OR
                VET CUSTOMER CONTENT AND IS NOT RESPONSIBLE FOR WHAT USERS POST,
                TRANSMIT, OR SHARE ON OR THROUGH THE SERVICES. EXOPODS IS NOT
                RESPONSIBLE OR LIABLE IN ANY MANNER FOR ANY THIRD-PARTY SERVICES
                ASSOCIATED WITH OR UTILIZED IN CONNECTION WITH THE SERVICES
                AND/OR RESULTS, INCLUDING THE FAILURE OF ANY SUCH THIRD-PARTY
                SERVICES OR SUPPORTED PLATFORMS.
              </p>
              <p className={paragraphClass}>
                IN NO EVENT WILL THE COMPANY (OR SUPPLIERS PROVIDING THIRD-PARTY
                SERVICES), ITS SUBSIDIARIES, OFFICERS, DIRECTORS, EMPLOYEES,
                SHAREHOLDERS OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT,
                INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL
                DAMAGES ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF,
                OR INABILITY TO USE, THE SERVICES, EVEN IF Exopods HAS BEEN
                ADVISED OF THE POSSIBILITY OF SUCH DAMAGES RESULTING FROM ANY
                (I) ERRORS, MISTAKES, OR INACCURACIES IN THE SERVICES, (II)
                PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
                RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (III) ANY
                UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY
                AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED
                THEREIN, (IV) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO
                OR FROM THE SERVICES, (V) ANY BUGS, VIRUSES, TROJAN HORSES, OR
                THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY
                ANY THIRD PARTY, (VI) ANY USE OF THIRD PARTY CONTENT AND/OR
                (VII) ANY ERRORS OR OMISSIONS OR FOR ANY LOSS OR DAMAGE OF ANY
                KIND INCURRED AS A RESULT OF YOUR USE OF THE SERVICES, WHETHER
                BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY,
                AND WHETHER OR NOT THE COMPANY IS ADVISED OF THE POSSIBILITY OF
                SUCH DAMAGES. THE FOREGOING LIMITATION OF LIABILITY APPLIES TO
                THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE
                JURISDICTION.
              </p>
              <p className={paragraphClass}>
                YOU AGREE THAT YOU WILL NOT HOLD THE COMPANY RESPONSIBLE OR
                LIABLE FOR ANY CONTENT YOU ACCESS THROUGH THE SERVICES AND YOU
                SPECIFICALLY ACKNOWLEDGE THAT THE COMPANY IS AND WILL NOT BE
                LIABLE FOR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY
                THIRD PARTY AND THAT THE RISK OF HARM OR DAMAGE FROM THE
                FOREGOING RESTS ENTIRELY WITH YOU.
              </p>
              <p className={paragraphClass}>
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED
                WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU. SOME
                JURISDICTIONS DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED
                WARRANTY LASTS, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
              </p>
            </section>
            <section id="indemnification" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                9. Indemnification
              </h2>
              <p className={paragraphClass}>
                9.1. You and/ or any entity/ individual who you may represent or
                may be represented by you (“Indemnifier”) agree to indemnify and
                hold harmless Exopods, its subsidiaries, officers, affiliates,
                partners, directors, employees, and agents (hereinafter
                collectively referred to as “Indemnified Parties”) from any and
                all claims, demands, obligations, losses, liabilities, costs or
                debt, and expenses (including but not limited to attorney's
                fees) made by any third party due to or arising out of (a)
                Indemnifier’s use of the Services and/or Results (b)
                Indemnifier’s violation of these Terms, (c) Indemnifier’s
                violation of applicable laws or regulations, (d) Indemnifier’s
                Customer Content/ Results, (e) Indemnifier’s use of Third-Party
                Services (f) Indemnifier’s violation of any third party right,
                including without limitation any intellectual property or
                privacy right, or (iv) your actions/ decisions which for any
                reason has prejudiced or materially/ adversely affected the
                Indemnified Parties. 
              </p>
              <p className={paragraphClass}>
                9.2. Exopods reserves the right, at the Indemnifier’s expense,
                to assume the exclusive defense and control of any matter for
                which the Indemnifier is required to indemnify us, and the
                Indemnifier agrees to cooperate with our defense of these
                claims. The Indemnifier agrees not to settle any matter without
                the prior written consent of Exopods.
              </p>
              <p className={paragraphClass}>
                9.3. Any claim made by the Indemnified Parties hereunder shall
                be conclusive evidence that such claim has arisen and the notice
                given by the Indemnified Parties shall be conclusive proof of
                the amount payable by the Indemnifier towards their indemnity
                obligations. Further, prior to making any claim hereunder, the
                Indemnified Parties shall not be required to take any step, make
                any demand upon, exercise any remedies or obtain any judgment
                against the Indemnifier or any other person.
              </p>
              <p className={paragraphClass}>
                9.4. For the avoidance of doubt, it is clarified that the
                Indemnifier’s obligation to indemnify the Indemnified Parties
                pursuant to these Terms shall arise immediately upon the
                Indemnified Parties incurring or suffering any loss on
                institution of any claim, suit or action, irrespective of any
                defence or right to appeal available to them. The failure of the
                Indemnified Parties to notify the Indemnifier of a claim shall
                not relieve the Indemnifier of their indemnification obligations
                hereunder.
              </p>
              <p className={paragraphClass}>
                9.5. The rights of the Indemnified Parties to indemnification
                shall not be impacted or limited by any knowledge that the
                Indemnified Parties may have acquired, or would have acquired,
                whether before or after the date hereof, nor by any
                investigation or diligence conducted by the Indemnified Parties.
              </p>
              <p className={paragraphClass}>
                9.6. The indemnification rights of the Indemnified Parties under
                these Terms are without prejudice to, independent of, and in
                addition to, such other rights and remedies as the Indemnified
                Parties may have at law or in equity or otherwise, including the
                right to seek specific performance, rescission, restitution or
                other injunctive relief, none of which rights or remedies shall
                be affected or diminished hereby.
              </p>
            </section>
            <section id="limitation-on-liability" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                10. Limitation on Liability
              </h2>
              <p className={paragraphClass}>
                ACCESS TO, AND USE OF, THE SERVICES IS AT YOUR OWN DISCRETION
                AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO
                YOUR DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING
                THEREFROM. TO THE MAXIMUM EXTENT PERMITTED BY LAW,
                NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
                LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THIS
                AGREEMENT (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM
                OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF $
                50 (FIFTY US DOLLARS). THE EXISTENCE OF MORE THAN ONE CLAIM WILL
                NOT ENLARGE THIS LIMIT. 
              </p>
              <p className={paragraphClass}>
                WE SHALL NOT BE LIABLE TO YOU FOR ANY LOSS OR DAMAGE, WHETHER IN
                CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF STATUTORY DUTY,
                OR OTHERWISE, EVEN IF FORESEEABLE, ARISING UNDER OR IN
                CONNECTION WITH USE OF, OR INABILITY TO USE, OUR SERVICES; OR
                USE OF OR RELIANCE ON ANY CONTENT DISPLAYED ON OUR SERVICES.
              </p>
              <p className={paragraphClass}>
                PLEASE NOTE THAT WE SHALL NOT BE LIABLE FOR INDIRECT LOSS OR
                DAMAGE INCLUDING LOSS OF PROFITS, SALES, BUSINESS, OR REVENUE;
                BUSINESS INTERRUPTION; LOSS OF ANTICIPATED SAVINGS; LOSS OF
                BUSINESS OPPORTUNITY, GOODWILL, OR REPUTATION; OR ANY INDIRECT
                OR CONSEQUENTIAL LOSS OR DAMAGE.
              </p>
              <p className={paragraphClass}>
                WE SHALL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A VIRUS,
                DISTRIBUTED DENIAL-OF-SERVICE ATTACK, OR OTHER TECHNOLOGICALLY
                HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT,
                COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO
                YOUR USE OF OUR APPLICATIONS OR TO YOUR DOWNLOADING OF ANY
                CONTENT ON THEM, OR ON ANY WEBSITE LINKED TO THEM.
              </p>
              <p className={paragraphClass}>
                YOU AGREE THAT OUR SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND
                ARISING FROM OR RELATING TO THIS AGREEMENT.
              </p>
              <p className={paragraphClass}>
                SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF
                LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
                LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
              </p>
            </section>
            <section id="payments" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                11. Payments, Cancellations
              </h2>
              <p className={paragraphClass}>
                11.1. Subscription fees: Paid Subscriptions can be purchased
                directly from Exopods by paying a pay-as-you-go or monthly or
                yearly subscription fee. Subscriptions are billed in advance on
                a monthly or yearly basis and are non-refundable for the
                subscription period they are purchased for. You must provide us
                with a valid credit card or other payment method to pay the
                subscription fee. You agree that we may process your credit card
                or other valid payment method on each renewal term, on the
                calendar day corresponding to the first day you subscribed to
                the Paid Subscription.
              </p>
              <p className={paragraphClass}>
                11.2. Auto-renewal and cancellation: Your payment to Exopods
                will automatically renew at the end of the subscription period
                unless you cancel your Paid Subscription through your
                subscription page before the end of the current subscription
                period. The cancellation will take effect the day after the last
                day of the current subscription period, and you will be
                downgraded to a Free Account. You may cancel your Paid
                Subscription at any time.
              </p>
              <p className={paragraphClass}>
                11.3. Changes to subscription terms: We may change the price for
                the Paid Subscriptions from time to time, and will communicate
                any price changes to you in advance and, if applicable, how to
                accept those changes. Price changes for Paid Subscriptions will
                take effect at the start of the next subscription period
                following the date of the price change. As permitted by local
                law, you accept the new price by continuing to use the Services
                after the price change takes effect. If you do not agree with
                the price changes, you have the right to reject the change by
                unsubscribing from the Services prior to the price change going
                into effect. It is your obligation and responsibility to ensure
                that you read and understand any such notification of price
                changes.
              </p>
              <p className={paragraphClass}>
                11.4. Refunds: You may cancel your Exopods subscription at any
                time, and you will not be charged for the next billing cycle. In
                case you think payment has not been made by you, please reach
                out to us at support@exopods.com and we will respond to you
                within 48 (forty eight) working hours.
              </p>
            </section>
            <section id="terms-and-termination" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                12. Terms and Termination
              </h2>
              <p className={paragraphClass}>
                These Terms shall continue to apply to you until your Account is
                terminated by either you or Exopods, and you cease to use the
                Services. However, you acknowledge and agree that the perpetual
                license granted by you in relation to the Customer Content,
                including Feedback, is irrevocable and will therefore continue
                after expiry or termination of your Account and your
                discontinuation of using the Services for any reason. We may
                terminate your Account or suspend your access to the Services at
                any time, including in the event of your actual or suspected
                unauthorized use of the Services and/or Customer Content/
                Results, or non-compliance with these Terms. If you or Exopods
                terminate your Account, or if we suspend your access to the
                Services, you agree that we shall have no liability or
                responsibility to you and we will not refund any amounts that
                you have already paid, to the fullest extent permitted under
                applicable law. To learn how to terminate your Account, you may
                contact us through the customer service contact form, which is
                available on our support page. This section will be enforced to
                the extent permissible by applicable law. You may terminate your
                Account and cease to use our Services at any time. Any provision
                of these Terms which, either by its terms or to give effect to
                its meaning, must survive, and such other provisions which
                expressly, or by their nature, are intended to survive
                termination shall survive the expiration or termination of these
                Terms.
              </p>
            </section>
            <section id="entire-agreement" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                13. Entire Agreement
              </h2>
              <p className={paragraphClass}>
                These Terms constitute the entire agreement between the parties,
                and no other agreement, written or oral, precedes this agreement
                between you and Exopods. By using the Information on Exopods,
                you assume full responsibility for any and all gains and losses,
                financial, emotional or otherwise, experienced, suffered or
                incurred by you. Exopods does not guarantee the accuracy,
                completeness or timeliness of, or otherwise endorse in any way,
                the views, opinions or recommendations expressed through the use
                of our Services and/ or Third Party Services, and we do not
                provide investment advice, and do not advocate the purchase or
                sale of any security or investment by you or any other
                individual. Our Services are not intended to provide tax, legal
                or investment advice, which you should obtain from your
                professional advisor prior to making any investment of the type
                discussed in the Information. Our Services do not constitute a
                solicitation by the information providers, Exopods or any other
                person for the purchase or sale of securities. By using or
                accessing the Services, you confirm that you have read,
                understood, and agreed to be bound by these Terms.
              </p>
            </section>
            <section id="jurisdiction" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                14. Jurisdiction
              </h2>
              <p className={paragraphClass}>
              14.1. These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States of America.
              </p>
              <p className={paragraphClass}>
              14.2. Subject to section 14.4 below, you hereby consent to the jurisdiction of the courts and tribunals of Delaware in all disputes arising out of or relating to the use of the Services. Nothing contained in this section 14 shall limit the right of Exopods to take proceedings in any other court or tribunal of competent jurisdiction, nor shall the taking of proceedings in one or more jurisdictions preclude the taking of proceedings in any other jurisdiction, whether concurrently or not, and you hereby irrevocably submit to and accept, generally and unconditionally, the jurisdiction of such court or tribunal, and you irrevocably waive any objection you may have now or in the future to the laying of the venue of any proceedings and any claim that any such proceedings have been brought in an inconvenient forum.
              </p>
              <p className={paragraphClass}>
              14.3. You agree to resolve any dispute, controversy, claim, or disagreement of any kind whatsoever in connection with or arising out of the use of the Services, including in relation to a breach of these Terms or a suspension of your Account and prohibition of your use of these Services, or in relation to any complaint or dispute which you may have with Exopods and the Services offered (hereinafter referred to as a "Dispute") through an informal dispute resolution mechanism or through a settlement process with Exopods. A Dispute may be raised either by you or Exopods ("Claimant"). The Claimant must first send to the other a written notice of dispute ("Notice"), which must (a) include the Claimant's name, residence, email address, and phone number; (b) describe the nature and basis of the claim or dispute; and (c) set forth the specific relief sought. The recipient of the Notice shall be given 30 (thirty) days after receipt of a complete Notice to investigate the claim and/or to respond to such Notice. Any arbitration proceeding cannot be commenced until after the informal resolution period of 60 (sixty) days from the receipt of the Notice ("Informal Resolution Period"). It is hereby clarified that Exopods shall not be obligated to resolve any Dispute it may initiate through the process laid down in this section 14.3.
              </p>
              <p className={paragraphClass}>14.4. Dispute resolution:</p>
              <p className={paragraphClass}>
                14.4.1. At the end/ completion of the Informal Resolution Period
                any Dispute shall be referred to and finally resolved by
                arbitration irrespective of the amount in Dispute or whether
                such Dispute would otherwise be considered justifiable or ripe
                for resolution by any court.
              </p>
              <p className={paragraphClass}>
                14.4.2. The Parties agree and confirm that the arbitration
                proceedings shall be conducted in in accordance with the
                Arbitration & Conciliation Act, 1996 and the rules applicable
                thereto or any statutory modification or alteration thereof for
                the time being in force (“A & C Act”), irrespective of your
                place of residence and from where you have accessed the
                Services.
              </p>
              <p className={paragraphClass}>
                14.4.3. Seat and Venue of Arbitration: The venue of the
                arbitration shall be Haryana, India. The seat of the arbitration
                shall be Haryana, India and the arbitration proceedings shall be
                carried out in accordance with the A & C Act, which shall be
                deemed to have been incorporated to this section.
              </p>
              <p className={paragraphClass}>
                14.4.4. Number of Arbitrators: The number of arbitrators shall
                be 3 (three) wherein Exopods shall appoint 1 (one) arbitrator
                and you shall appoint 1 (one) arbitrator, which arbitrators
                shall be appointed within 30 (thirty) days of either you or
                Exopods serving a notice with respect to the Dispute. The 2
                (two) arbitrators so appointed shall appoint the 3rd (third)
                arbitrator within 30 (thirty) days of their appointment, who
                shall act as the presiding arbitrator.
              </p>
              <p className={paragraphClass}>
                14.4.5. Language of Arbitration: The proceedings of the
                arbitration shall be conducted in English language.
              </p>
              <p className={paragraphClass}>
                14.4.6. Time: The arbitral tribunal shall render its final award
                within 6 (six) months from the date of appointment of the
                complete arbitral tribunal unless it is agreed that such limit
                be extended. 
              </p>
              <p className={paragraphClass}>
                14.4.7. Award and Apportionment of Costs: The award rendered
                shall be in writing and shall set out the reasons for the
                arbitral tribunal's decision. The costs and expenses of the
                arbitration, including, without limitation, the fees of the
                arbitration and the arbitration tribunal, shall be borne by you.
                You shall pay your own fees, disbursements and other charges of
                his counsel, except as may be determined by the arbitration
                tribunal. The arbitration tribunal would have the power to award
                interest on any sum awarded pursuant to the arbitration
                proceedings and such sum would carry interest, if awarded, until
                the actual payment of such amounts.
              </p>
              <p className={paragraphClass}>
                14.4.8. Award final and binding: The Parties agree that the
                arbitration award shall be final and binding on the Parties.
                Judgment upon the arbitration award may be rendered in any court
                of competent jurisdiction or application may be made to such
                court for a judicial acceptance of the award and an order of
                enforcement, as the case may be.
              </p>
              <p className={paragraphClass}>
                14.4.9. Confidentiality: You shall not, directly or indirectly,
                disclose the existence, content or results of the Dispute or any
                arbitration conducted under these Terms in relation to that
                Dispute and save as required in order to enforce the arbitration
                and/ or any award made pursuant to these Terms.
              </p>
              <p className={paragraphClass}>
                14.4.10. The existence or subsistence of a Dispute, or the
                commencement or continuation of arbitration proceedings, shall
                not, in any manner, prevent or postpone the performance of those
                obligations of Parties under these Terms which are not in
                dispute, the arbitrators shall give due consideration to such
                performance, if any, in making a final award.
              </p>
              <p className={paragraphClass}>
                14.4.11. It is hereby clarified that Exopods shall not be
                required to expend or risk its own funds or otherwise incur any
                financial liability in initiation of arbitration proceedings.
              </p>
            </section>
            <section id="severability" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                15. Severability
              </h2>
              <p className="text-gray-300">
                In case any part of these Terms is inapplicable or unenforceable
                in any particular jurisdiction, due to any court order or
                otherwise, or for any other reason, the remaining provisions of
                these Terms shall remain in full force and effect.
              </p>
            </section>
            <section id="no-partnership" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                16. No Partnership
              </h2>
              <p className="text-gray-300">
                Your use of the Services creates no partnership, client,
                fiduciary or other professional relationship.
              </p>
            </section>
            <section id="force-majeure" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                17. Force Majeure
              </h2>
              <p className="text-gray-300">
                Exopods will not be liable or responsible for any failure to
                perform, or delay in performance of, any of our obligations
                hereunder that is caused by events outside our reasonable
                control, including but not limited to labour disputes, acts of
                God, war or terrorist activity, malicious damage, accidents or
                compliance with any applicable law or government order.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsOfService;
