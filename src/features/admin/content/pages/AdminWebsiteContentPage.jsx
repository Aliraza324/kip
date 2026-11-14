import { useState } from "react";
import toast from "react-hot-toast";
import {
  AdminContentNavTabs,
  AdminSectionHeroForm,
  AdminSectionMediaCard,
  AdminFeaturesListCard,
  AdminAddFeatureModal,
  AdminContactInfoCard,
  AdminSocialLinksTable,
  AdminContentActionsBar,
} from "../components";
import { adminWebsiteContentMock } from "@/mocks";

const metaTitles = {
  home: { title: "Home Page – Hero Section", sub: "Edit the hero section content and design." },
  about: { title: "About Us Page", sub: "Manage the content of your About Us page." },
  features: { title: "Features Page", sub: "Manage the features section content." },
  "how-it-works": { title: "How It Works – Hero Section", sub: "Manage only the hero section content for the How It Works page." },
  contact: { title: "Contact Us Page", sub: "Manage contact page content, details and social links." },
};

export const AdminWebsiteContentPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [contactSubTab, setContactSubTab] = useState("content");
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
  const [contentState, setContentState] = useState(adminWebsiteContentMock);

  const currentData = contentState[activeTab === "how-it-works" ? "howItWorks" : activeTab];
  const { title: sTitle, sub: sSub } = metaTitles[activeTab] || metaTitles.home;

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    const key = activeTab === "how-it-works" ? "howItWorks" : activeTab;
    setContentState((prev) => ({
      ...prev,
      [key]: { ...prev[key], [name]: value },
    }));
  };

  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setContentState((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        details: { ...prev.contact.details, [name]: value },
      },
    }));
  };

  const handleDiscard = () => {
    setContentState(adminWebsiteContentMock);
    toast.success("Changes discarded");
  };

  const handleSave = () => {
    toast.success("Website content saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* Top Header & Page Tabs */}
      <AdminContentNavTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Contact Us Sub-Tabs */}
      {activeTab === "contact" && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setContactSubTab("content")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              contactSubTab === "content"
                ? "bg-[#0080f6] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            Content & Details
          </button>
          <button
            type="button"
            onClick={() => setContactSubTab("social")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              contactSubTab === "social"
                ? "bg-[#0080f6] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            Social Media Links
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === "contact" && contactSubTab === "social" ? (
        <div className="space-y-6">
          <AdminContactInfoCard
            details={contentState.contact.details}
            onChange={handleContactDetailsChange}
          />
          <AdminSocialLinksTable links={contentState.contact.socialLinks} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          <div className="lg:col-span-8">
            <AdminSectionHeroForm
              tabKey={activeTab}
              sectionTitle={sTitle}
              sectionSub={sSub}
              data={currentData}
              onChange={handleHeroChange}
            />
          </div>
          <div className="lg:col-span-4">
            <AdminSectionMediaCard
              data={currentData}
              onColorChange={(c) => {
                const key = activeTab === "how-it-works" ? "howItWorks" : activeTab;
                setContentState((prev) => ({
                  ...prev,
                  [key]: { ...prev[key], accentColor: c },
                }));
              }}
            />
          </div>
        </div>
      )}

      {/* Features List Section (Only on Features Tab) */}
      {activeTab === "features" && (
        <AdminFeaturesListCard
          features={contentState.features.list}
          onAddClick={() => setShowAddFeatureModal(true)}
        />
      )}

      {/* Bottom Actions Bar */}
      <AdminContentActionsBar onDiscard={handleDiscard} onSave={handleSave} />

      {/* Add Feature Modal */}
      <AdminAddFeatureModal
        isOpen={showAddFeatureModal}
        onClose={() => setShowAddFeatureModal(false)}
        onAdd={(newFeat) => {
          setContentState((prev) => ({
            ...prev,
            features: {
              ...prev.features,
              list: [...prev.features.list, newFeat],
            },
          }));
        }}
      />
    </div>
  );
};

export default AdminWebsiteContentPage;
