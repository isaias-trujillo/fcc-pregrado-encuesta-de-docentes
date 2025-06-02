import { RadioGroup } from "@/components/ui/radio-group";
import useChooser from "@/modules/choices/infrastructure/store/useChooser";
import ChoiceItem from "@/modules/choices/infrastructure/ui/choice.item";
import ChoiceSkeleton from "@/modules/choices/infrastructure/ui/choice.skeleton";
import useGroups from "@/modules/groups/infrastructure/store/useGroups";
import type Question from "@/modules/questions/domain/question";
import { useCallback, type FC } from "react";
import { StringRecordId } from "surrealdb";

type Props = {
  question: Question;
};

const ChoiceContainer: FC<Props> = ({ question }) => {
  const { submit } = useChooser();
  const { value } = useGroups();
  const group = value();

  const onValueChange = useCallback(
    (choice: string) => {
      if (!group) return;
      submit({
        answerId: new StringRecordId(choice),
        questionId: question.id,
        group,
      });
    },
    [question, group],
  );

  if (!group) return <ChoiceSkeleton />;

  return (
    <RadioGroup
      defaultValue={question.answer?.toString()}
      className="flex flex-row"
      onValueChange={onValueChange}
    >
      {question.choices.map((choice, index) => (
        <ChoiceItem key={`choice-item-${choice.id}-${index}`} choice={choice} />
      ))}
    </RadioGroup>
  );
};

export default ChoiceContainer;
