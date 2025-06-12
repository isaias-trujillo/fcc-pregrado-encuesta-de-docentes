import { RadioGroupItem } from "@/components/ui/radio-group";
import type Choice from "@/modules/choices/domain/choice";
import { Label } from "@radix-ui/react-label";
import { useId, type FC } from "react";

type Props = {
  choice: Choice;
};

const ChoiceItem: FC<Props> = ({ choice }) => {
  const id = useId();
  return (
    <div
      key={`choice-item-${choice.id}`}
      className={`flex flex-row px-4 py-2 gap-5 m-0 max-sm:w-full items-center rounded-4xl has-[[data-state=checked]]:bg-accent transition-colors`}
    >
      <RadioGroupItem
        value={`${choice.id}`}
        id={`radio-group-${id}-item-${choice.id}`}
      />
      <Label htmlFor={`radio-group-${id}-item-${choice.id}`}>
        {choice.text}
      </Label>
    </div>
  );
};

export default ChoiceItem;
