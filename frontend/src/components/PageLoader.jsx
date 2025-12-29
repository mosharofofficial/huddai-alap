import {LoaderIcon} from "lucide-react";
const PageLoader = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <LoaderIcon className="size-10 animate-spin" />
            </div>
        </div>
    );
};

export default PageLoader;