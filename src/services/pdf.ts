import WorkCompletionTemplate from "@/components/pdf/work-completion-template";
import path from "path";
import fs from "fs";
import React from "react";
import puppeteer from "puppeteer";

const { renderToString } = await import("react-dom/server");

export const renderPdf= async (userData: { name: string; email: string; phone: string }) => {
    const element = React.createElement(WorkCompletionTemplate, { userData });
    return renderToString(
        element
    );
};

export const generatePdf = async (htmlContent: string, documentId: number, isDownload: boolean) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Function to convert font file to base64
    const getFontBase64 = (fontPath: string) => {
        const fontBuffer = fs.readFileSync(fontPath);
        return fontBuffer.toString('base64');
    };

    // Assuming you have the font file in a local directory
    const fontPath = path.join(process.cwd(), 'public/fonts/Tajawal/Tajawal-Regular.ttf');
    const fontBase64 = getFontBase64(fontPath);

    const styledHtmlContent = `
        <style>
            @font-face {
                font-family: "Tajawal";
                src: url(data:font/woff2;base64,${fontBase64}) format('woff2');
                font-weight: 400; /* Adjust weights for all needed variants */
                font-style: normal;
            }
            * {
                font-family: "Tajawal", sans-serif;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            body {
                direction: rtl;
                background-color: #fff; /* Replace with your desired background color */
                margin: 0 auto; /* Ensure no margin */
                padding: 0.5rem 1.5rem;
                width: 100%;
                height: 100%;
            }
            img {
                width: 100%;
                height: auto;
            }
            td, th {
                vertical-align: middle;
            }
            .primary-color {
                color: #1f3a8a;
            }
            .primary-bg-color {
                background-color: #1f3a8a;
            }
            h1, h2, h3, h4, h5, h6 {
                font-weight: 500;
                font-size: inherit;
            }
            h2 {
                font-weight: 600;
            }
        </style>
        ${htmlContent}
    `;

    await page.setContent(styledHtmlContent, { waitUntil: "networkidle0" });

// Saves the PDF in the public folder for later use.: if its not for download
    if (!isDownload) {
        const outputPath = path.join(process.cwd(), `public/documents/document-${documentId}.pdf`);
        await page.pdf({ path: outputPath, format: "A4", printBackground: true });
        await browser.close();
        return;
    }

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
    return pdfBuffer;
};