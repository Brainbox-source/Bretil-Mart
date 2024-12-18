const percentageBtn = (text, bgColor, textColor) => {
    const percent = document.createElement('button');
    percent.innerHTML = text;
    percent.style.backgroundColor = bgColor;
    percent.style.color= textColor;
    percent.style.padding = '0.6em'
    percent.style.cursor = 'pointer';
    percent.style.borderTopLeftRadius = '0.5em';
    percent.style.borderBottomRightRadius = '0.5em';
    percent.style.border = 'none';
    percent.style.fontSize = '0.7em';
    percent.style.fontWeight = '700';

    return percent;
}

export default percentageBtn;