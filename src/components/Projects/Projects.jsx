import ProjectCard from "./ProjectCard.jsx";
import { projects } from "./projectsInfo";
import { useStore } from "@nanostores/react";
import { selectedFilterStore } from "./selectedFilterStore";
import "./Projects.scss";

const fiveFirstTags = projects.reduce((acc, project) => {
    project.tags.forEach((tag) => {
        if (!acc.includes(tag) && acc.length < 5) {
            acc.push(tag);
        }
    });
    return acc;
}, []);

export default function Projects() {
    const selectedFilter = useStore(selectedFilterStore);

    const firstThreeProjects = [...projects].slice(0, 3);

    const handleFilter = (tag) => {
        selectedFilterStore.set(tag);
    };

    return (
        <section className="projects">
            <div className="top-card">
                <p>Projects</p>
                <div className="tags">
                    {fiveFirstTags?.map((tag, index) => (
                        <button
                            key={index}
                            className={`tag ${
                                tag == selectedFilter ? "selected" : ""
                            }`}
                            onClick={() => handleFilter(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="project-cards">
                {firstThreeProjects.map((project, index) => (
                    <ProjectCard
                        key={`${project.name}-${index}`}
                        project={project}
                    />
                ))}
            </div>
        </section>
    );
}

/*
<section class="projects">

    <div class="top-card">
        <p >Projects</p>
        <div class="tags">
            {
                fiveFirstTags?.map((tag) => (
                    
                        <button class="tag">{tag}</button>
                ))
            }
        </div>
    </div>


    <div class="projects">
        {
            projects.map((project) => (
                <ProjectCard project={project} />
            ))
        }
    </div>
</section>



<style lang="scss" scoped>
    .projects {
        margin-top: 40px;


        .top-card {
            border-radius: 12px;
            background: #FFF;
            width: 1046px;
            height: 115px;
            padding: 22px;

            .tags {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-top: 1rem;

                .tag {
                    border-radius: 12px;
                    border: 1px solid #4F4F4F;
                    background-color: transparent;
                    width: 72px;
                    height: 33px;
                    flex-shrink: 0;
                    color: #4F4F4F;
                    text-align: center;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                }
            }
        }

    }
</style>

*/
