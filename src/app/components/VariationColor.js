import React from 'react';

// List of valid color names
const validColors = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
    'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 
    'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
    'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson',
    'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray',
    'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange',
    'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
    'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue',
    'dimgray', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen',
    'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod',
    'gray', 'green', 'greenyellow', 'honeydew', 'hotpink',
    'indianred', 'indigo', 'ivory', 'khaki', 'lavender',
    'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral',
    'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink',
    'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue',
    'lightyellow', 'lime', 'limegreen', 'linen', 'magenta',
    'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
    'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
    'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
    'navy', 'oldlace', 'olive', 'olivedrab', 'orange',
    'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise',
    'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink',
    'plum', 'powderblue', 'purple', 'red', 'rosybrown',
    'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen',
    'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
    'slategray', 'snow', 'springgreen', 'steelblue', 'tan',
    'teal', 'thistle', 'tomato', 'turquoise', 'violet',
    'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'
];

// Function to calculate Levenshtein distance
const levenshteinDistance = (a, b) => {
    const matrix = [];

    // Create matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                               matrix[i - 1][j] + 1) // deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

// Function to find the closest matching color
const findClosestColor = (color) => {
    let closestColor = color;
    let closestDistance = Infinity;

    validColors.forEach(validColor => {
        const distance = levenshteinDistance(color, validColor);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestColor = validColor;
        }
    });

    return closestColor;
};

// Normalize color function
const normalizeColor = (color) => {
    const lowerCaseColor = color.toLowerCase();
    return findClosestColor(lowerCaseColor);
};

export default function VariationColor({ variationColor }) {
    // Split the color string by any non-alphanumeric character
    const colors = variationColor.split(/[\s_,-]+/).map(normalizeColor);

    // Remove duplicates
    const uniqueColors = [...new Set(colors)];

    // Calculate the percentage for each color
    const percentage = 100 / uniqueColors.length;

    // Create the gradient string
    const gradientString = uniqueColors.map((color, index) => {
        return `var(--${color}) ${percentage * index}%, var(--${color}) ${percentage * (index + 1)}%`;
    }).join(', ');

    // Set up the gradient style
    const gradientStyle = {
        background: `linear-gradient(180deg, ${gradientString})`,
        height: '32px', // Adjust height as needed
        width: '32px', // Adjust width as needed
        display: 'inline-block',
        borderRadius: '8px',
    };

    return (
        <div style={gradientStyle}></div>
    );
}
