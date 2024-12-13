// eslint-disable
import { NextResponse } from 'next/server';
import ical, { ICalCalendarMethod } from 'ical-generator';
import { createClient } from '@/lib/supabase/server';
import { Task } from '@/types/kanban';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ project_id: string }> }
) 
{
const project_id = (await params).project_id

    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch tasks from Supabase
    const { data: tasks, error: taskError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', project_id);

    if (taskError || !tasks || tasks.length === 0) {
        return NextResponse.json({ error: 'No tasks found' }, { status: 404 });
    }

    // Create and populate the calendar
    const calendar = ical({ name: 'Project Tasks' });
    calendar.method(ICalCalendarMethod.PUBLISH);

    tasks.forEach((task: Task) => {
      const start = new Date(task.due_on || task.created_at);
      const end = new Date(start);
      end.setHours(start.getHours() + 1);
  
      calendar.createEvent({
          start,
          end,
          summary: task.title,
          description: task.description || 'No description provided.',
          location: 'Project Task Manager',
          url: `https://yourapp.com/projects/${project_id}/tasks/${task.id}`,
      });
  });

    const icsContent = calendar.toString();

    return new NextResponse(icsContent, {
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': 'attachment; filename="tasks.ics"',
        },
    });
}
