import { Suspense } from "react";
import WorkInformationWrapper from "./WorkInformationWrapper";
import WorkProgressWrapper from "./WorkProgressWrapper";
import ActionButtonSection from "./ActionButtonSection";
import { WorkOrderInfoProvider } from "@/components/context/WorkOrderInfoContext";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const workOrderId = (await params).id;
    return (
        <div className="space-y-3">
            <WorkOrderInfoProvider>
                <Suspense fallback={<p>Loading feed...</p>}>
                    <WorkInformationWrapper id={workOrderId} />
                </Suspense>
                <ActionButtonSection />
                <WorkProgressWrapper id={workOrderId} />
            </WorkOrderInfoProvider>
        </div>
    );
}
