import { Suspense } from "react";
import WorkInformationWrapper from "./WorkInformationWrapper";
import WorkProgressWrapper from "./WorkProgressWrapper";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const workOrderId = (await params).id;
    return (
        <div className="space-y-3">
            <Suspense fallback={<p>Loading feed...</p>}>
                <WorkInformationWrapper id={workOrderId} />
            </Suspense>
            <WorkProgressWrapper id={workOrderId} />
        </div>
    );
}
