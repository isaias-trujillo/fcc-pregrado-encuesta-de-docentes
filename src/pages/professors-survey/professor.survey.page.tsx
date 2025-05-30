import {useParams} from "react-router";
import useGroups from "@/modules/groups/infrastructure/useGroups.ts";
import Navbar from "@/components/app/navbar.tsx";
import useSurvey from "@/modules/survey/infrastructure/useSurvey.ts";
import {useEffect} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import useAuth from "@/modules/auth/infrastructure/stores/useAuth.ts";

const ProfessorSurveyPage = () => {
    const {course, section} = useParams();
    const {groups} = useGroups();
    const group = groups.find(group => group.section === parseInt(section ?? "0") && group.course.code === course);

    const {init, progress, check} = useSurvey();
    const {code} = useAuth();

    useEffect(() => {
        init();
    }, [course, section, code]);

    console.log({progress})

    return <main
        className="flex flex-wrap-reverse flex-col place-content-center bg-violet-100 rounded-md p-8 gap-8">
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
            {progress.questions.map((question, index) => <li key={index}>
                <div className='flex flex-col p-3 gap-3'>
                    <span>{question?.label}</span>
                    <RadioGroup defaultValue="option-one" onValueChange={(c) => {
                        check({
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
                        })
                    }}>
                        <div key={`options-${index}`} className="flex items-center p-5 gap-5">
                            {progress.alternatives.map((option) => {
                                return <>
                                    <RadioGroupItem value={option?.id} id={`${question.id}-${option.id}`}/>
                                    <Label htmlFor={`${question.id}-${option.id}`}>{option.label}</Label>
                                </>
                            })}
                        </div>
                    </RadioGroup>

                </div>
            </li>)}
        </ul>
    </main>
};

export default ProfessorSurveyPage;