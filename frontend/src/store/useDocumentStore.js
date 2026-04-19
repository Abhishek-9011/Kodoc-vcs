import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const useDocumentStore = create((set, get) => ({
  documents: [],
  currentDocumentId: null,
  saving: false,
  loading: false,
  error: null,

  loadDocuments: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/documents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ documents: res.data || [], loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to load documents",
        loading: false,
      });
    }
  },

  updateDocumentContent: async (documentId, content) => {
    set((state) => ({
      documents: state.documents.map(doc =>
        doc.id === documentId
          ? { ...doc, content, lastModified: new Date().toISOString() }
          : doc
      ),
    }));

    localStorage.setItem('documents', JSON.stringify(get().documents));
  },

  createDocument: async (title) => {
    try {
      set({ saving: true, error: null });
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/documents`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newDocument = response.data?.document || response.data;
      set((state) => ({
        documents: newDocument ? [newDocument, ...state.documents] : state.documents,
        currentDocumentId: newDocument?._id || state.currentDocumentId,
        saving: false,
      }));

      return response.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to create document",
        saving: false,
      });
      throw err;
    }
  },

  rollbackDocumentVersion: async (documentId, versionId) => {
    try {
      set({ loading: true, error: null });

      const currentDoc = get().documents.find(doc => doc.id === documentId);
      if (!currentDoc) {
        throw new Error('Document not found');
      }

      const version = (currentDoc.versions || []).find(v => v.id === versionId);
      if (!version) {
        throw new Error('Version not found');
      }

      const rollbackSnapshot = {
        id: `${Date.now()}-v`,
        content: currentDoc.content,
        savedAt: new Date().toISOString(),
        label: 'Snapshot before rollback',
      };

      const updatedDoc = {
        content: version.content,
        lastModified: new Date().toISOString(),
      };

      // Try to save to backend first
      try {
        const token = localStorage.getItem("token");
        if (token && API_BASE_URL) {
          await axios.put(`${API_BASE_URL}/api/documents/${documentId}`, {
            ...updatedDoc,
            versions: [rollbackSnapshot].concat(currentDoc.versions || []),
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (backendError) {
        console.warn('Backend not available, using local storage:', backendError.message);
      }

      set((state) => ({
        documents: state.documents.map(doc =>
          doc.id === documentId
            ? {
              ...doc,
              ...updatedDoc,
              versions: [rollbackSnapshot].concat(doc.versions || []),
            }
            : doc
        ),
        loading: false,
      }));

      const { documents } = get();
      localStorage.setItem('documents', JSON.stringify(documents));
    } catch (err) {
      set({
        error: err.message || "Failed to rollback version",
        loading: false,
      });
      throw err;
    }
  },

  deleteDocument: async (documentId) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE_URL}/api/documents/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      set((state) => ({
        documents: state.documents.filter(doc => doc._id !== documentId),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || "Failed to delete document",
        loading: false,
      });
      throw err;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));