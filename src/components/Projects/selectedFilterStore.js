import { atom } from 'nanostores';
import { projects } from './projectsInfo';

export const selectedFilterStore = atom({
    selectedTag: "HTML",
    filteredProjects: [...projects]
});

export const allTags = projects.reduce((acc, project) => {
    project.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
            acc.push(tag);
        }
    });
    return acc;
}, []);