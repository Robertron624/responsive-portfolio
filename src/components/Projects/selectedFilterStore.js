import { atom } from 'nanostores';

export const selectedFilterStore = atom({
    selectedTag: "HTML",
    filteredProjects: []
});