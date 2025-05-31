import {useParams} from "react-router";
import useGroups from "@/modules/groups/infrastructure/useGroups.ts";
import Navbar from "@/components/app/navbar.tsx";
import useSurvey from "@/modules/survey/infrastructure/useSurvey.ts";
import {useEffect, useMemo} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";
import {toast} from "sonner";

const ProfessorSurveyPage = () => {
    const {course, section} = useParams();
    const {groups} = useGroups();
    const group = useMemo(() => groups.find(group => group.section === parseInt(section ?? "0") && group.course.code === course), [course, groups, section]);

    const {init, progress, check} = useSurvey();
    const {code, state} = useAuth();

    useEffect(() => {
        if (state === 'authenticated'){
            init({studentCode: code, group});
        }
    }, []);

    return <main
        className="flex flex-wrap-reverse flex-col place-content-center rounded-md p-8 gap-8">
        <Navbar/>
        <section
            className="flex flex-col px-6 py-2 rounded-md font-semibold bg-violet-200 text-[#1c1b1f] hover:bg-violet-300 text-[clamp(0.75rem,1vw,1rem)]">
            <span>
                Docente: {group?.professor?.surname?.paternal} {group?.professor?.surname?.maternal} {group?.professor?.given_names}
            </span>
            <span>
                Curso: {group?.course?.name}
            </span>
        </section>
        <ul
            className="flex flex-col px-6 py-2 rounded-md font-semibold bg-background text-[#1c1b1f] text-[clamp(0.75rem,1vw,1rem)]">
            {progress.questions.map((question, index) =>
                <li key={`question-item-${question.id}`} className='flex flex-col p-3 gap-3'>
                    <span>{question?.label}</span>
                    <RadioGroup defaultValue="option-one" onValueChange={(c) => {
                        toast.promise(check({
                            choice: c,
                            studentCode: code ?? "",
                            group: group ? {
                                course: group.course.code,
                                section: group.section
                            } : {
                                course: "",
                                section: 0
                            },
                            question: question.id
                        }), {
                            error: `No se guardó tu respuesta.`
                        })
                    }}>
                        <ul key={`options-${index}-for-question-item-${question.id}`} className="flex items-center p-0">
                            {progress.alternatives.map((option) => {
                                return <li key={`option-item-${option.id}`} className='flex flex-row p-0 gap-5 m-5'>
                                    <RadioGroupItem value={option?.id} id={`${question.id}-${option.id}`}/>
                                    <Label htmlFor={`${question.id}-${option.id}`}>{option.label}</Label>
                                </li>
                            })}
                        </ul>
                    </RadioGroup>


                </li>)}
        </ul>
    </main>
};

export default ProfessorSurveyPage;