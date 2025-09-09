import { generatePdf, renderPdf } from "@/services/pdf";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { documentId } = await req.json();

        const userData = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
        } // Fetch user details

        if (!documentId) {
        return NextResponse.json("Missing required fields", { status: 400 });
        }

        const htmlContent = await renderPdf(userData);
        const pdfBuffer = await generatePdf(htmlContent, documentId, true);

        return new NextResponse(pdfBuffer as BodyInit, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=document-${documentId}.pdf`,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error generating PDF" }, { status: 500 });
    }
};