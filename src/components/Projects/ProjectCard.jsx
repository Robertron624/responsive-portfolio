import "./ProjectCard.scss";

export default function ProjectCard({
    project: { name, description, tags, demoLink, githubLink, image },
}) {
    return (
        <div className="project-card">
            <div className="project-top">
                <div className="project-image">
                    <img
                        width={292}
                        height={217}
                        src={image}
                        alt={`${name} project`}
                    />
                </div>
                <ul className="project-tags">
                    {tags.map((tag, index) => (
                        <li className="tag" key={index}>
                            #{tag}
                        </li>
                    ))}
                </ul>
                <p className="project-name">{name}</p>
                <p className="project-description">{description}</p>
            </div>

            <div className="buttons">
                <a
                    className="demo-link"
                    href={demoLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    Demo
                </a>
                <a
                    className="github-link"
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </a>
            </div>
        </div>
    );
}
