import { useSelector } from 'react-redux';
import { useEffect } from 'react';

type selectorProps = {
    apps: {
        primaryColor: string,
        secondaryColor: string,
    }
}

const useTheme = () => {
    const { primaryColor, secondaryColor } = useSelector((state: selectorProps) => state.apps);

    useEffect(() => {
        
        if (primaryColor) {
            document.documentElement.style.setProperty('--primary-theme-color', primaryColor);
        }
        if (secondaryColor) {
            document.documentElement.style.setProperty('--secondary-theme-color', secondaryColor);
        }
        
    }, [primaryColor, secondaryColor]); 
    return null;
};

export default useTheme;
