import {create} from "zustand";
import db from "@/modules/shared/infrastructure/surreal.db.ts";
import {persist} from "zustand/middleware";
import type {Uuid} from "surrealdb";
import type GroupResponseItem from "@/modules/groups/infrastructure/GroupResponseItem";

type LiveGroupQuery = {
    state: 'loading' | 'success' | 'error' | 'idle';
    init: (studentCode: string) => Promise<void>;
    getAll: (studentCode: string) => Promise<void>;
    groups: GroupResponseItem[];
    uuid?: Uuid;
};


const useGroups = create<LiveGroupQuery>()(
    persist(
        (set, get) => ({
            state: 'idle',
            groups: [],
            init: async (studentCode: string) => {
                set({state: 'loading'});
                try {
                    const [uuid] = await db.query<Uuid[]>(`live select out.* from enrolled_in where in = type::thing('student', $code)`, {
                        code: studentCode
                    });

                    set({uuid});

                    await db.subscribeLive<GroupResponseItem>(
                        uuid,
                        (action, result) => {
                            if (action === 'CLOSE') return;

                            const current = get().groups;
                            if (action === 'CREATE') {
                                set({groups: [...current, result]});
                            } else if (action === 'DELETE') {
                                set({groups: current.filter(g => g.course !== result.course && g.section !== result.section)});
                            }
                        }
                    ).finally(() => set({state: 'success'}));
                }catch (error) {
                    console.error(error);
                    set({state: 'error', groups: []});
                }
            },
            getAll: async (studentCode: string) => {
                set({state: 'loading'});
                try {
                    const query = `select value groups from only full_group where id = type::thing('full_group', $code);`;
                    const [result] = await db.query<GroupResponseItem[][]>(query, {
                        code: studentCode
                    });
                    set({groups: result, state: 'success'});
                }catch (error) {
                    console.error(error);
                    set({state: 'error', groups: []});
                }
            }
        }),
        {
            name: 'groups-storage'
        }
    )
);
export default useGroups;