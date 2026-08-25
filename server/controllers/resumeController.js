import { PDFParse } from "pdf-parse";

export const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a PDF resume"
            });

        }
        const parser = new PDFParse({
            data: req.file.buffer
        });

        const data = await parser.getText();

        const extractedText = data.text;
        console.log(extractedText)
        await parser.destroy();
        console.log(extractedText);
        res.status(200).json({
            message: "Resume uploaded successfully",
            fileName: req.file.originalname,
            text: extractedText
        });

    } catch (error) {

        console.error("RESUME UPLOAD ERROR:", error);

        res.status(500).json({
            message: "Failed to process resume"
        });

    }

};