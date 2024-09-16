import { motion } from "framer-motion";

interface ButtonProps {
    isDisabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'tertiary';
    isLoading?: boolean;
    loadingText?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}
const Button: React.FC<ButtonProps> = ({
    isDisabled,
    onClick,
    children,
    className = '',
    size = 'medium',
    variant = 'primary',
    isLoading = false,
    loadingText = 'Loading...',
    icon,
    iconPosition = 'left',
}) => {
    return (
        <motion.button
            whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 300 } }}
            disabled={isDisabled || isLoading}
            onClick={onClick}
            className={`${className} select-none ${size} ${variant}`}
        >
            {isLoading ? (
                <>
                    {icon && !is && iconPosition === 'left' && <span className="icon">{icon}</span>}
                    <span>{loadingText}</span>
                    {icon && iconPosition === 'right' && <span className="icon">{icon}</span>}
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="icon">{icon}</span>}
                    <span>{children}</span>
                    {icon && iconPosition === 'right' && <span className="icon">{icon}</span>}
                </>
            )}
        </motion.button>
    );
};

export default Button;