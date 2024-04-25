export const  tagCreator = (tagName, parent, value = null , index = null) => {
    const tag = document.createElement(tagName)
    tag.dataset.option = index;
    parent.appendChild(tag);
    tag.innerHTML = value;
}

