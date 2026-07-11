import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Clock,
  CalendarDays,
  CheckCircle2,
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  UploadCloud,
} from 'lucide-react';
import { useTimesheetsPage, TimesheetEntry } from './TimesheetsPageHook';

export default function TimesheetsPageUI(
  props: ReturnType<typeof useTimesheetsPage>
) {
  const {
    isAdmin,
    selectedDate,
    setSelectedDate,
    filteredEntries,
    totalHours,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmitDay,
  } = props;

  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<TimesheetEntry>>({
    project: 'Website Redesign',
    hours: 1,
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState<Partial<TimesheetEntry>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulate file parsing delay
      setTimeout(() => {
        alert('Excel file imported successfully! Timesheets populated.');
      }, 500);
    }
  };

  const saveNewEntry = () => {
    if (!newEntry.description || !newEntry.hours) return;
    handleAdd({
      date: selectedDate,
      project: newEntry.project as string,
      hours: Number(newEntry.hours),
      description: newEntry.description,
    });
    setIsAdding(false);
    setNewEntry({ project: 'Website Redesign', hours: 1, description: '' });
  };

  const saveEdit = () => {
    if (editingId) {
      handleEdit(editingId, {
        project: editEntry.project,
        hours: Number(editEntry.hours),
        description: editEntry.description,
      });
      setEditingId(null);
    }
  };

  const hasSubmitted = filteredEntries.some((e) => e.status === 'Submitted');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Timesheets & Hours
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            {isAdmin
              ? 'Review and approve team timesheets.'
              : 'Log your daily activities and working hours.'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-lg">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-8 text-sm font-medium w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3 border-primary/20 shadow-sm">
          <CardHeader className="pb-4 border-b border-border/50 flex flex-row items-center justify-between bg-secondary/10">
            <CardTitle className="text-xl flex items-center">
              <CalendarDays className="w-5 h-5 mr-2 text-primary" /> Daily Log (
              {selectedDate})
            </CardTitle>
            <div className="text-sm font-medium text-muted-foreground">
              Total Logged:{' '}
              <span className="text-foreground font-bold text-lg">
                {totalHours}h
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {filteredEntries.length === 0 && !isAdding && (
                <div className="p-8 text-center text-muted-foreground">
                  No timesheets logged for this date.
                </div>
              )}
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-secondary/20 transition-colors"
                >
                  {editingId === entry.id ? (
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          className="bg-background border border-border rounded-md text-sm p-1.5 w-full max-w-[200px]"
                          value={editEntry.project}
                          onChange={(e) =>
                            setEditEntry({
                              ...editEntry,
                              project: e.target.value,
                            })
                          }
                        >
                          <option value="Website Redesign">
                            Website Redesign
                          </option>
                          <option value="Mobile App V2">Mobile App V2</option>
                          <option value="Internal Tools">Internal Tools</option>
                          <option value="PTO">PTO / Leave</option>
                        </select>
                        <Input
                          type="number"
                          className="w-20"
                          value={editEntry.hours}
                          onChange={(e) =>
                            setEditEntry({
                              ...editEntry,
                              hours: Number(e.target.value),
                            })
                          }
                        />{' '}
                        hours
                      </div>
                      <Input
                        placeholder="Description of activities..."
                        value={editEntry.description}
                        onChange={(e) =>
                          setEditEntry({
                            ...editEntry,
                            description: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={saveEdit}>
                          <Save className="w-4 h-4 mr-2" /> Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="w-4 h-4 mr-2" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className={`font-bold ${entry.project === 'Website Redesign' ? 'text-blue-500' : entry.project === 'PTO' ? 'text-amber-500' : 'text-primary'}`}
                          >
                            {entry.project}
                          </span>
                          <Badge
                            variant={
                              entry.status === 'Submitted'
                                ? 'default'
                                : 'secondary'
                            }
                            className={
                              entry.status === 'Submitted'
                                ? 'bg-green-500 text-white border-none shadow-sm'
                                : ''
                            }
                          >
                            {entry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entry.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-3 sm:mt-0">
                        <div className="text-lg font-bold">
                          {entry.hours}{' '}
                          <span className="text-sm text-muted-foreground font-normal">
                            h
                          </span>
                        </div>
                        {entry.status !== 'Submitted' && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingId(entry.id);
                                setEditEntry(entry);
                              }}
                            >
                              <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/80" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
              {isAdding && (
                <div className="p-4 bg-primary/5 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      className="bg-background border border-border rounded-md text-sm p-1.5 w-full max-w-[200px]"
                      value={newEntry.project}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, project: e.target.value })
                      }
                    >
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Mobile App V2">Mobile App V2</option>
                      <option value="Internal Tools">Internal Tools</option>
                      <option value="PTO">PTO / Leave</option>
                    </select>
                    <Input
                      type="number"
                      className="w-20"
                      value={newEntry.hours}
                      onChange={(e) =>
                        setNewEntry({
                          ...newEntry,
                          hours: Number(e.target.value),
                        })
                      }
                    />{' '}
                    hours
                  </div>
                  <Input
                    placeholder="Description (e.g. ngapain aja hari itu...)"
                    value={newEntry.description}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, description: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveNewEntry}>
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Add Entry
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsAdding(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-secondary/10 border-t flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsAdding(true)}
              disabled={hasSubmitted || isAdding}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Activity
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white shadow-md font-bold"
              onClick={handleSubmitDay}
              disabled={filteredEntries.length === 0 || hasSubmitted}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" /> Submit Day
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" /> Daily Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Hours</span>
                  <span className="font-bold">{totalHours}h</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={`font-bold ${hasSubmitted ? 'text-green-500' : 'text-amber-500'}`}
                  >
                    {hasSubmitted ? 'Submitted' : 'Draft'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileSpreadsheet className="w-5 h-5 mr-2 text-amber-500" />{' '}
                Exports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full text-xs shadow-sm bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary font-bold"
              >
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="w-full text-xs shadow-sm border-dashed"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="w-3 h-3 mr-2" /> Import Excel (.xlsx)
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleImportExcel}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
