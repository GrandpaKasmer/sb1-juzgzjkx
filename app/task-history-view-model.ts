import { Observable, Frame } from '@nativescript/core';
import { Toasty } from 'nativescript-toasty';
import { supabase } from './supabase';
import { translations } from './i18n/translations';
import { ExportUtils } from './utils/export-utils';

export class TaskHistoryViewModel extends Observable {
    private _tasks: Array<any> = [];
    private _language: string = 'en';
    private _isExportOptionsVisible: boolean = false;
    private _isExporting: boolean = false;

    constructor() {
        super();
        this.set('tasks', []);
        this.set('isExportOptionsVisible', false);
        this.set('isExporting', false);
        this.loadUserLanguage();
        this.loadTasks();
    }

    private async loadUserLanguage() {
        try {
            const user = (await supabase.auth.getUser()).data.user;
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('preferred_language')
                .eq('id', user?.id || '')
                .single();

            if (profile) {
                this._language = profile.preferred_language;
            }
        } catch (error) {
            console.error('Error loading user language:', error);
        }
    }

    async loadTasks() {
        try {
            const user = (await supabase.auth.getUser()).data.user;
            
            // Get user tasks
            const { data: tasks, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user?.id || '')
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
                const taskName = translations[this._language].tasks[task.task_type] || 'Unknown Task';
                
                return {
                    ...task,
                    formattedDate,
                    formattedDuration,
                    taskName
                };
            });

            this.set('tasks', formattedTasks);
            this._tasks = formattedTasks;
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    onTaskTap(args: any) {
        const task = this._tasks[args.index];
        Frame.topmost().navigate({
            moduleName: 'app/task-details-page',
            context: {
                task
            }
        });
    }

    showExportOptions() {
        this._isExportOptionsVisible = !this._isExportOptionsVisible;
        this.notifyPropertyChange('isExportOptionsVisible', this._isExportOptionsVisible);
    }

    async exportAsCSV() {
        if (this._tasks.length === 0) {
            const toast = new Toasty({ text: translations[this._language].history.noTasks });
            toast.show();
            return;
        }

        try {
            this.set('isExporting', true);
            this.set('isExportOptionsVisible', false);

            // Generate CSV content
            const csvContent = ExportUtils.tasksToCSV(this._tasks);
            
            // Generate filename with current date
            const date = new Date().toISOString().split('T')[0];
            const fileName = `terratime_tasks_${date}.csv`;
            
            // Save to file
            const filePath = await ExportUtils.saveToFile(csvContent, fileName, 'text/csv');
            
            // Share the file
            ExportUtils.shareFile(filePath, 'text/csv');
            
            // Show success message
            const toast = new Toasty({ 
                text: translations[this._language].history.exportSuccess,
                backgroundColor: '#22c55e',
                textColor: '#ffffff'
            });
            toast.show();
        } catch (error) {
            console.error('Error exporting CSV:', error);
            
            // Show error message
            const toast = new Toasty({ 
                text: `${translations[this._language].history.exportError}: ${error.message}`,
                backgroundColor: '#ef4444',
                textColor: '#ffffff'
            });
            toast.show();
        } finally {
            this.set('isExporting', false);
        }
    }

    async exportAsPDF() {
        if (this._tasks.length === 0) {
            const toast = new Toasty({ text: translations[this._language].history.noTasks });
            toast.show();
            return;
        }

        try {
            this.set('isExporting', true);
            this.set('isExportOptionsVisible', false);

            // Generate PDF content
            const pdfContent = ExportUtils.generatePDF(this._tasks);
            
            // Generate filename with current date
            const date = new Date().toISOString().split('T')[0];
            const fileName = `terratime_tasks_${date}.html`;  // Using HTML as a PDF representation for demo
            
            // Save to file
            const filePath = await ExportUtils.saveToFile(pdfContent, fileName, 'text/html');
            
            // Share the file
            ExportUtils.shareFile(filePath, 'text/html');
            
            // Show success message
            const toast = new Toasty({ 
                text: translations[this._language].history.exportSuccess,
                backgroundColor: '#22c55e',
                textColor: '#ffffff'
            });
            toast.show();
        } catch (error) {
            console.error('Error exporting PDF:', error);
            
            // Show error message
            const toast = new Toasty({ 
                text: `${translations[this._language].history.exportError}: ${error.message}`,
                backgroundColor: '#ef4444',
                textColor: '#ffffff'
            });
            toast.show();
        } finally {
            this.set('isExporting', false);
        }
    }
}