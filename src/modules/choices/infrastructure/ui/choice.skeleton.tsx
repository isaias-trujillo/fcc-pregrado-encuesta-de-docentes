import { Skeleton } from "@/components/ui/skeleton";
import { useId } from "react";

const ChoiceSkeleton = () => {
  const id = useId();
  return (
    <div className="flex flex-row items-center space-x-4">
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={id + index} className="w-full h-6" />
      ))}
    </div>
  );
};

export default ChoiceSkeleton;
