import ProjectCard from "./ProjectCard.jsx";
import { projects } from "./projectsInfo";
import { useStore } from "@nanostores/react";
import { selectedFilterStore } from "./selectedFilterStore";
import "./Projects.scss";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const fiveFirstTags = projects.reduce((acc, project) => {
    project.tags.forEach((tag) => {
        if (!acc.includes(tag) && acc.length < 5) {
            acc.push(tag);
        }
    });
    return acc;
}, []);

function Items({ currentItems }) {
    return (
        <div className="project-cards">
            {currentItems.map((project, index) => (
                <ProjectCard
                    key={`${project.name}-${index}`}
                    project={project}
                />
            ))}
        </div>
    );
}

function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = projects.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(projects.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % projects.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default function Projects() {
    // const {selectedTag, filteredProjects} = useStore(selectedFilterStore);

    // useEffect(() => {

    //     const projectsWithCurrentTag = projects.filter((project) => {
    //         return project.tags.includes(selectedTag);
    //     });

    //     selectedFilterStore.set({
    //         selectedTag,
    //         filteredProjects: projectsWithCurrentTag
    //     });

    // }, [selectedTag])

    // const handleFilter = (tag) => {
    //     selectedFilterStore.set({
    //         selectedTag: tag,
    //         filteredProjects
    //     });
    // };

    return (
        <section className="projects">
            <div className="top-card">
                <p>Projects</p>
                <div className="tags">
                    {fiveFirstTags?.map((tag, index) => (
                        <button
                            key={index}
                            className={`tag`}
                            onClick={() => handleFilter(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* <div className="project-cards">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={`${project.name}-${index}`}
                        project={project}
                    />
                ))}
            </div> */}

            <PaginatedItems itemsPerPage={3} />
        </section>
    );
}

