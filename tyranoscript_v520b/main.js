document.getElementById('generateBtn').addEventListener('click', async () => {
    const character = document.getElementById('characterInput').value.trim();
    if (!character || character.length !== 1) {
        alert('请输入一个汉字');
        return;
    }

    try {
        // 加载字体文件（假设字体文件位于 /fonts/custom-font.ttf）
        const font = await loadFont('/data/others/SourceHanSerifCN-VF.ttf');

        // 生成 SVG 路径
        const svgPath = getCharacterSVGPath(font, character);
        

        // 嵌入到 HTML
        const svgContainer = document.getElementById('svgContainer');
        svgContainer.appendChild(svgPath);
    } catch (error) {
        console.error('Error:', error);
        alert('生成 SVG 失败，请检查控制台');
    }
});

// 加载字体文件
function loadFont(url) {
    return new Promise((resolve, reject) => {
        opentype.load(url, (err, font) => {
            if (err) {
                reject(err);
            } else {
                resolve(font);
            }
        });
    });
}

// 生成 SVG 路径
function getCharacterSVGPath(font, character) {
    const path = font.getPath(character, 0, 150, 200);
    
    const svgPath = splitPathBySubpaths(path.toPathData());
    console.log(svgPath);
    const svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, 'svg');
    svgPath.forEach(function (pathData,index) {
        let pathElem = document.createElementNS(svgNS, 'path');
        pathElem.setAttribute('d', pathData);
        pathElem.setAttribute('style', `--index: ${index};`);
        pathElem.setAttribute('fill', 'black'); // 或其他样式
        svg.appendChild(pathElem);
    });
    // 包裹在 SVG 标签中
    return svg;
}

function splitPathBySubpaths(d) {
    return d.split(/(?=[Mm])/);
}