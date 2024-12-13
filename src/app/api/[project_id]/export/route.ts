import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
// @ts-ignore
import { Parser } from 'json2csv' ;

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

  // Fetch tasks and their related columns
  const { data: tasks, error: taskError } = await supabase
    .from('tasks')
    .select('*, columns(name)')
    .eq('project_id', project_id)
    .order('due_on', { ascending: true });

  if (taskError || !tasks || tasks.length === 0) {
    return NextResponse.json({ error: 'No tasks found' }, { status: 404 });
  }

  // Prepare CSV Data
  const csvData = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description || 'No description provided',
    priority: task.priority || 'N/A',
    due_on: task.due_on || 'No Due Date',
    created_at: task.created_at,
    status: task.columns?.name || 'Unknown',
  }));

  // Generate CSV
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(csvData);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="tasks.csv"`,
    },
  });
}
