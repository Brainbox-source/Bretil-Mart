const button = (text, bgColor, textColor, arrow = 'no') => {
    const element = document.createElement('button');
    element.innerHTML = `${text} ${arrow === 'no' ? '' : '<i class="fa fa-arrow-right"></i>'}`;
    element.style.backgroundColor = bgColor;
    element.style.width = '100%';
    element.style.color= textColor;
    element.style.padding= '1em'
    element.style.border = 'none'
    element.style.borderRadius = '5px'
    element.style.fontWeight = '700'
    element.style.cursor = 'pointer'
    element.style.display = 'flex'
    element.style.alignItems = 'center'
    element.style.justifyContent = 'center'
    element.style.gap = '0.4em'

    return element;
};

export default button;