export interface Task {
  id: number;
  title: string;
  cat: string;
  status: 'pending' | 'done';
  deadline: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
  tag: string;
  color: string;
  isStarred: boolean;
}

export interface Session {
  id: number;
  title: string;
  time: string;
  mentor: string;
  type: string;
  location: string;
  date: Date;
}

export interface AttendanceLog {
  id: number;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'Present' | 'Late' | 'Absent';
  location: string;
}
