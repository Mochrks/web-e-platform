import { useState, useMemo } from 'react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

export const DUMMY_FOLDERS = [
  {
    id: 1,
    name: 'Standard Operating Procedures (SOP)',
    count: 24,
    lastUpdated: '2 days ago',
  },
  { id: 2, name: 'Employee Handbooks', count: 3, lastUpdated: '1 month ago' },
  {
    id: 3,
    name: 'Engineering Guidelines',
    count: 12,
    lastUpdated: '1 week ago',
  },
  { id: 4, name: 'Marketing Assets', count: 56, lastUpdated: '5 hours ago' },
  { id: 5, name: 'Health & Safety', count: 8, lastUpdated: '3 months ago' },
];

export const DUMMY_RECENT_FILES = [
  {
    id: 1,
    name: 'Updated Work From Home Policy 2026.pdf',
    type: 'pdf',
    addedBy: 'HR Dept',
    date: '2 days ago',
    size: '2.4 MB',
    folderId: 1,
  },
  {
    id: 2,
    name: 'Q4 Marketing Brand Guidelines.ai',
    type: 'image',
    addedBy: 'Marketing',
    date: '5 hours ago',
    size: '14 MB',
    folderId: 4,
  },
  {
    id: 3,
    name: 'Engineering Onboarding Checklist.docx',
    type: 'doc',
    addedBy: 'Engineering',
    date: '1 week ago',
    size: '150 KB',
    folderId: 3,
  },
  {
    id: 4,
    name: 'Frontend Code Style Guide.pdf',
    type: 'pdf',
    addedBy: 'Engineering',
    date: '2 weeks ago',
    size: '1.1 MB',
    folderId: 3,
  },
  {
    id: 5,
    name: 'API Integration Docs.pdf',
    type: 'pdf',
    addedBy: 'Engineering',
    date: '3 weeks ago',
    size: '3.5 MB',
    folderId: 3,
  },
  {
    id: 6,
    name: 'Backend Architecture Diagram.image',
    type: 'image',
    addedBy: 'Engineering',
    date: '1 month ago',
    size: '5.2 MB',
    folderId: 3,
  },
  {
    id: 7,
    name: 'Company Values Presentation.pdf',
    type: 'pdf',
    addedBy: 'HR Dept',
    date: '1 month ago',
    size: '8 MB',
    folderId: 1,
  },
  {
    id: 8,
    name: 'Performance Review Template.docx',
    type: 'doc',
    addedBy: 'HR Dept',
    date: '2 months ago',
    size: '200 KB',
    folderId: 1,
  },
  {
    id: 9,
    name: 'Employee Benefits Guide 2026.pdf',
    type: 'pdf',
    addedBy: 'HR Dept',
    date: '3 months ago',
    size: '4.1 MB',
    folderId: 2,
  },
  {
    id: 10,
    name: 'Leave Policy Update.pdf',
    type: 'pdf',
    addedBy: 'HR Dept',
    date: '4 months ago',
    size: '1.5 MB',
    folderId: 2,
  },
  {
    id: 11,
    name: 'Social Media Assets Q4.zip',
    type: 'doc',
    addedBy: 'Marketing',
    date: '1 week ago',
    size: '45 MB',
    folderId: 4,
  },
  {
    id: 12,
    name: 'Campaign Strategy Brief.docx',
    type: 'doc',
    addedBy: 'Marketing',
    date: '2 weeks ago',
    size: '300 KB',
    folderId: 4,
  },
  {
    id: 13,
    name: 'Office Evacuation Plan.pdf',
    type: 'pdf',
    addedBy: 'Admin',
    date: '5 months ago',
    size: '2 MB',
    folderId: 5,
  },
  {
    id: 14,
    name: 'Ergonomics Guide.pdf',
    type: 'pdf',
    addedBy: 'Admin',
    date: '6 months ago',
    size: '1.2 MB',
    folderId: 5,
  },
];

export function useLibraryPage() {
  const { role } = useAppSelector((state) => state.auth);
  const isAdmin = role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredFolders = DUMMY_FOLDERS.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const folderFiles = useMemo(() => {
    if (!selectedFolderId) return [];
    let files = DUMMY_RECENT_FILES.filter(
      (f) => f.folderId === selectedFolderId
    );
    if (searchQuery) {
      files = files.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return files;
  }, [selectedFolderId, searchQuery]);

  const totalPages = Math.ceil(folderFiles.length / itemsPerPage) || 1;
  const paginatedFiles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return folderFiles.slice(start, start + itemsPerPage);
  }, [folderFiles, currentPage, itemsPerPage]);

  return {
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
    recentFiles: DUMMY_RECENT_FILES.slice(0, 3), // Only show 3 most recent
  };
}
