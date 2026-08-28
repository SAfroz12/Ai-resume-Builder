import { PDFParse } from "pdf-parse";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractPdfLinks = async (buffer) => {
    const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(buffer)
    }).promise;

    const links = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const annotations = await page.getAnnotations();

        for (const annotation of annotations) {
            if (
                annotation.subtype === "Link" &&
                annotation.url
            ) {
                links.push(annotation.url);
            }
        }
    }

    return [...new Set(links)];
};
export const uploadResume = async (req, res) => {

    console.log("UPLOAD CONTROLLER HIT");
    try {

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a PDF resume"
            });

        }
        const parser = new PDFParse({
            data: req.file.buffer
        });
        const links = await extractPdfLinks(req.file.buffer);

        console.log("PDF LINKS:", links);

        const data = await parser.getText();

        const extractedText = data.text;
        console.log(extractedText)
        await parser.destroy();
        console.log(extractedText);
        res.status(200).json({
            message: "Resume uploaded successfully",
            fileName: req.file.originalname,
            text: extractedText,
             links: links
        });

    } catch (error) {

        console.error("RESUME UPLOAD ERROR:", error);

        res.status(500).json({
            message: "Failed to process resume"
        });

    }

};