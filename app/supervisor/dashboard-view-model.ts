import { Observable, Frame } from '@nativescript/core';
import { supabase, UserProfile, Task } from '../supabase';
import { translations } from '../i18n/translations';
import { ExportUtils } from '../utils/export-utils';
import { Toasty } from 'nativescript-toasty';

export class SupervisorDashboardViewModel extends Observable {
    private _workers: Array<UserProfile> = [];
    private _tasks: Array<any> = [];
    private _selectedTabIndex: number = 0;
    private _language: string = 'en';
    private _isExporting: boolean = false;

    constructor() {
        super();
        this.set('workers', []);
        this.set('tasks', []);
        this.set('selectedTabIndex', 0);
        this.set('isExporting', false);
        this.loadUserLanguage();
        this.loadWorkers();
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

    get selectedTabIndex(): number {
        return this._selectedTabIndex;
    }

    set selectedTabIndex(value: number) {
        if (this._selectedTabIndex !== value) {
            this._selectedTabIndex = value;
            this.notifyPropertyChange('selectedTabIndex', value);
        }
    }

    async loadWorkers() {
        try {
            // In a real app, we would filter by supervisor_id
            // For demo, we'll just get all workers
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('role', 'worker');

            if (error) throw error;

            this.set('workers', data || []);
        } catch (error) {
            console.error('Error loading workers:', error);
        }
    }

    async loadTasks() {
        try {
            // Get all tasks
            const { data: tasks, error } = await supabase
                .from('tasks')
                .select('*, user_profiles(full_name, phone_number)')
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
                
                // Get worker name
                const workerProfile = task.user_profiles;
                const workerName = workerProfile?.full_name || workerProfile?.phone_number || 'Unknown';
                
                // Get task name in current language
                const taskName = translations[this._language].tasks[task.task_type] || 'Unknown Task';
                
                return {
                    ...task,
                    formattedDate,
                    formattedDuration,
                    workerName,
                    taskName
                };
            });

            this.set('tasks', formattedTasks);
            this._tasks = formattedTasks;
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    onWorkerTap(args: any) {
        const worker = this._workers[args.index];
        Frame.topmost().navigate({
            moduleName: 'app/supervisor/worker-details-page',
            context: {
                worker
            }
        });
    }

    onTaskTap(args: any) {
        const task = this._tasks[args.index];
        Frame.topmost().navigate({
            moduleName: 'app/supervisor/task-details-page',
            context: {
                task
            }
        });
    }

    async exportTasksAsCSV() {
        if (this._tasks.length === 0) {
            const toast = new Toasty({ text: translations[this._language].supervisor.noTasks });
            toast.show();
            return;
        }

        try {
            this.set('isExporting', true);

            // Generate CSV content
            const csvContent = ExportUtils.tasksToCSV(this._tasks);
            
            // Generate filename with current date
            const date = new Date().toISOString().split('T')[0];
            const fileName = `terratime_all_tasks_${date}.csv`;
            
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

    async exportTasksAsPDF() {
        if (this._tasks.length === 0) {
            const toast = new Toasty({ text: translations[this._language].supervisor.noTasks });
            toast.show();
            return;
        }

        try {
            this.set('isExporting', true);

            // Generate PDF content
            const pdfContent = ExportUtils.generatePDF(this._tasks);
            
            // Generate filename with current date
            const date = new Date().toISOString().split('T')[0];
            const fileName = `terratime_all_tasks_${date}.html`;  // Using HTML as a PDF representation for demo
            
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