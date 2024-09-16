import { useEffect } from 'react';
import sound from '../assets/clicks.wav'
import { useSelector } from 'react-redux';

type selectorProps = {
    apps : {
        clickSound: boolean
    }
}

const useMakeSound = () => {

    const soundSettingStatus = useSelector((state: selectorProps) => state.apps.clickSound);

    useEffect(() => {
        const handleClick = () => {
            if (soundSettingStatus) {
                const audio = new Audio(sound);
                audio.play();
                audio.volume = 0.1
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [soundSettingStatus]);
};

export default useMakeSound;
