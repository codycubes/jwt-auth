import { create } from "zustand";

interface Podcast {
  _id?: string;
  name: string;
  host: string;
  description: string;
  duration: string;
  image: string;
}

interface PodcastStore {
  podcasts: Podcast[];
  setpodcasts: (podcasts: Podcast[]) => void;
  createPodcast: (newPodcast: Podcast) => Promise<{ success: boolean; message: string }>;
  fetchPodcasts: () => Promise<void>;
  deletePodcast: (pid: string) => Promise<{ success: boolean; message: string }>;
  updatePodcast: (pid: string, updatedPodcast: Partial<Podcast>) => Promise<{ success: boolean; message: string }>;
}

export const usePodcastStore = create<PodcastStore>((set) => ({
  podcasts: [],
  setpodcasts: (podcasts) => set({ podcasts }),

  createPodcast: async (newPodcast) => {
    if (
      !newPodcast.name ||
      !newPodcast.host ||
      !newPodcast.description ||
      !newPodcast.duration ||
      !newPodcast.image
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/podcasts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPodcast),
    });
    const data = await res.json();
    set((state) => ({ podcasts: [...state.podcasts, data.data] }));
    return { success: true, message: "Podcast created successfully" };
  },

  fetchPodcasts: async () => {
    const res = await fetch("/api/podcasts");
    const data = await res.json();
    set({ podcasts: data.data });
  },

  deletePodcast: async (pid) => {
    const res = await fetch(`/api/podcasts/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

   
    set((state) => ({ podcasts: state.podcasts.filter((podcast) => podcast._id !== pid) }));
    return { success: true, message: data.message };
  },

  updatePodcast: async (pid, updatedPodcast) => {
    const res = await fetch(`/api/podcasts/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPodcast),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

   
    set((state) => ({
      podcasts: state.podcasts.map((podcast) => (podcast._id === pid ? data.data : podcast)),
    }));

    return { success: true, message: data.message };
  },
}));
