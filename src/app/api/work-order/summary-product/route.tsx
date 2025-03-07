import { getUserSession } from "@/app/auth.action";
import { ProductSummaryDocument } from "@/components/pdf/product-summary";
import {
    AuthenticationError,
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import { getSummaryProductController } from "@/lib/interface-adapters/controllers/work-orders/get-summary-product.controller";
import { renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getUserSession();
        if (!session || !session.user) {
            throw new AuthenticationError("Youre not auhtenticated!");
        }
        const workOrderSummary = await getSummaryProductController(
            session.user.id
        );

        const stream = await renderToStream(
            <ProductSummaryDocument data={workOrderSummary} />
        );

        // return NextResponse.json(workOrderSummary, { status: 200 });
        return new NextResponse(stream as unknown as ReadableStream);
    } catch (error) {
        console.error("Error fetching work order summary:", error);
        if (
            error instanceof AuthenticationError ||
            error instanceof UnauthorizedError
        ) {
            return NextResponse.json(
                { message: error.message },
                { status: 401 }
            );
        }

        if (error instanceof OperationalError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
