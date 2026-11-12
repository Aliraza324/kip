import { useState } from "react";
import { Eye, Download, FileText, Search, BookOpen } from "lucide-react";
import { studentClassNotesMock } from "@/mocks";
import { StudentNotePreviewModal } from "./StudentNotePreviewModal";

export const StudentClassNotesView = ({ classData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const filteredNotes = studentClassNotesMock.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${classData?.subject || "class"} notes & worksheets...`}
            className="w-full bg-[#f8fbfe] border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-700 outline-none focus:border-[#0080f6] focus:bg-white transition-all"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold px-2">
          {filteredNotes.length} Document{filteredNotes.length !== 1 ? "s" : ""} Available
        </div>
      </div>

      {/* Notes Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8fbfe] border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 sm:px-6">Document Title</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Format</th>
                <th className="py-3.5 px-4">Size</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right sm:pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNotes.map((note) => (
                <tr key={note.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="truncate max-w-xs">{note.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {note.topic}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-50 text-[#0080f6] border border-blue-100">
                      {note.format}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-medium">
                    {note.size}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    {note.uploadedDate}
                  </td>
                  <td className="py-3.5 px-4 text-right sm:pr-6 whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      {/* Eye Icon to View Note */}
                      <button
                        type="button"
                        onClick={() => setSelectedNote(note)}
                        title="View Note"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                        aria-label={`View ${note.title}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Download Icon to Download Note */}
                      <button
                        type="button"
                        onClick={() => alert(`Downloading: ${note.title}`)}
                        title="Download Note"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                        aria-label={`Download ${note.title}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredNotes.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">No notes found matching your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Preview Modal */}
      <StudentNotePreviewModal
        isOpen={Boolean(selectedNote)}
        onClose={() => setSelectedNote(null)}
        note={selectedNote}
      />
    </div>
  );
};

export default StudentClassNotesView;

