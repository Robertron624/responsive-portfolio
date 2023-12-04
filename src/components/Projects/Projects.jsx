import ProjectCard from "./ProjectCard.jsx";
import { projects } from "./projectsInfo";
import { useStore } from "@nanostores/react";
import { selectedFilterStore, allTags } from "./selectedFilterStore";
import "./Projects.scss";
import { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import useViewportWidth from "./hooks/useViewportWidth.jsx";
import { useEffect } from "react";

const ITEMS_PER_PAGE_MOBILE = 1;
const ITEMS_PER_PAGE_TABLET = 2;
const ITEMS_PER_PAGE_DESKTOP = 3

function Items({ currentItems }) {

    const { isMobile } = useViewportWidth();

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
    // following the API or data we're working with.
    const [itemOffset, setItemOffset] = useState(0);

    const { filteredProjects } = useStore(selectedFilterStore);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = filteredProjects.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProjects.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % filteredProjects.length;
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
    const { selectedTag, filteredProjects } = useStore(selectedFilterStore);

    const handleFilter = (tag) => {
        let projectsWithCurrentTag = [];

        // Loop through all projects, not just the currently filtered ones, to ensure that all projects with the selected tag are shown
        projects.forEach((project) => {
            if (project.tags.includes(tag)) {
                projectsWithCurrentTag.push(project);
            }
        });

        selectedFilterStore.set({
            selectedTag: tag,
            filteredProjects: projectsWithCurrentTag
                ? projectsWithCurrentTag
                : filteredProjects,
        });
    };

    // Allow user to grab and move the tag list
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartX(event.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        const x = event.pageX - containerRef.current.offsetLeft;
        const distance = x - startX;
        containerRef.current.scrollLeft = scrollLeft - distance;
    };

    // Detect and adjust cards x page ( 1 for mobile, 2 for desktop, 3 for desktop )

    const viewportWidth = useViewportWidth();
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_MOBILE);
  
    useEffect(() => {
      // Update items per page based on viewport width
      if (viewportWidth <= 767) {
        setItemsPerPage(ITEMS_PER_PAGE_MOBILE);
      } else if (viewportWidth > 767 && viewportWidth <= 1024) {
        setItemsPerPage(ITEMS_PER_PAGE_TABLET);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE_DESKTOP);
      }
    }, [viewportWidth]);

    return (
        <section className="projects">
            <div className="top-card">
                <p>Projects</p>
                <div
                    className="tags"
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                >
                    {allTags?.map((tag, index) => (
                        <button
                            key={index}
                            className={`tag ${
                                tag === selectedTag ? "selected" : ""
                            }`}
                            onClick={() => handleFilter(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <PaginatedItems itemsPerPage={itemsPerPage} />
        </section>
    );
}
