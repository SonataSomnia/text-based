function cssGradientToSvgGradient(input,id) {
    const rootStyles = getComputedStyle(document.documentElement);
    const cssGradient = rootStyles.getPropertyValue(input).trim();
    const svgNS = 'http://www.w3.org/2000/svg';
    const gradientRegex = /(linear-gradient|radial-gradient)\(([^,]+),\s*(.+)\)/;
    const matches = cssGradient.match(gradientRegex);

    if (!matches) {
        throw new Error('Invalid gradient format');
    }

    const type = matches[1]; 
    const directionOrShape = matches[2];
    const stops = matches[3].split(',').map(stop => stop.trim());

    var svgGradient;
    if (type === 'linear-gradient') {
        const direction = parseLinearGradientDirection(directionOrShape);
        svgGradient = document.createElementNS(svgNS, 'linearGradient');
        svgGradient.setAttribute('id',id);
        svgGradient.setAttribute('x1', direction.x1);
        svgGradient.setAttribute('y1', direction.y1);
        svgGradient.setAttribute('x2', direction.x2);
        svgGradient.setAttribute('y2', direction.y2);
    } else if (type === 'radial-gradient') {
        svgGradient = document.createElementNS(svgNS, 'radialGradient');
        svgGradient.setAttribute('cx', "50%");
        svgGradient.setAttribute('cy', "50%");
        svgGradient.setAttribute('r', "50%");
    } else {
        throw new Error('Unsupported gradient type');
    }
    
    const stopsWithOffsets = generateOffsetsForStops(stops);

    stopsWithOffsets.forEach(({ color, offset }) => {
        const { stopColor, stopOpacity } = parseColor(color);
        var stop = document.createElementNS(svgNS, 'stop');
        stop.setAttribute('offset', offset);
        stop.setAttribute('style', `stop-color:${stopColor};stop-opacity:${stopOpacity}`);
        svgGradient.appendChild(stop);
        
    });
    
    return svgGradient;
}

function generateOffsetsForStops(stops) {
    const parsedStops = stops.map(stop => {
        const match = stop.match(/(#[0-9a-fA-F]{6,8})|(rgba?\([^)]*\))(?:\s+(\d+%))?/);
        if (!match) {
            throw new Error(`Invalid stop format: ${stop}`);
        }
        return { color: match[1], offset: match[2] || null };
    });

    const totalStops = parsedStops.length;
    let lastOffset = -1;

    parsedStops.forEach((stop, index) => {
        if (!stop.offset) {
            stop.offset = `${(index / (totalStops - 1)) * 100}%`;
        }
        const numericOffset = parseFloat(stop.offset);
        if (numericOffset <= lastOffset) {
            throw new Error('Stops are not in increasing order or overlap');
        }
        lastOffset = numericOffset;
    });

    return parsedStops;
}

function parseLinearGradientDirection(direction) {
    switch (direction) {
        case 'to right':
            return { x1: '0%', y1: '0%', x2: '100%', y2: '0%' };
        case 'to left':
            return { x1: '100%', y1: '0%', x2: '0%', y2: '0%' };
        case 'to bottom':
            return { x1: '0%', y1: '0%', x2: '0%', y2: '100%' };
        case 'to top':
            return { x1: '0%', y1: '100%', x2: '0%', y2: '0%' };
        default:
            const angle = parseFloat(direction);
            const radians = (angle - 90) * (Math.PI / 180);
            return {
                x1: `${50 + 50 * Math.cos(radians)}%`,
                y1: `${50 + 50 * Math.sin(radians)}%`,
                x2: `${50 - 50 * Math.cos(radians)}%`,
                y2: `${50 - 50 * Math.sin(radians)}%`,
            };
    }
}

function parseColor(color) {
    let stopColor = color;
    let stopOpacity = 1;

    if (color.startsWith('rgba')) {
        const rgba = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgba) {
            stopColor = `rgb(${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
            stopOpacity = parseFloat(rgba[4]);
        }
    } else if (color.startsWith('#') && color.length === 9) {
        stopColor = color.slice(0, 7);
        stopOpacity = parseInt(color.slice(7, 9), 16) / 255;
    }

    return { stopColor, stopOpacity };
}

try {
    const svgGradient = cssGradientToSvgGradient("--echo","gra");
    const svg = `
        <svg id="svg">
        <text  x=50 % y=75 % text - anchor="middle" fill = "url(#gra)">
            ɞːʈʰ˟ɞ̅ʈʐɻ̈˩̀
        </text>
        </svg>`
    const container = document.getElementById('svg-container');
    container.innerHTML = svg;
    document.getElementById('svg').append(svgGradient);
    document.getElementById('svg').style.animation ="textAnimate 5s forwards normal 1";
    const value=$("<p>test</p>");

} catch (error) {
    console.error(error.message);
}
