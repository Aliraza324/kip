import {
  adminStudentsMock,
  adminTeachersMock,
  adminClassesMock,
  adminWebsiteContentMock,
  teacherAssignmentsListMock,
  adminNotificationsListMock,
} from "@/mocks";

const STORAGE_PREFIX = "kip_live_";
const SYNC_EVENT = "kip:data-change";

// Cross-tab broadcast channel for instant multi-tab sync without reload
const broadcast =
  typeof window !== "undefined" && typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel("kip_realtime_channel")
    : null;

const initialSeeds = {
  students: adminStudentsMock,
  teachers: adminTeachersMock,
  classes: adminClassesMock,
  content: adminWebsiteContentMock,
  assignments: teacherAssignmentsListMock,
  notifications: adminNotificationsListMock,
};

// Memory cache
const memoryCache = {};

function getLocalData(entity) {
  if (memoryCache[entity]) return memoryCache[entity];
  if (typeof localStorage === "undefined") return initialSeeds[entity] || [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${entity}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      memoryCache[entity] = parsed;
      return parsed;
    }
  } catch {
    /* fallback to seeds */
  }
  const seed = initialSeeds[entity] || [];
  memoryCache[entity] = seed;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${entity}`, JSON.stringify(seed));
  } catch {
    /* ignore storage quota errors */
  }
  return seed;
}

function saveLocalData(entity, data) {
  memoryCache[entity] = data;
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${entity}`, JSON.stringify(data));
    } catch {
      /* ignore storage quota errors */
    }
  }
}

export const emitDataChange = (entity, action = "update", data = null) => {
  if (typeof window === "undefined") return;
  const payload = { entity, action, data, timestamp: Date.now() };
  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: payload }));
  if (broadcast) {
    try {
      broadcast.postMessage(payload);
    } catch {
      /* ignore broadcast error */
    }
  }
};

if (broadcast) {
  broadcast.onmessage = (event) => {
    const { entity, data } = event.data || {};
    if (entity) {
      if (data) memoryCache[entity] = data;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: event.data }));
      }
    }
  };
}

export const liveStore = {
  get(entity) {
    return getLocalData(entity);
  },

  set(entity, data) {
    saveLocalData(entity, data);
    emitDataChange(entity, "set", data);
    return data;
  },

  add(entity, newItem) {
    const current = getLocalData(entity);
    const updated = [newItem, ...(Array.isArray(current) ? current : [])];
    saveLocalData(entity, updated);
    emitDataChange(entity, "add", newItem);
    return newItem;
  },

  update(entity, id, updates) {
    const current = getLocalData(entity);
    if (!Array.isArray(current)) {
      const merged = { ...current, ...(typeof id === "object" ? id : updates) };
      saveLocalData(entity, merged);
      emitDataChange(entity, "update", merged);
      return merged;
    }

    const updated = current.map((item) =>
      item.id === id || item.teacherId === id || item.studentId === id
        ? { ...item, ...updates }
        : item
    );
    saveLocalData(entity, updated);
    emitDataChange(entity, "update", { id, updates });
    return updated.find(
      (i) => i.id === id || i.teacherId === id || i.studentId === id
    );
  },

  remove(entity, id) {
    const current = getLocalData(entity);
    if (!Array.isArray(current)) return current;
    const updated = current.filter(
      (item) => item.id !== id && item.teacherId !== id && item.studentId !== id
    );
    saveLocalData(entity, updated);
    emitDataChange(entity, "remove", { id });
    return updated;
  },

  subscribe(entity, callback) {
    if (typeof window === "undefined") return () => {};
    const handler = (e) => {
      if (!entity || e.detail?.entity === entity) {
        callback(getLocalData(entity), e.detail);
      }
    };
    window.addEventListener(SYNC_EVENT, handler);
    return () => window.removeEventListener(SYNC_EVENT, handler);
  },
};

export default liveStore;
