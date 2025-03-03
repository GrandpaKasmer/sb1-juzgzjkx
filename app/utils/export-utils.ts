import { File, Folder, knownFolders, path } from '@nativescript/core';
import { Toasty } from 'nativescript-toasty';

export class ExportUtils {
    /**
     * Converts task data to CSV format
     * @param tasks Array of task objects
     * @returns CSV string
     */
    static tasksToCSV(tasks: any[]): string {
        // Define CSV headers
        const headers = [
            'Task Type',
            'Start Time',
            'End Time',
            'Duration',
            'Location (Lat)',
            'Location (Lng)',
            'Voice Notes',
            'Photo URL',
            'Created At'
        ];

        // Create CSV content
        let csvContent = headers.join(',') + '\n';

        // Add task data rows
        tasks.forEach(task => {
            const row = [
                task.task_type,
                task.start_time,
                task.end_time || '',
                task.formattedDuration || '',
                task.location_lat || '',
                task.location_lng || '',
                (task.voice_notes || '').replace(/,/g, ';').replace(/\n/g, ' '), // Escape commas and newlines
                task.photo_url || '',
                task.created_at
            ];
            csvContent += row.join(',') + '\n';
        });

        return csvContent;
    }

    /**
     * Saves data to a file in the documents folder
     * @param data Content to save
     * @param fileName Name of the file
     * @param mimeType MIME type of the file
     * @returns Promise with the file path
     */
    static async saveToFile(data: string, fileName: string, mimeType: string): Promise<string> {
        try {
            // Get documents folder
            const documentsFolder = knownFolders.documents();
            const filePath = path.join(documentsFolder.path, fileName);
            
            // Create file
            const file = File.fromPath(filePath);
            await file.writeText(data);
            
            // Show success message
            const toast = new Toasty({ text: `File saved to: ${filePath}` });
            toast.show();
            
            return filePath;
        } catch (error) {
            console.error('Error saving file:', error);
            
            // Show error message
            const toast = new Toasty({ 
                text: `Error saving file: ${error.message}`,
                backgroundColor: '#FF0000'
            });
            toast.show();
            
            throw error;
        }
    }

    /**
     * Generates a PDF document from task data
     * @param tasks Array of task objects
     * @returns PDF content as a string
     */
    static generatePDF(tasks: any[]): string {
        // In a real implementation, we would use a library like pdfmake or jspdf
        // For this demo, we'll create a simple HTML-based PDF representation
        
        let pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Task History</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
        </head>
        <body>
            <h1>TerraTime Grounds - Task History</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Task Type</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        tasks.forEach(task => {
            pdfContent += `
                <tr>
                    <td>${task.taskName || task.task_type}</td>
                    <td>${task.formattedDate || new Date(task.start_time).toLocaleDateString()}</td>
                    <td>${task.formattedDuration || 'N/A'}</td>
                    <td>${task.voice_notes || 'No notes'}</td>
                </tr>
            `;
        });
        
        pdfContent += `
                </tbody>
            </table>
        </body>
        </html>
        `;
        
        return pdfContent;
    }

    /**
     * Shares a file using the device's native sharing functionality
     * @param filePath Path to the file to share
     * @param mimeType MIME type of the file
     */
    static shareFile(filePath: string, mimeType: string): void {
        // In a real implementation, we would use a plugin like nativescript-social-share
        // For this demo, we'll just show a toast message
        const toast = new Toasty({ 
            text: `File ready for sharing: ${filePath}`,
            duration: 3000
        });
        toast.show();
    }
}