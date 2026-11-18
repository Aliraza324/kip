import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  AdminContentNavTabs,
  AdminSectionHeroForm,
  AdminSectionMediaCard,
  AdminContactInfoCard,
  AdminSocialLinksTable,
  AdminContentActionsBar,
} from "../components";
import { adminWebsiteContentMock } from "@/mocks";
import { useDataSync } from "@/hooks/useDataSync";
import { contentService } from "@/service/apiService";
import {
  useUpdateHeroContent,
  useUploadHeroImage,
  useUploadHeroVideo,
} from "@/hooks/admin/useAdminContent";

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
  const liveContent = useDataSync("content");
  const [contentState, setContentState] = useState(() => liveContent || adminWebsiteContentMock);

  const updateMutation = useUpdateHeroContent();
  const uploadImageMutation = useUploadHeroImage();
  const uploadVideoMutation = useUploadHeroVideo();

  useEffect(() => {
    contentService.getAll();
  }, []);

  useEffect(() => {
    if (liveContent) setContentState(liveContent);
  }, [liveContent]);

  const currentKey = activeTab === "how-it-works" ? "howItWorks" : activeTab;
  const currentData = contentState[currentKey] || {};
  const { title: sTitle, sub: sSub } = metaTitles[activeTab] || metaTitles.home;

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setContentState((prev) => ({
      ...prev,
      [currentKey]: { ...prev[currentKey], [name]: value },
    }));
  };

  const handleContactDetailsChange = (e) => {
    const { name, value } = e.target;
    setContentState((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        details: { ...prev.contact?.details, [name]: value },
      },
    }));
  };

  const handleDiscard = () => {
    setContentState(liveContent || adminWebsiteContentMock);
    toast.success("Changes discarded");
  };

  const handleSave = async () => {
    try {
      const sectionData = contentState[currentKey] || {};
      const payload = {
        badge: sectionData.badge || "",
        title: sectionData.title || "",
        description: sectionData.description || "",
        btn1Text: sectionData.btn1Text || "",
        btn1Link: sectionData.btn1Link || "",
        btn2Text: sectionData.btn2Text || "",
        btn2Link: sectionData.btn2Link || "",
        videoUrl: sectionData.videoUrl || null,
        accentColor: sectionData.accentColor || "#0080f6",
      };

      if (currentKey === "features") {
        payload.list = sectionData.list || [];
      }
      if (currentKey === "contact") {
        payload.details = sectionData.details || { phone: "", email: "", address: "" };
        payload.socialLinks = sectionData.socialLinks || [];
      }

      await updateMutation.mutateAsync({ section: currentKey, data: payload });
    } catch {
      // Toast already handled by mutation hook
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const updated = await uploadImageMutation.mutateAsync({ section: currentKey, file });
      setContentState((prev) => ({
        ...prev,
        [currentKey]: {
          ...prev[currentKey],
          image: updated?.image || updated,
        },
      }));
    } catch {
      // Toast already handled by mutation hook
    }
  };

  const handleVideoUpload = async (file) => {
    try {
      const updated = await uploadVideoMutation.mutateAsync({ section: currentKey, file });
      setContentState((prev) => ({
        ...prev,
        [currentKey]: {
          ...prev[currentKey],
          video: updated?.video,
          videoUrl: updated?.videoUrl || updated?.video?.url || prev[currentKey]?.videoUrl,
        },
      }));
    } catch {
      // Toast already handled by mutation hook
    }
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
            details={contentState.contact?.details || {}}
            onChange={handleContactDetailsChange}
          />
          <AdminSocialLinksTable links={contentState.contact?.socialLinks || []} />
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
              onImageUpload={handleImageUpload}
              onVideoUpload={handleVideoUpload}
            />
          </div>
        </div>
      )}

      {/* Bottom Actions Bar with loading state */}
      <AdminContentActionsBar
        onDiscard={handleDiscard}
        onSave={handleSave}
        isSaving={updateMutation.isLoading}
      />
    </div>
  );
};

export default AdminWebsiteContentPage;
