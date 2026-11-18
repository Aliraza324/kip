import { useState } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Reply,
  RefreshCw,
  Inbox,
  CheckCheck,
} from "lucide-react";
import {
  useAdminContactQueries,
  useAdminSetContactMessageRead,
  useAdminDeleteContactMessage,
} from "@/hooks/admin/useAdminContactQueries";
import AdminQueryReplyModal from "../components/AdminQueryReplyModal";

const statusTabs = [
  { id: "all", label: "All Queries" },
  { id: "pending", label: "Pending Response" },
  { id: "replied", label: "Replied" },
  { id: "unread", label: "Unread" },
];

export const AdminContactQueriesPage = () => {
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const {
    messages,
    meta,
    loading,
    params,
    setParams,
    refetch,
  } = useAdminContactQueries({
    page: 1,
    limit: 10,
    status: "all",
  });

  const setReadMutation = useAdminSetContactMessageRead();
  const deleteMutation = useAdminDeleteContactMessage();

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setParams((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setParams((prev) => ({ ...prev, search: searchInput.trim(), page: 1 }));
  };

  const handleOpenQuery = (query) => {
    setSelectedQuery(query);
    setIsReplyModalOpen(true);
    // If unread, mark read
    if (!query.isRead) {
      setReadMutation.mutate({ messageId: query.id, isRead: true });
    }
  };

  const handleToggleRead = async (e, query) => {
    e.stopPropagation();
    await setReadMutation.mutateAsync({
      messageId: query.id,
      isRead: !query.isRead,
    });
    refetch();
  };

  const handleDelete = async (e, queryId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this contact query?")) {
      await deleteMutation.mutateAsync(queryId);
      refetch();
    }
  };

  const handleReplySuccess = () => {
    refetch();
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#eaf4fe] text-[#0080f6] flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Contact Queries
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Review messages sent from the website contact form and send responses via email.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 block">Total Queries</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {meta.total || 0}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs">
          <span className="text-xs font-semibold text-amber-500 block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Pending Response
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {meta.pendingCount ?? 0}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs">
          <span className="text-xs font-semibold text-emerald-500 block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Replied
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {Math.max(0, (meta.total || 0) - (meta.pendingCount || 0))}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs">
          <span className="text-xs font-semibold text-[#0080f6] block flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> Unread
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {meta.unreadCount || 0}
          </span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
        {/* Top Controls: Status Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {statusTabs.map((tab) => {
              const isActive = activeStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleStatusChange(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#0080f6] text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search sender, email, query..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </form>
        </div>

        {/* Table of Queries */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">User / Sender</th>
                <th className="pb-3">Subject & Inquiry</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Received On</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {loading && messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#0080f6]" />
                      <span className="text-xs font-semibold">Loading queries...</span>
                    </div>
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="w-8 h-8 opacity-40" />
                      <span className="text-xs font-semibold">No queries found</span>
                      <p className="text-[11px] text-slate-400">
                        When users submit the website contact form, their queries will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                messages.map((q) => {
                  const dateStr = q.createdAt
                    ? new Date(q.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={q.id}
                      onClick={() => handleOpenQuery(q)}
                      className={`hover:bg-slate-50/70 transition-colors cursor-pointer group ${
                        !q.isRead ? "bg-blue-50/30 font-medium" : ""
                      }`}
                    >
                      {/* Sender */}
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-full bg-[#eaf4fe] text-[#0080f6] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {q.firstName?.[0] || "U"}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-[#0080f6] transition-colors leading-tight">
                              {q.fullName || `${q.firstName} ${q.lastName}`}
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {q.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Subject & Snippet */}
                      <td className="py-3.5 max-w-xs">
                        <span className="font-bold text-slate-800 capitalize block leading-tight truncate">
                          {q.subject}
                        </span>
                        <p className="text-xs text-slate-500 truncate mt-0.5 leading-normal">
                          {q.message}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-3.5">
                        <div className="flex flex-col items-start gap-1">
                          {q.isReplied ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600">
                              <CheckCircle2 className="w-3 h-3" /> Replied
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                          {!q.isRead && (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-100 text-[#0080f6]">
                              New
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 text-xs text-slate-500 font-medium whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 text-right pr-2">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenQuery(q);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-[#0080f6] text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer"
                            title="Respond to Query"
                          >
                            <Reply className="w-3.5 h-3.5" />
                            <span>Respond</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleToggleRead(e, q)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            title={q.isRead ? "Mark as unread" : "Mark as read"}
                          >
                            <CheckCheck className={`w-4 h-4 ${q.isRead ? "text-emerald-500" : ""}`} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, q.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete query"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Showing page {meta.page} of {meta.totalPages} ({meta.total} total queries)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={meta.page <= 1}
                onClick={() => setParams((p) => ({ ...p, page: p.page - 1 }))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={meta.page >= meta.totalPages}
                onClick={() => setParams((p) => ({ ...p, page: p.page + 1 }))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Query Detail & Reply Modal */}
      <AdminQueryReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        query={selectedQuery}
        onReplySuccess={handleReplySuccess}
      />
    </div>
  );
};

export default AdminContactQueriesPage;
