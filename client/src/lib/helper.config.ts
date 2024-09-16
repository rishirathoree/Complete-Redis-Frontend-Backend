const helpers = {
    hexToHSL : function (hex:string,opacity?:number) {
        // Convert hex to RGB first
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
    
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
    
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
    
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
    
        return  opacity ? `hsl(${h}, ${s}%, ${l}%,${opacity})` : `hsl(${h}, ${s}%, ${l}%)`;
    },
}
export default helpers