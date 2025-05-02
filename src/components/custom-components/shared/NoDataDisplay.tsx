import { LucideIcon } from "lucide-react";

interface NoDataDisplayProps {
    title: string;
    subtitle: string;
    icon?: LucideIcon;
    containerClassName?: string;
    variant?: 'default' | 'compact';
}

const NoDataDisplay = ({
    title,
    subtitle,
    icon: Icon,
    containerClassName = 'h-full',
    variant = 'default'
}: NoDataDisplayProps) => {
    return (
        <div className={`flex items-center justify-center ${containerClassName}`}>
            <div className={`flex flex-col items-center justify-center gap-4 max-w-[280px] text-center ${
                variant === 'compact' ? 'py-6' : 'py-10'
            }`}>
                {Icon && (
                    <div className="rounded-full bg-muted/30 p-4">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
                <div className="space-y-2">
                    <h3 className="  text-gray-400">{title}</h3>
                    <p className="text-sm text-gray-400">{subtitle}</p>
                </div>
            </div>
        </div>
    );
}

export default NoDataDisplay;