import { EventData, Page, NavigatedData } from '@nativescript/core';
import { supabase } from '../supabase';
import { translations } from '../i18n/translations';
import { ExportUtils } from '../utils/export-utils';
import { Toasty } from 'nativescript-toasty';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (args.isBackNavigation) return;

    const worker = args.context.worker;
    page.bindingContext = { 
        worker, 
        tasks: [],
        isExporting: false,
        
        exportWorkerTasksAsCSV: async function() {
            if (!this.tasks || this.tasks.length === 0) {
                const toast = new Toasty({ text: translations['en'].supervisor.noTasks });
                toast.show();
                return;
            }

            try {
                this.set('isExporting', true);

                // Generate CSV content
                const csvContent = ExportUtils.tasksToCSV(this.tasks);
                
                // Generate filename with current date and worker name
                const date = new Date().toISOString().split('T')[0];
                const workerName = worker.full_name || worker.phone_number || 'worker';
                const fileName = `terratime_${workerName}_tasks_${date}.csv`;
                
                // Save to file
                const filePath = await ExportUtils.saveToFile(csvContent, fileName, 'text/csv');
                
                // Share the file
                ExportUtils.shareFile(filePath, 'text/csv');
                
                // Show success message
                const toast = new Toasty({ 
                    text: translations['en'].history.exportSuccess,
                    backgroundColor: '#22c55e',
                    textColor: '#ffffff'
                });
                toast.show();
            } catch (error) {
                console.error('Error exporting CSV:', error);
                
                // Show error message
                const toast = new Toasty({ 
                    text: `${translations['en'].history.exportError}: ${error.message}`,
                    backgroundColor: '#ef4444',
                    textColor: '#ffffff'
                });
                toast.show();
            } finally {
                this.set('isExporting', false);
            }
        },
        
        exportWorkerTasksAsPDF: async function() {
            if (!this.tasks || this.tasks.length === 0) {
                const toast = new Toasty({ text: translations['en'].supervisor.noTasks });
                toast.show();
                return;
            }

            try {
                this.set('isExporting', true);

                // Generate PDF content
                const pdfContent = ExportUtils.generatePDF(this.tasks);
                
                // Generate filename with current date and worker name
                const date = new Date().toISOString().split('T')[0];
                const workerName = worker.full_name || worker.phone_number || 'worker';
                const fileName = `terratime_${workerName}_tasks_${date}.html`;  // Using HTML as a PDF representation for demo
                
                // Save to file
                const filePath = await ExportUtils.saveToFile(pdfContent, fileName, 'text/html');
                
                // Share the file
                ExportUtils.shareFile(filePath, 'text/html');
                
                // Show success message
                const toast = new Toasty({ 
                    text: translations['en'].history.exportSuccess,
                    backgroundColor: '#22c55e',
                    textColor: '#ffffff'
                });
                toast.show();
            } catch (error) {
                console.error('Error exporting PDF:', error);
                
                // Show error message
                const toast = new Toasty({ 
                    text: `${translations['en'].history.exportError}: ${error.message}`,
                    backgroundColor: '#ef4444',
                    textColor: '#ffffff'
                });
                toast.show();
            } finally {
                this.set('isExporting', false);
            }
        }
    };
    
    loadWorkerTasks(worker.id, page);
}

async function loadWorkerTasks(workerId: string, page: Page) {
    try {
        // Get user language preference
        const { data: profile } = await supabase
            .from('user_profiles')
            .select('preferred_language')
            .eq('id', workerId)
            .single();
            
        const language = profile?.preferred_language || 'en';
        
        // Get worker tasks
        const { data: tasks, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', workerId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Format tasks for display
        const formattedTasks = (tasks || []).map(task => {
            const startTime = new Date(task.start_time);
            const endTime = task.end_time ? new Date(task.end_time) : null;
            
            // Calculate duration in minutes
            const durationMinutes = endTime 
                ? Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60)) 
                : 0;
            
            // Format duration as hours and minutes
            const hours = Math.floor(durationMinutes / 60);
            const minutes = durationMinutes % 60;
            const formattedDuration = `${hours}h ${minutes}m`;
            
            // Format date
            const formattedDate = startTime.toLocaleDateString();
            
            // Get task name in current language
            const taskName = translations[language].tasks[task.task_type] || 'Unknown Task';
            
            return {
                ...task,
                formattedDate,
                formattedDuration,
                taskName
            };
        });

        page.bindingContext.tasks = formattedTasks;
    } catch (error) {
        console.error('Error loading worker tasks:', error);
    }
}