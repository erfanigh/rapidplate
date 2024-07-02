//@ts-check

let base = ``

const README = (projectName, projectType, techName) => {
    base += `# ${projectName}`;

    return {
        data: base,
        fileType: '.md'
    }
}

export default README;