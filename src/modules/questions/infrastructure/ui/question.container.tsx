import ChoiceContainer from "@/modules/choices/infrastructure/ui/choice.container";
import useQuestions from "@/modules/questions/infrastructure/store/useQuestions";

const QuestionContainer = () => {
  const { data } = useQuestions();
  return (
    <ul className="flex flex-col gap-8 rounded-md font-semibold bg-background text-foreground text-[clamp(0.75rem,1rem+5vw,1.05rem)]">
      {data.map((question, index) => (
        <li
          key={`question-item-${question.id}-${index}`}
          className="flex flex-col gap-3"
        >
          <span>
            {index + 1}. {question?.stem}
          </span>
          <ChoiceContainer
            key={`choice-container-of-question-${question.id}-${index}`}
            question={question}
          />
        </li>
      ))}
    </ul>
  );
};

export default QuestionContainer;
