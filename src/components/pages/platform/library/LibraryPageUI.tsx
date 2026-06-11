import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Folder,
  FileText,
  UploadCloud,
  ChevronRight,
  LayoutGrid,
  List,
  FileImage,
  FileBarChart2,
} from 'lucide-react';
import { useLibraryPage } from './LibraryPageHook';

export default function LibraryPageUI(
  props: ReturnType<typeof useLibraryPage>
) {
  const {
    isAdmin,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    selectedFolderId,
    setSelectedFolderId,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredFolders,
    paginatedFiles,
    recentFiles,
  } = props;

  const currentFolder = filteredFolders.find((f) => f.id === selectedFolderId);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'image':
        return <FileImage className="w-5 h-5 text-purple-500" />;
      case 'doc':
        return <FileBarChart2 className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Knowledge Base
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            Access company documents, policies, and training materials.
          </p>
        </div>
        {isAdmin && (
          <Button className="shrink-0 shadow-sm">
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-secondary/30 p-3 rounded-xl border border-border/50">
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          <span
            className={`cursor-pointer hover:underline ${!selectedFolderId ? 'text-primary font-bold' : ''}`}
            onClick={() => {
              setSelectedFolderId(null);
              setCurrentPage(1);
            }}
          >
            Root
          </span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span
            className={`cursor-pointer hover:underline ${selectedFolderId ? 'text-primary font-bold' : ''}`}
            onClick={() => {
              setSelectedFolderId(null);
              setCurrentPage(1);
            }}
          >
            Company Shared
          </span>
          {currentFolder && (
            <>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-foreground font-bold">
                {currentFolder.name}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search files or folders..."
              className="pl-9 bg-background h-9 border-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="bg-background rounded-lg flex border shadow-sm shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 px-3 rounded-r-none ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 px-3 rounded-l-none ${viewMode === 'list' ? 'bg-secondary' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {!selectedFolderId ? (
        <div
          className={`grid gap-4 mt-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
        >
          {filteredFolders.map((folder) => (
            <Card
              key={folder.id}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group bg-card"
              onClick={() => {
                setSelectedFolderId(folder.id);
                setCurrentPage(1);
              }}
            >
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Folder className="w-6 h-6 text-blue-500 group-hover:fill-blue-500/20 transition-all" />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 overflow-hidden">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {folder.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {folder.count} files
                    </p>
                  </div>
                  {viewMode === 'list' && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-secondary/50 px-2 py-1 rounded">
                      Updated {folder.lastUpdated}
                    </span>
                  )}
                </div>
                {viewMode === 'grid' && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 shrink-0" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <Folder className="w-5 h-5 mr-2 text-blue-500 fill-blue-500/20" />
              {currentFolder?.name}
            </h3>
            <span className="text-sm text-muted-foreground">
              {currentFolder?.count} files total
            </span>
          </div>

          <div className="space-y-2 mb-6">
            {paginatedFiles.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">
                No files found in this folder.
              </div>
            ) : (
              paginatedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/30 cursor-pointer transition-colors group shadow-sm"
                >
                  <div className="flex items-center gap-4 overflow-hidden mb-3 sm:mb-0">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">
                        {file.name}
                      </p>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>Added by {file.addedBy}</span>
                        <span>•</span>
                        <span>{file.date}</span>
                        <span>•</span>
                        <span>{file.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs shrink-0 self-end sm:self-auto opacity-0 sm:opacity-100 group-hover:opacity-100 transition-opacity"
                  >
                    Download
                  </Button>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm font-medium text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {!selectedFolderId && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            Recently Added Files
          </h3>
          <div className="space-y-2">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/30 cursor-pointer transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-4 overflow-hidden mb-3 sm:mb-0">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>Added by {file.addedBy}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs shrink-0 self-end sm:self-auto opacity-0 sm:opacity-100 group-hover:opacity-100 transition-opacity"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
