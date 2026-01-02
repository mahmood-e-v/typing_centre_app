import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generatePeriodsForCompany } from "@/lib/financial-periods";

export const POST = async (req: NextRequest) => {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await generatePeriodsForCompany(session.user.companyId);

        return NextResponse.json({ success: true, message: "Periods generated successfully" });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to generate periods" },
            { status: 500 }
        );
    }
};
