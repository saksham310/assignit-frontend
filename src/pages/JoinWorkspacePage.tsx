import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";

const JoinWorkspacePage = () =>{
    return <>
        <main className="min-h-screen bg-[#EEEBF6] p-4">
            <div className="mx-auto max-w-screen-2xl p-8 flex justify-center items-center">
                <Card className={'w-full md:w-[480px] flex flex-col space-y-2 p-6 shadow-none '}>
                    <CardHeader className={'text-center font-bold text-lg'}>
                        <CardTitle>You are invited to join a workspace</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </main>
        </>
        }

        export default JoinWorkspacePage;